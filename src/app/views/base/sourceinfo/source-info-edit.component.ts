import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {SourceInfoDto } from './sourceinfodto';
import { SourceInfoService } from './sourceinfo.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './source-info-edit.component.html'
})
export class SourceInfoEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تتحديث عمال القاعة' ;
  errorMessage: string;
  sourceInfoForm: FormGroup;

  sourceinfo: SourceInfoDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredSourceInfo: SourceInfoDto[] = [];
 sourcesinfo: SourceInfoDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sourceinfoService: SourceInfoService) {

   
   this.validationMessages = {
      nameAgent: {
        required: 'يجب تسجيل  اسم مصدر الاعلام.',
         minlength: 'يجب أن يكون  اسم  مصدر الاعلام  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزاسم  مصدر الاعلام  15 حرفًا.'
      },
       lastNameAgent: {
       required: 'يجب تسجيل لقب  مصدر الاعلام',
         minlength: 'يجب أن يكون  لقب  مصدر الاعلام  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز   لقب  مصدر الاعلام  15 حرفًا.'
      },
      natureInfo: {
       required: 'يجب تسجيل نوع   مصدر الاعلام',
         minlength: 'يجب أن يكون  نوع   مصدر الاعلام  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز   نوع   مصدر الاعلام  15 حرفًا.'
      },
       phoneAgent: {
        required: 'يجب تسجيل هاتف مصدر الاعلام'
      }
    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.sourceInfoForm = this.fb.group({
      nameInfo: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      lastNameInfo: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      sourceInfo: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
       phoneInfo: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getSourceInfo(id);
      }
    );

    this.sourceinfoService.getSourcesInfo().subscribe(
      sourcesinfo => {
        this.sourcesinfo = sourcesinfo;
        this.filteredSourceInfo = this.sourcesinfo;
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

    
    merge(this.sourceInfoForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.sourceInfoForm);
    });
  }

  

  getSourceInfo(id: number): void {
    this.sourceinfoService.getSourceInfo(id)
      .subscribe(
        (sourceInfo: SourceInfoDto) => this.displaySourceInfo(sourceInfo),
        (error: any) => this.errorMessage = <any>error
      );
  }

  

  displaySourceInfo(sourceinfo: SourceInfoDto): void {
    if (this.sourceInfoForm) {
      this.sourceInfoForm.reset();
    }
    this.sourceinfo = sourceinfo;

    if (this.sourceinfo.id === 0) {
      this.pageTitle = 'إإضافة مصدر الاعلام ';
    } else {
      this.pageTitle = 'تحديث مصدر الاعلام ${this.sourceinfo.id}';
    }

   
    this.sourceInfoForm.setValue({
    nameInfo: this.sourceinfo.nameInfo,
    lastNameInfo: this.sourceinfo.lastNameInfo,
    natureInfo:this.sourceinfo.natureInfo,
    phoneInfo: this.sourceinfo.phoneInfo
    });
    
  }

  deleteSourceInfo(): void {
    if (this.sourceinfo.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the source info: ${this.sourceinfo.id}?`)) {
        this.sourceinfoService.deleteSourceInfo(this.sourceinfo.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveSourceInfo(): void {
    if (this.sourceInfoForm.valid) {
      if (this.sourceInfoForm.dirty) {
        const a = { ...this.sourceinfo, ...this.sourceInfoForm.value };

        if (a.id === 0) {
          this.sourceinfoService.createSourceInfo(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.sourceinfoService.updateSourceInfo(a)
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
    
    this.sourceInfoForm.reset();
    this.router.navigate(['/base/قائمة مصدر الاعلام ']);
  }
}
