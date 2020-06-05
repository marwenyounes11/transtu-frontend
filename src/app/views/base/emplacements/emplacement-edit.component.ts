import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {EmplacementDto } from './emplacementdto';
import { EmplacementService } from './emplacement.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './emplacement-edit.component.html'
})
export class EmplacementEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث الموقع' ;
  errorMessage: string;
  emplacementForm: FormGroup;

  emplacement: EmplacementDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredEmplacement: EmplacementDto[] = [];
emplacements: EmplacementDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private emplacementService: EmplacementService) {

   
   this.validationMessages = {
      delegation: {
        required: 'يجب تسجيل  اسم   المعتمدية.',
         minlength: 'يجب أن يكون  اسم  المعتمدية  متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزاسم  المعتمدية   15  حرفًا.'
      },
       gouvernorat: {
        required: 'يجب تسجيل  اسم المحافضة.',
         minlength: 'يجب أن يكون  اسم المحافضة متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن  يتجاوز اسم المحافضة 15 حرفًا.'
      },
 localisation: {
        required: 'يجب تسجيل  المكان.'    
      },
 idDistrict: {
        required: 'يجب تسجيل  الاقليم.'    
      }

    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.emplacementForm = this.fb.group({
      delegation: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
    gouvernorat: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      localisation: ['', Validators.required],
      idDistrict: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getEmplacement(id);
      }
    );

    this.emplacementService.getEmplacements().subscribe(
      emplacements => {
        this.emplacements = emplacements;
        this.filteredEmplacement = this.emplacements;
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

    
    merge(this.emplacementForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.emplacementForm);
    });
  }

  
getEmplacement(id: number): void {
    this.emplacementService.getEmplacement(id)
      .subscribe(
        (emplacement: EmplacementDto) => this.displayEmplacement(emplacement),
        (error: any) => this.errorMessage = <any>error
      );
  }
  

  

  displayEmplacement(emplacement: EmplacementDto): void {
    if (this.emplacementForm) {
      this.emplacementForm.reset();
    }
    this.emplacement = emplacement;

    if (this.emplacement.id === 0) {
      this.pageTitle = 'اضافة الاماكن';
    } else {
      this.pageTitle = `تحديث الاماكن ${this.emplacement.id}`;
    }

   
    this.emplacementForm.setValue({
    delegation: this.emplacement.delegation,
    gouvernorat: this.emplacement.gouvernorat,
    localisation: this.emplacement.localisation,
   districtId: this.emplacement.districtId,
    });
    
  }

  deleteEmplacement(): void {
    if (this.emplacement.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the emplacement: ${this.emplacement.id}?`)) {
        this.emplacementService.deleteEmplacement(this.emplacement.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveEmplacement(): void {
    if (this.emplacementForm.valid) {
      if (this.emplacementForm.dirty) {
        const a = { ...this.emplacement, ...this.emplacementForm.value };

        if (a.id === 0) {
          this.emplacementService.createEmplacement(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.emplacementService.updateEmplacement(a)
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
    
    this.emplacementForm.reset();
    this.router.navigate(['/base/قائمة الاماكن']);
  }
}
