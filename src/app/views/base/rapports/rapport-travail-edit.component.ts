import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {RapportTravailDto } from './rapporttravaildto';
import { RapportService } from './rapport.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './rapport-travail-edit.component.html'
})
export class RapportTravailEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث تقارير حوادث الشغل';
  errorMessage: string;
  rapportTravailForm: FormGroup;

  rapport: RapportTravailDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredRapportTravail: RapportTravailDto[] = [];
 rapports: RapportTravailDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rapportService: RapportService) {

   
   this.validationMessages = {
idAccident: {
        required: 'يجب تسجيل الرقم الالي للحادث.',
      },
      nameLine: {
        required: 'يجب تسجيل  الخط.',
         minlength: 'يجب أن يكون الخط  متكون من 4 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز الخط 30 حرفًا.'
      },
       localisation: {
        required: 'يجب تسجيل المكان',
         minlength: 'يجب أن يكون المكان  متكون من 4 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز  المكان 30 حرفًا.'
      },
      nameDistrict: {
        required: 'يجب تسجيل الاقليم.',
         minlength: 'يجب أن يكون الاقليم  متكون من 4 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز  الاقليم  30 حرفًا.'
      },
      numTransport: {
        required: 'يجب تسجيل رقم الحافلة/مترو.'
       
      },
 
     timeAccident: {
        required: 'يجب تسجيل وقت الحادث.',
      },
     dateAccident: {
        required: 'يجب تسجيل تاريخ الحادث.',
      },
      function: {
        required: 'يجب تسجيل الخطة.',
         minlength: 'يجب أن تكون الخطة متكونة من 4 أحرف على الأقل.',
        maxlength: 'لا يمكن أن تتجاوز الخطة 30 حرفًا.'
      },
      typeAccTravail: {
         required: 'يجب تسجيل نوع حادث.',
         minlength: 'يجب أن يكون نوع  حادث متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز نوع حادث 15 حرفًا.'
      },
     descriptionDegat: {
         required: 'يجب تسجيل الاضرار.',
         minlength: 'يجب أن تكون الاضرار متكونة من 4 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز نوع حادث 50 حرفًا.'
      }
    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.rapportTravailForm = this.fb.group({
    nameLine: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)]],
      localisation: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)]],
      nameDistrict: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)]],
       numTransport: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)]],
      timeAccident: ['', Validators.required],
      dateAccident: ['', Validators.required],
      function: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)]],
      typeAccTravail: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)]],
      descriptionDegat: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)]]
      

    });

    
   

    this.rapportService.getRapportsTravail().subscribe(
      rapports => {
        this.rapports = rapports;
        this.filteredRapportTravail = this.rapports;
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

    
    merge(this.rapportTravailForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.rapportTravailForm);
    });
  }

  

  

  

  displayRapportTravail(rapport: RapportTravailDto): void {
    if (this.rapportTravailForm) {
      this.rapportTravailForm.reset();
    }
    this.rapport = rapport;

    if (this.rapport.id === 0) {
      this.pageTitle = 'إضافة تقرير حادث الشغل';
    } else {
      this.pageTitle = `تحديث تقرير حادث الشغل: ${this.rapport.id}`;
    }

   
    this.rapportTravailForm.setValue({
    nameLine: this.rapport.nameLine,
    localisation: this.rapport.localisation,
    nameDistrict: this.rapport.nameDistrict,
    numTransport: this.rapport.numTransport,
     timeAccident: this.rapport.timeAccident,
      dateAccident: this.rapport.dateAccident,
     function: this.rapport.function,
     typeAccTravail: this.rapport.typeAccTravail,
     descriptionDegat: this.rapport.descriptionDegat
    });
    
  }

  deleteRapport(): void {
    if (this.rapport.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the rapport: ${this.rapport.id}?`)) {
        this.rapportService.deleteRapportTravail(this.rapport.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveRapport(): void {
    if (this.rapportTravailForm.valid) {
      if (this.rapportTravailForm.dirty) {
        const a = { ...this.rapport, ...this.rapportTravailForm.value };

        if (a.id === 0) {
          this.rapportService.createRapportTravail(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.rapportService.updateRapportTravail(a)
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
    
    this.rapportTravailForm.reset();
    this.router.navigate(['/base/rapportstravail']);
  }
}
