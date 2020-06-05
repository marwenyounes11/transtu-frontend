import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {DepartementDto } from './departementdto';
import { DepartementService } from './departement.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './departement-edit.component.html'
})
export class DepartementEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث  المباني' ;
  errorMessage: string;
  departementForm: FormGroup;

  departement: DepartementDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredDepartement: DepartementDto[] = [];
departements: DepartementDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departementService: DepartementService) {  
   this.validationMessages = {
        nameDept: {
        required: 'يجب تسجيل  اسم المستودع.',
         minlength: 'يجب أن يكون  اسم المستودع  متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن  يتجاوز اسم المستودع  15 حرفًا.'
      },
DistrictId:  {
        required: 'يجب تسجيل  الرقم الالي للاقليم.'
      }
    };  
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.departementForm = this.fb.group({
      nameDept: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
     DistrictId: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getDepartement(id);
      }
    );

    this.departementService.getDepartements().subscribe(
      departements => {
        this.departements = departements;
        this.filteredDepartement = this.departements;
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

    
    merge(this.departementForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.departementForm);
    });
  }

  
getDepartement(id: number): void {
    this.departementService.getDepartement(id)
      .subscribe(
        (departement: DepartementDto) => this.displayDepartement(departement),
        (error: any) => this.errorMessage = <any>error
      );
  }
  
  

  

  displayDepartement(departement: DepartementDto): void {
    if (this.departementForm) {
      this.departementForm.reset();
    }
    this.departement = departement;

    if (this.departement.id === 0) {
      this.pageTitle = 'اضافة مبني';
    } else {
      this.pageTitle = `تحديث  المباني ${this.departement.id}`;
    }

   
    this.departementForm.setValue({
    nameDept: this.departement.nameDept
    });
    
  }

  deleteDepartement(): void {
    if (this.departement.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the departement: ${this.departement.id}?`)) {
        this.departementService.deleteDepartement(this.departement.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveDepartement(): void {
    if (this.departementForm.valid) {
      if (this.departementForm.dirty) {
        const a = { ...this.departement, ...this.departementForm.value };

        if (a.id === 0) {
          this.departementService.createDepartement(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.departementService.updateDepartement(a)
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
    
    this.departementForm.reset();
    this.router.navigate(['/base/قائمة المباني']);
  }
}
