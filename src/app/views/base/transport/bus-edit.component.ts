import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {Bus } from './bus';
import {BusDto } from './busdto';
import { TransportService } from './transport.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './bus-edit.component.html'
})
export class BusEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تعديل الحافلة';
  errorMessage: string;
  busForm: FormGroup;

  bus: BusDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transportService: TransportService) {

   
    this.validationMessages = {
     numTransport: {
         required: 'يجب ادخال  رقم الحافلة.'
      },
      immatriculation: {
        required: 'يجب ادخال  رقم التسجيل.' 
      },
      marque: {
         required: 'يجب تسجيل نوع الحافلة.',
         minlength: 'يجب أن يكون نوع الحافلة  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزنوع الحافلة 20 حرفًا.'
      },
      model: {
          required: 'يجب تسجيل نموذج الحافلة.',
         minlength: 'يجب أن يكون نموذج الحافلة  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز نموذج الحافلة 20 حرفًا.'
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
      idReceveur: {
        required: 'يجب تسجيل الاقليم.'
      },
      idDegat: {
      required: 'يجب تسجيل الضرر'
      }

    };

    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.busForm = this.fb.group({
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
      idReceveur: ['', Validators.required],
      idDegat: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getBus(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    
    merge(this.busForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.busForm);
    });
  }

  

  

  getBus(id: number): void {
    this.transportService.getBus(id)
      .subscribe(
        (bus: Bus) => this.displayBus(bus),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayBus(bus: BusDto): void {
    if (this.busForm) {
      this.busForm.reset();
    }
    this.bus = bus;

    if (this.bus.id === 0) {
      this.pageTitle = '   اضافة   حافلة';
    } else {
      this.pageTitle = ` تحديث   حافلة: ${this.bus.numTransport}`;
    }

   
    this.busForm.setValue({
      numTransport: this.bus.numTransport,
      immatriculation: this.bus.immatriculation,
      marque: this.bus.marque,
      model: this.bus.model,
      gabarit: this.bus.gabarit,
      idDistrict: this.bus.idDistrict,
      idLine: this.bus.idLine,
      idAccident: this.bus.idDistrict,
      idChauffeur: this.bus.idChauffeur,
      idReceveur: this.bus.idReceveur,
      idDegatMateriel: this.bus.idDegatMateriel,
    });
    
  }

  deleteBus(): void {
    if (this.bus.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the bus: ${this.bus.numTransport}?`)) {
        this.transportService.deleteBus(this.bus.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveBus(): void {
    if (this.busForm.valid) {
      if (this.busForm.dirty) {
        const b = { ...this.bus, ...this.busForm.value };

        if (b.id === 0) {
          this.transportService.createBus(b)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.transportService.updateBus(b)
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
    
    this.busForm.reset();
    this.router.navigate(['/bus']);
  }
}
