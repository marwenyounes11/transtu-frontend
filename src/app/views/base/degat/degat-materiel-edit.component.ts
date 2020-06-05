import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {DegatMaterielDto } from './degatmaterieldto';
import { DegatService } from './degat.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './degat-materiel-edit.component.html'
})
export class DegatMaterielEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث الاضرارالمادية' ;
  errorMessage: string;
  degatMaterielForm: FormGroup;

  degatmateriel: DegatMaterielDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredDegatMateriel: DegatMaterielDto[] = [];
 degatsmateriel: DegatMaterielDto[] = [];
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
    this.degatMaterielForm = this.fb.group({
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
        this.getDegatMateriel(id);
      }
    );

    this.degatService.getDegatsMateriel().subscribe(
     degatsmateriel  => {
        this.degatsmateriel = degatsmateriel ;
        this.filteredDegatMateriel = this.degatsmateriel ;
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

    
    merge(this.degatMaterielForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.degatMaterielForm);
    });
  }

  
getDegatMateriel(id: number): void {
    this.degatService.getDegatMateriel(id)
      .subscribe(
        (degatmateriel: DegatMaterielDto) => this.displayDegatMateriel(degatmateriel),
        (error: any) => this.errorMessage = <any>error
      );
  }
  

  

  displayDegatMateriel(degatmateriel: DegatMaterielDto): void {
    if (this.degatMaterielForm) {
      this.degatMaterielForm.reset();
    }
    this.degatmateriel = degatmateriel;

    if (this.degatmateriel.id === 0) {
      this.pageTitle = 'إضافة الاضرارالمادية';
    } else {
      this.pageTitle = `تحديث الاضرار المادية : ${this.degatmateriel.id}`;
    }

   
    this.degatMaterielForm.setValue({
   descriptionDegat: this.degatmateriel.descriptionDegat,
    estimationPrixDegat: this.degatmateriel.estimationPrixDegat,
    idAccident: this.degatmateriel.idAccident
    });
    
  }

  deleteDegatMateriel(): void {
    if (this.degatmateriel.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the degatmateriel: ${this.degatmateriel.id}?`)) {
        this.degatService.deleteDegatMateriel(this.degatmateriel.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveDegatMateriel(): void {
    if (this.degatMaterielForm.valid) {
      if (this.degatMaterielForm.dirty) {
        const a = { ...this.degatmateriel, ...this.degatMaterielForm.value };

        if (a.id === 0) {
          this.degatService.createDegatMateriel(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.degatService.updateDegatMateriel(a)
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
    
    this.degatMaterielForm.reset();
    this.router.navigate(['/base/قائمة الاضرارالمادية']);
  }
}
