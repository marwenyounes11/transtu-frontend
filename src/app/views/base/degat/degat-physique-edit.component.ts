import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {DegatPhysiqueDto } from './degatphysiquedto';
import { DegatService } from './degat.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './degat-physique-edit.component.html'
})
export class DegatPhysiqueEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث الاضرارالبدنية' ;
  errorMessage: string;
  degatPhysiqueForm: FormGroup;

  degatphysique: DegatPhysiqueDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredDegatPhysique: DegatPhysiqueDto[] = [];
 degatsphysique: DegatPhysiqueDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private degatService: DegatService) {

   
   this.validationMessages = {
     descriptionDegat: {
        required: 'يجب تسجيل  وصف الضرر.',
         minlength: 'يجب أن يكون  وصف الضرر  متكون من 6 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز وصف الضرر 30 حرفًا.'
      },
       estimationPrixDegat: {
       required: 'يجب تسجيل تكلفة  الضرر ',
         minlength: 'يجب أن تكون تكلفة  الضرر متكونة من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن تتجاوز  تكلفة  الضرر  15 حرفًا.'
      },
       idAccident: {
        required: 'يجب تسجيل رقم الحادث'
      }
    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.degatPhysiqueForm = this.fb.group({
      descriptionDegat: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30)]],
      estimationPrixDegat: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
       idAccident: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getDegatPhysique(id);
      }
    );

    this.degatService.getDegatsPhysique().subscribe(
     degatsphysique  => {
        this.degatsphysique = degatsphysique ;
        this.filteredDegatPhysique = this.degatsphysique ;
      },
      error => this.errorMessage = <any>error
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    
    merge(this.degatPhysiqueForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.degatPhysiqueForm);
    });
  }

  
getDegatPhysique(id: number): void {
    this.degatService.getDegatPhysique(id)
      .subscribe(
        (degatphysique: DegatPhysiqueDto) => this.displayDegatPhysique(degatphysique),
        (error: any) => this.errorMessage = <any>error
      );
  }
  

  

  displayDegatPhysique(degatphysique: DegatPhysiqueDto): void {
    if (this.degatPhysiqueForm) {
      this.degatPhysiqueForm.reset();
    }
    this.degatphysique = degatphysique;

    if (this.degatphysique.id === 0) {
      this.pageTitle = 'إضافة الاضرار البدنية';
    } else {
      this.pageTitle = `تحديث الاضرار البدنية : ${this.degatphysique.id}`;
    }

   
    this.degatPhysiqueForm.setValue({
   descriptionDegat: this.degatphysique.descriptionDegat,
    estimationPrixDegat: this.degatphysique.estimationPrixDegat,
    idAccident: this.degatphysique.idAccident
    });
    
  }

  deleteDegatPhysique(): void {
    if (this.degatphysique.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the degatphysique: ${this.degatphysique.id}?`)) {
        this.degatService.deleteDegatPhysique(this.degatphysique.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveDegatPhysique(): void {
    if (this.degatPhysiqueForm.valid) {
      if (this.degatPhysiqueForm.dirty) {
        const a = { ...this.degatphysique, ...this.degatPhysiqueForm.value };

        if (a.id === 0) {
          this.degatService.createDegatPhysique(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.degatService.updateDegatPhysique(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    
    this.degatPhysiqueForm.reset();
    this.router.navigate(['/base/قائمة الاضرار البدنية']);
  }
}
