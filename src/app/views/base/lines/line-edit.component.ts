import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {LineDto } from './linedto';
import { LineService } from './line.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './line-edit.component.html'
})
export class LineEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث الخط' ;
  errorMessage: string;
  lineForm: FormGroup;

  line: LineDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredLine: LineDto[] = [];
lines: LineDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lineService: LineService) {

   
   this.validationMessages = {
       nameLine: {
        required: 'يجب تسجيل  اسم الخط.',
         minlength: 'يجب أن يكون  اسم الخط  متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزاسم الخط 15 حرفًا.'
      }

    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.lineForm = this.fb.group({
      nameLine: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getLine(id);
      }
    );

    this.lineService.getLines().subscribe(
      lines => {
        this.lines = lines;
        this.filteredLine = this.lines;
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

    
    merge(this.lineForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.lineForm);
    });
  }

  

  getLine(id: number): void {
    this.lineService.getLine(id)
      .subscribe(
        (line: LineDto) => this.displayLine(line),
        (error: any) => this.errorMessage = <any>error
      );
  }
  

  

  displayLine(line: LineDto): void {
    if (this.lineForm) {
      this.lineForm.reset();
    }
    this.line = line;

    if (this.line.id === 0) {
      this.pageTitle = 'إضافة خط';
    } else {
      this.pageTitle = `تحديث الخط: ${this.line.id}`;
    }

   
    this.lineForm.setValue({
    nameLine: this.line.nameLine,
    });
    
  }

  deleteLine(): void {
    if (this.line.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the line: ${this.line.id}?`)) {
        this.lineService.deleteLine(this.line.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveLine(): void {
    if (this.lineForm.valid) {
      if (this.lineForm.dirty) {
        const a = { ...this.line, ...this.lineForm.value };

        if (a.id === 0) {
          this.lineService.createLine(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.lineService.updateLine(a)
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
    
    this.lineForm.reset();
    this.router.navigate(['/base/قائمة الخطوط ']);
  }
}
