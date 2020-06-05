import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Chauffeur } from './chauffeur';
import { ChauffeurService } from './chauffeur.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './chauffeur-edit.component.html'
})
export class ChauffeurEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Chauffeur Edit';
  errorMessage: string;
  chauffeurForm: FormGroup;

   chauffeur: Chauffeur;
  private sub: Subscription;

  
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private chauffeurService: ChauffeurService) {

    
    this.validationMessages = {
     addressChauffeur: {
         required: 'يجب تسجيل  عنوان  السائق.',
         minlength: 'يجب أن يكون  عنوان  السائق  متكون من 8 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزعنوان  السائق 25 حرفًا.'
      },
       cityChauffeur: {
        required: 'يجب تسجيل  مدينة  السائق.',
         minlength: 'يجب أن تكون   مدينة  السائق  متكونة من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن تتجاوز مدينة  السائق 25 حرفًا.'
      },
       emailChauffeur: {
        required: 'يجب تسجيل  البريد الإلكتروني للسائق.',
         minlength: 'يجب أن يكون  البريد الإلكتروني للسائق  متكون من 8 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزالبريد الإلكتروني للسائق 25 حرفًا.',
        email:'يجب ادخال بريد الكترويي صحيح'
      },
       lastNameChauffeur: {
         required: 'يجب تسجيل  لقب  السائق.',
         minlength: 'يجب أن يكون  لقب  السائق  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزلقب  السائق 15 حرفًا.'
      },
     nameChauffeur: {
         required: 'يجب تسجيل  اسم السائق.',
         minlength: 'يجب أن يكون اسم السائق  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزاسم السائق 15 حرفًا.'
      },
       phoneChauffeur: {
         required: 'يجب تسجيل  هاتف السائق.',
         minlength: 'يجب أن يكون هاتف السائق  متكون من 8 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزهاتف السائق 11 حرفًا.'
      }
      
    };

   
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.chauffeurForm = this.fb.group({
      addressChauffeur: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25)]],
      cityChauffeur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]],
      emailChauffeur: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.email]],
      lastNameChauffeur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      nameChauffeur: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
       phoneChauffeur: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(11)]]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getChauffeur(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    
    merge(this.chauffeurForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.chauffeurForm);
    });
  }

 

  
  getChauffeur(id: number): void {
    this.chauffeurService.getChauffeur(id)
      .subscribe(
        (chauffeur: Chauffeur) => this.displayChauffeur(chauffeur),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayChauffeur(chauffeur: Chauffeur): void {
    if (this.chauffeurForm) {
      this.chauffeurForm.reset();
    }
    this.chauffeur = chauffeur;

    if (this.chauffeur.id === 0) {
      this.pageTitle = 'اضافة السائق';
    } else {
      this.pageTitle = `تحديث السائق: ${this.chauffeur.nameChauffeur}`;
    }

   
    this.chauffeurForm.setValue({
       addressChauffeur: this.chauffeur.addressChauffeur,
        cityChauffeur: this.chauffeur.cityChauffeur,
         emailChauffeur: this.chauffeur.emailChauffeur,
         lastNameChauffeur: this.chauffeur.lastNameChauffeur,
     nameChauffeur: this.chauffeur.nameChauffeur,
      phoneChauffeur: this.chauffeur.phoneChauffeur
      
    });
    
  }

  deletechauffeur(): void {
    if (this.chauffeur.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the chauffeur: ${this.chauffeur.nameChauffeur}?`)) {
        this.chauffeurService.deleteChauffeur(this.chauffeur.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveChauffeur(): void {
    if (this.chauffeurForm.valid) {
      if (this.chauffeurForm.dirty) {
        const r = { ...this.chauffeur, ...this.chauffeurForm.value };

        if (r.id === 0) {
          this.chauffeurService.createChauffeur(r)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.chauffeurService.updateChauffeur(r)
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
    
    this.chauffeurForm.reset();
    this.router.navigate(['/قائمة السائقين']);
  }
}
