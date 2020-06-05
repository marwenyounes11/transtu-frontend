import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {MetroDto } from './metrodto';
import { TransportService } from './transport.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './metro-edit.component.html'
})
export class MetroEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تعديل المترو';
  errorMessage: string;
  metroForm: FormGroup;

  metro: MetroDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private metroService: TransportService) {

   
    this.validationMessages = {
     numTransport: {
         required: 'يجب ادخال  رقم المترو.'
      },
      immatriculation: {
        required: 'يجب ادخال  رقم التسجيل.' 
      },
      marque: {
         required: 'يجب تسجيل نوع المترو.',
         minlength: 'يجب أن يكون نوع المترو  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزنوع المترو 20 حرفًا.'
      },
      model: {
          required: 'يجب تسجيل نموذج المترو',
         minlength: 'يجب أن يكون نموذج المترو  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز نموذج المترو 20 حرفًا.'
      },
      gabarit: {
       required: 'يجب تسجيل عدد المقاعد.'
      },
      idDistrict: {
      required: 'يجب تسجيل الاقليم.'
      },
      idLine: {
       required: 'يجب تسجيل الخط.'
      },
      idAccident: {
      required: 'يجب تسجيل رقم الحادث.'
      },
      idChauffeur: {
      required: 'يجب تسجيل السائق'
      },
      idDegat: {
        required: 'يجب تسجيل الضرر'
      }
    };

    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.metroForm = this.fb.group({
      numTransport: ['', Validators.required],
      immatriculation: ['', Validators.required],
      marque: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]],
      model: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)]],
      gabarit: ['', Validators.required],
      idDistrict: ['', Validators.required],
      idLine: ['', Validators.required],
      idAccident: ['', Validators.required],
      idChauffeur: ['', Validators.required],
      idDegat: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getMetro(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    
    merge(this.metroForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.metroForm);
    });
  }

  

  

  getMetro(id: number): void {
    this.metroService.getMetro(id)
      .subscribe(
        (metro: MetroDto) => this.displayMetro(metro),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayMetro(metro: MetroDto): void {
    if (this.metroForm) {
      this.metroForm.reset();
    }
    this.metro = metro;

    if (this.metro.id === 0) {
      this.pageTitle = '   اضافة   مترو';
    } else {
      this.pageTitle = ` تحديث   مترو:  ${this.metro.numTransport}`;
    }

   
    this.metroForm.setValue({
      numTransport: this.metro.numTransport,
      immatriculation: this.metro.immatriculation,
      marque: this.metro.marque,
      model: this.metro.model,
      gabarit: this.metro.gabarit,
      idDistrict: this.metro.idDistrict,
      idLine: this.metro.idLine,
      idAccident: this.metro.idDistrict,
      idChauffeur: this.metro.idChauffeur,
     idDegatMateriel: this.metro.idDegatMateriel
    });
    
  }

  deleteMetro(): void {
    if (this.metro.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the metro: ${this.metro.numTransport}?`)) {
        this.metroService.deleteMetro(this.metro.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveMetro(): void {
    if (this.metroForm.valid) {
      if (this.metroForm.dirty) {
        const b = { ...this.metro, ...this.metroForm.value };

        if (b.id === 0) {
          this.metroService.createMetro(b)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.metroService.updateMetro(b)
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
    
    this.metroForm.reset();
    this.router.navigate(['/metro']);
  }
}
