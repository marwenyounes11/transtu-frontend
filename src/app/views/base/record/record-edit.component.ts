import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {RecordDto } from './recorddto';
import { RecordService } from './record.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './record-edit.component.html'
})
export class RecordEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث المحاضر' ;
  errorMessage: string;
  recordForm: FormGroup;

  record: RecordDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredRecord: RecordDto[] = [];
 records: RecordDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recordService: RecordService) {

   
   this.validationMessages = {
      dateRecord: {
       required: 'يجب تسجيل  تاريخ  المحضر'  
      },
       timeRecord: {
          required: 'يجب تسجيل  توقيت المحضر' 
      },
       descriptionRecord: {
        required: 'يجب تسجيل وصف المحضر',
        minlength: 'يجب أن يكون وصف المحضر  متكون  من 6 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز وصف المحضر 30 حرفًا.'
      }
    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.recordForm = this.fb.group({
      dateRecord: ['', Validators.required],
      timeRecord: ['', Validators.required],
      descriptionRecord: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30)]]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getRecord(id);
      }
    );

    this.recordService.getRecords().subscribe(
      records => {
        this.records = records;
        this.filteredRecord = this.records;
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

    
    merge(this.recordForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.recordForm);
    });
  }

  

  getRecord(id: number): void {
    this.recordService.getRecord(id)
      .subscribe(
        (record: RecordDto) => this.displayRecord(record),
        (error: any) => this.errorMessage = <any>error
      );
  }

  

  displayRecord(record: RecordDto): void {
    if (this.recordForm) {
      this.recordForm.reset();
    }
    this.record = record;

    if (this.record.id === 0) {
      this.pageTitle = 'إضافة عامل  القاعة';
    } else {
      this.pageTitle = `تحديث عامل  القاعة : ${this.record.id}`;
    }

   
    this.recordForm.setValue({
    dateRecord: this.record.dateRecord,
    timeRecord: this.record.timeRecord,
    descriptionRecord: this.record.descriptionRecord
    });
    
  }

  deleteRecord(): void {
    if (this.record.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the Record: ${this.record.id}?`)) {
        this.recordService.deleteRecord(this.record.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveRecord(): void {
    if (this.recordForm.valid) {
      if (this.recordForm.dirty) {
        const a = { ...this.record, ...this.recordForm.value };

        if (a.id === 0) {
          this.recordService.createRecord(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.recordService.updateRecord(a)
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
    
    this.recordForm.reset();
    this.router.navigate(['/base/ائمة  عمال ']);
  }
}
