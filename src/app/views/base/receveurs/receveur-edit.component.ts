import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {ReceveurDto } from './receveurdto';
import { ReceveurService } from './receveur.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './receveur-edit.component.html'
})
export class ReceveurEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تحديث القباض ' ;
  errorMessage: string;
  receveurForm: FormGroup;

  receveur: ReceveurDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredReceveur: ReceveurDto[] = [];
receveurs: ReceveurDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private receveurService: ReceveurService) {

   
   this.validationMessages = {
       adressChauffeur: {
        required: 'يجب تسجيل  عنوان القابض.',
         minlength: 'يجب أن يكون عنوان القابض متكون  من 8 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزعنوان القابض 20 حرفًا.'
      },
cityChauffeur: {
        required: 'يجب تسجيل  مدينة القابض.',
         minlength: 'يجب أن تكون مدينة القابض متكونة  من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن تتجاوزمدينة القابض 10 احرف.'
      },
emailChauffeur: {
        required: 'يجب تسجيل  البريد الالكتروني للقابض.',
         minlength: 'يجب أن يكون البريد الالكتروني للقابض متكون  من 8 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزالبريد الالكتروني للقابض 20 حرفًا.'
      },
lastNameChauffeur: {
        required: 'يجب تسجيل  لقب القابض.',
         minlength: 'يجب أن يكون لقب السائق متكون  من 8 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزلقب السائق 20 حرفًا.'
      },
nameChauffeur: {
        required: 'يجب تسجيل  اسم القابض.',
         minlength: 'يجب أن يكون اسم السائق متكون  من 8 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزاسم السائق 20 حرفًا.'
      },
phoneChauffeur: {
        required: 'يجب تسجيل  هاتف القابض.',
         minlength: 'يجب أن يكون هاتف السائق متكون  من 8 أرقام على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزهاتف السائق 11 رقم.'
      }
    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.receveurForm = this.fb.group({
      addressReceveur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      cityReceveur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      emailReceveur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      lastNameReceveur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      nameReceveur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      phoneReceveur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getReceveur(id);
      }
    );

    this.receveurService.getReceveurs().subscribe(
      receveurs => {
        this.receveurs = receveurs;
        this.filteredReceveur = this.receveurs;
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

    
    merge(this.receveurForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.receveurForm);
    });
  }

  
getReceveur(id: number): void {
    this.receveurService.getReceveur(id)
      .subscribe(
        (receveur: ReceveurDto) => this.displayReceveur(receveur),
        (error: any) => this.errorMessage = <any>error
      );
  }
  

  

  displayReceveur(receveur: ReceveurDto): void {
    if (this.receveurForm) {
      this.receveurForm.reset();
    }
    this.receveur = receveur;

    if (this.receveur.id === 0) {
      this.pageTitle = 'اضافة القباض';
    } else {
      this.pageTitle = `تحديث القباض${this.receveur.id}`;
    }

   
    this.receveurForm.setValue({
    addressReceveur: this.receveur.addressReceveur,
    cityReceveur: this.receveur.cityReceveur,
    emailReceveur: this.receveur.emailReceveur,
    lastNameReceveur: this.receveur.lastNameReceveur,
    nameReceveur: this.receveur.nameReceveur,
    phoneReceveur: this.receveur.phoneReceveur
    });
    
  }

  deleteReceveur(): void {
    if (this.receveur.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the receveur: ${this.receveur.id}?`)) {
        this.receveurService.deleteReceveur(this.receveur.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveReceveur(): void {
    if (this.receveurForm.valid) {
      if (this.receveurForm.dirty) {
        const a = { ...this.receveur, ...this.receveurForm.value };

        if (a.id === 0) {
          this.receveurService.createReceveur(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.receveurService.updateReceveur(a)
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
    
    this.receveurForm.reset();
    this.router.navigate(['/base/قائمة  القباض']);
  }
}
