import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {DistrictDto } from './districtdto';
import { DistrictService } from './district.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './district-edit.component.html'
})
export class DistrictEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث الخط' ;
  errorMessage: string;
  districtForm: FormGroup;

  district: DistrictDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredDistrict: DistrictDto[] = [];
districts: DistrictDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private districtService: DistrictService) {

   
   this.validationMessages = {
       aliasDistrict: {
        required: 'يجب تسجيل  الاسم المعرف للاقليم.',
         minlength: 'يجب أن يكون الاسم  المعرف  للاقليم  متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزالاسم المعرف  للاقليم 15  حرفًا.'
      },
       nameDistrict: {
        required: 'يجب تسجيل  اسم الاقليم.',
         minlength: 'يجب أن يكون  اسم الاقليم متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن  يتجاوز اسم الاقليم 15 حرفًا.'
      }

    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.districtForm = this.fb.group({
      aliasDistrict: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
     nameDistrict: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getDistrict(id);
      }
    );

    this.districtService.getDistricts().subscribe(
      districts => {
        this.districts = districts;
        this.filteredDistrict = this.districts;
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

    
    merge(this.districtForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.districtForm);
    });
  }

  
getDistrict(id: number): void {
    this.districtService.getDistrict(id)
      .subscribe(
        (district: DistrictDto) => this.displayDistrict(district),
        (error: any) => this.errorMessage = <any>error
      );
  }
  

  

  displayDistrict(district: DistrictDto): void {
    if (this.districtForm) {
      this.districtForm.reset();
    }
    this.district = district;

    if (this.district.id === 0) {
      this.pageTitle = 'إضافة الاقليم';
    } else {
      this.pageTitle = `تحديث الاقليم ${this.district.id}`;
    }

   
    this.districtForm.setValue({
    aliasDistrict: this.district.aliasDistrict,
    nameDistrict: this.district.nameDistrict
    });
    
  }

  deleteDistrict(): void {
    if (this.district.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the district: ${this.district.id}?`)) {
        this.districtService.deleteDistrict(this.district.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveDistrict(): void {
    if (this.districtForm.valid) {
      if (this.districtForm.dirty) {
        const a = { ...this.district, ...this.districtForm.value };

        if (a.id === 0) {
          this.districtService.createDistrict(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.districtService.updateDistrict(a)
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
    
    this.districtForm.reset();
    this.router.navigate(['/base/قائمة الاقاليم']);
  }
}
