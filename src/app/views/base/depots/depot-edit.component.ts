import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {DepotDto } from './depotdto';
import { DepotService } from './depot.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './depot-edit.component.html'
})
export class DepotEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث  المستودعات' ;
  errorMessage: string;
  depotForm: FormGroup;

  depot: DepotDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredDepot: DepotDto[] = [];
depots: DepotDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private depotService: DepotService) {

   
   this.validationMessages = {
        nameDepot: {
        required: 'يجب تسجيل  اسم المستودع.',
         minlength: 'يجب أن يكون  اسم المستودع  متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن  يتجاوز اسم المستودع  15 حرفًا.'
      },
DistrictId: {
        required: 'يجب تسجيل  الرقم الالي للاقليم.'
      }

    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.depotForm = this.fb.group({
      nameDepot: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
     DistrictId: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getDepot(id);
      }
    );

    this.depotService.getDepots().subscribe(
      depots => {
        this.depots = depots;
        this.filteredDepot = this.depots;
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

    
    merge(this.depotForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.depotForm);
    });
  }

  

  getDepot(id: number): void {
    this.depotService.getDepot(id)
      .subscribe(
        (depot: DepotDto) => this.displayDepot(depot),
        (error: any) => this.errorMessage = <any>error
      );
  }

  

  displayDepot(depot: DepotDto): void {
    if (this.depotForm) {
      this.depotForm.reset();
    }
    this.depot = depot;

    if (this.depot.id === 0) {
      this.pageTitle = 'اضافة مستودع';
    } else {
      this.pageTitle = `تحديث مستودع ${this.depot.id}`;
    }

   
    this.depotForm.setValue({
    nameDepot: this.depot.nameDepot,
    districtId: this.depot.districtId
    });
    
  }

  deleteDepot(): void {
    if (this.depot.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the depot: ${this.depot.id}?`)) {
        this.depotService.deleteDepot(this.depot.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveDepot(): void {
    if (this.depotForm.valid) {
      if (this.depotForm.dirty) {
        const a = { ...this.depot, ...this.depotForm.value };

        if (a.id === 0) {
          this.depotService.createDepot(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.depotService.updateDepot(a)
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
    
    this.depotForm.reset();
    this.router.navigate(['/base/قائمة المستودعات']);
  }
}
