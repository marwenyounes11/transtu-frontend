import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {VictimeDto } from './victimedto';
import { VictimeService } from './victime.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './victime-edit.component.html'
})
export class VictimeEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث الضحايا' ;
  errorMessage: string;
  victimeForm: FormGroup;

  victime: VictimeDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredVictime: VictimeDto[] = [];
victimes: VictimeDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private victimeService: VictimeService) {

   
   this.validationMessages = {
      corpBlesser: {
        required: 'يجب تسجيل  الضحية.',
         minlength: 'يجب أن تكون  الضحية  متكونة من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن تتجاوزالضحية 15 حرفًا.'
      },
       niveauBlessure: {
        required: 'يجب تسجيل  مستوى الاصابة'
      },
       etatVictime: {
        required: 'يجب تسجيل  الحالة'
      },
      typeVictime: {
        required: 'يجب تسجيل  صفة  الضحية'
      },
       lastNameVictime: {
        required: 'يجب تسجيل  لقب الضحية.',
         minlength: 'يجب أن يكون   لقب الضحية  متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزلقب الضحية 15 حرفًا.'
      },
       nameVictime: {
        required: 'يجب تسجيل  اسم الضحية.',
         minlength: 'يجب أن يكون  اسم الضحية  متكون  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزاسم الضحية 15 حرفًا.'
      }

    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.victimeForm = this.fb.group({
     corpBlesser: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      niveauBlessure: ['', Validators.required],
        etatVictime: ['', Validators.required],
        typeVictime: ['', Validators.required],
      lastNameVictime: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      nameVictime: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getVictime(id);
      }
    );

    this.victimeService.getVictimes().subscribe(
      victimes => {
        this.victimes = victimes;
        this.filteredVictime = this.victimes;
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

    
    merge(this.victimeForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.victimeForm);
    });
  }

  

  getVictime(id: number): void {
    this.victimeService.getVictime(id)
      .subscribe(
        (victime: VictimeDto) => this.displayVictime(victime),
        (error: any) => this.errorMessage = <any>error
      );
  }

  

  displayVictime(victime: VictimeDto): void {
    if (this.victimeForm) {
      this.victimeForm.reset();
    }
    this.victime = victime;

    if (this.victime.id === 0) {
      this.pageTitle ='إضافة ضحايا';
    } else {
      this.pageTitle = `تحديث ضحايا: ${this.victime.id}`;
    }

   
    this.victimeForm.setValue({
    corpBlesser: this.victime.corpBlesser,
    niveauBlessure: this.victime.niveauBlessure,
    etatVictime: this.victime.etatVictime,
    typeVictime: this.victime.typeVictime,
    lastNameVictime: this.victime.lastNameVictime,
    nameVictime: this.victime.nameVictime
    });
    
  }

  deleteVictime(): void {
    if (this.victime.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the victime: ${this.victime.id}?`)) {
        this.victimeService.deleteVictime(this.victime.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveVictime(): void {
    if (this.victimeForm.valid) {
      if (this.victimeForm.dirty) {
        const a = { ...this.victime, ...this.victimeForm.value };

        if (a.id === 0) {
          this.victimeService.createVictime(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.victimeService.updateVictime(a)
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
    
    this.victimeForm.reset();
    this.router.navigate(['/base/قائمة  الضحايا ']);
  }
}
