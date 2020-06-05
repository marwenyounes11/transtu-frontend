import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {TrainDto } from './traindto';
import { TransportService } from './transport.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './train-edit.component.html'
})
export class TrainEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle ='تحديث القطارات';
  errorMessage: string;
  trainForm: FormGroup;

  train: TrainDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trainService: TransportService) {

   
    this.validationMessages = {
     numTransport: {
         required: 'يجب ادخال  رقم القطار.'
      },
      immatriculation: {
        required: 'يجب ادخال  رقم التسجيل.' 
      },
      marque: {
         required: 'يجب تسجيل نوع القطار',
         minlength: 'يجب أن يكون نوع القطار  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزنوع القطار 20 حرفًا.'
      },
      model: {
          required: 'يجب تسجيل نموذج القطار',
         minlength: 'يجب أن يكون نموذج القطار  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز نموذج القطار 20 حرفًا.'
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
    this.trainForm = this.fb.group({
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
        this.getTrain(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    
    merge(this.trainForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.trainForm);
    });
  }

  

  

  getTrain(id: number): void {
    this.trainService.getTrain(id)
      .subscribe(
        (train: TrainDto) => this.displayTrain(train),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayTrain(train: TrainDto): void {
    if (this.trainForm) {
      this.trainForm.reset();
    }
    this.train = train;

    if (this.train.id === 0) {
      this.pageTitle = '   اضافة   قطار';
    } else {
      this.pageTitle = ` تحديث  قطار:  ${this.train.numTransport}`;
    }

   
    this.trainForm.setValue({
      numTransport: this.train.numTransport,
      immatriculation: this.train.immatriculation,
      marque: this.train.marque,
      model: this.train.model,
      gabarit: this.train.gabarit,
      idDistrict: this.train.idDistrict,
      idLine: this.train.idLine,
      idAccident: this.train.idDistrict,
      idChauffeur: this.train.idChauffeur,
       idDegatMateriel: this.train. idDegatMateriel,
    });
    
  }

  deleteTrain(): void {
    if (this.train.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the train: ${this.train.numTransport}?`)) {
        this.trainService.deleteTrain(this.train.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveTrain(): void {
    if (this.trainForm.valid) {
      if (this.trainForm.dirty) {
        const b = { ...this.train, ...this.trainForm.value };

        if (b.id === 0) {
          this.trainService.createTrain(b)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.trainService.updateTrain(b)
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
    
    this.trainForm.reset();
    this.router.navigate(['/train']);
  }
}
