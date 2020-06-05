import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {AccidentRoute } from './accidentroute';
import { AccidentService } from './accident.service';
import {SourceInfoService } from '../sourceinfo/sourceinfo.service';
import {SourceInfoDto } from '../sourceinfo/sourceinfodto';
import {EmplacementDto} from '../emplacements/emplacementdto';
import {EmplacementService } from '../emplacements/emplacement.service';
import {AgentPcrDto} from '../agentpcr/agentpcrdto';
import {AgentPcrService } from '../agentpcr/agentpcr.service';
import {RecordDto} from '../record/recorddto';
import {RecordService } from '../record/record.service';
import {DegatDto} from '../degat/degatdto';
import {DegatService } from '../degat/degat.service';
import {TransportDto} from '../transport/transportdto';
import {TransportService } from '../transport/transport.service';
import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './accident-route-edit.component.html'
})
export class AccidentRouteEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Accident Route Edit';
  errorMessage: string;
  accidentRouteForm: FormGroup;

  accident: AccidentRoute;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredAccidentRoute: AccidentRoute[] = [];
 accidents: AccidentRoute[] = [];
  sourceinfos: SourceInfoDto[] = [];
 filteredSourceInfo: SourceInfoDto[] = [];
 emplacements: EmplacementDto[] = [];
 filteredEmplacement: EmplacementDto[] = [];
 agentpcrs: AgentPcrDto[] = [];
 filteredAgentPcr: AgentPcrDto[] = [];
  records: RecordDto[] = [];
 filteredRecord: RecordDto[] = [];
 degats: DegatDto[] = [];
 filteredDegat: DegatDto[] = [];
 transports: TransportDto[] = [];
 filteredTransport: TransportDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accidentService: AccidentService,
    private sourceinfoService: SourceInfoService,
   private emplacementService: EmplacementService,
    private agentpcrService: AgentPcrService,
   private recordService: RecordService,
   private degatService: DegatService,
    private transportService: TransportService) {

   
    this.validationMessages = {
      timeAccident: {
        required: 'يجب تسجيل الوقت.',
      },
     dateAccident: {
        required: 'يجب تسجيل تاريخ الحادث.',
      },
      dateSaisi: {
        required: 'يجب ادخال تاريخ التسجيل.',
      },
      timeSaisi: {
        required: ' يجب ادخال وقت. التسجيل',
      },
      dateInfo: {
        required: 'يجب ادخال تاريخ الاعلام.',
      },
      timeInfo: {
        required: ' يجب ادخال وقت. الاعلام',
      },
      description: {
        required: 'يجب تسجيل الوصف.',
         minlength: 'يجب أن يكون الوصف متكون من 8 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز الوصف 50 حرفًا.'
      },
      photo: {
        required: 'يجب تسجيل الصورة.',
      },
      typeAccRoute: {
         required: 'يجب تسجيل نوع حادث.',
         minlength: 'يجب أن يكون نوع  حادث متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز نوع حادث 15 حرفًا.'
      },
      idEmplacement: {
        required: 'يجب تسجيل الرقم الالي للموقع.',
      },
idAgentPcr: {
        required: 'يجب تسجيل الرقم الالي للعون.',
      },
idRecord: {
        required: 'يجب تسجيل الرقم الالي للمحضر.',
      },
idSourceInfo: {
        required: 'يجب تسجيل الرقم الالي لمصدر الاعلام.',
      },
idDegat: {
        required: 'يجب تسجيل الرقم الالي لضرر.',
      },
idBus: {
        required: 'يجب تسجيل الرقم الالي للحافلة.',
      }
    };

    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.accidentRouteForm = this.fb.group({
      timeAccident: ['', Validators.required],
      dateAccident: ['', Validators.required],
      dateSaisi: ['', Validators.required],
      timeSaisi: ['', Validators.required],
      dateInfo: ['', Validators.required],
      timeInfo: ['', Validators.required],
      description: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50)]],
      typeAccRoute: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(15)]],
      idEmplacement: ['', Validators.required],
      idAgentPcr: ['', Validators.required],
      idRecord: ['', Validators.required],
      idSourceInfo: ['', Validators.required],
      idDegat: ['', Validators.required],
      idBus: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getAccidentRoute(id);
      }
    );

    this.accidentService.getAccidentsRoute().subscribe(
      accidents => {
        this.accidents = accidents;
        this.filteredAccidentRoute = this.accidents;
      },
      error => this.errorMessage = <any>error
    );
     this.sourceinfoService.getSourcesInfo().subscribe(
      sourceinfos => {
        this.sourceinfos = sourceinfos;
        this.filteredSourceInfo = this.sourceinfos;
      },
      error => this.errorMessage = <any>error
    );

    this.emplacementService.getEmplacements().subscribe(
      emplacements => {
        this.emplacements = emplacements;
        this.filteredEmplacement = this.emplacements;
      },
      error => this.errorMessage = <any>error
    );
     this.agentpcrService.getAgentsPcr().subscribe(
      agentpcrs => {
        this.agentpcrs = agentpcrs;
        this.filteredAgentPcr = this.agentpcrs;
      },
      error => this.errorMessage = <any>error
    );
    this.recordService.getRecords().subscribe(
      records => {
        this.records = records;
        this.filteredRecord = this.records;
      },
      error => this.errorMessage = <any>error
    );
    this.degatService.getDegats().subscribe(
      degats => {
        this.degats = degats;
        this.filteredDegat = this.degats;
      },
      error => this.errorMessage = <any>error
    );
 this.transportService.getTransports().subscribe(
      transports => {
        this.transports = transports;
        this.filteredTransport = this.transports;
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

    
    merge(this.accidentRouteForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.accidentRouteForm);
    });
  }

  

  

  getAccidentRoute(id: number): void {
    this.accidentService.getAccidentRoute(id)
      .subscribe(
        (accident: AccidentRoute) => this.displayAccidentRoute(accident),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayAccidentRoute(accident: AccidentRoute): void {
    if (this.accidentRouteForm) {
      this.accidentRouteForm.reset();
    }
    this.accident = accident;

    if (this.accident.id === 0) {
      this.pageTitle = 'إضافة حادث الطريق';
    } else {
      this.pageTitle = `تحديث حادث الطريق  : ${this.accident.id}`;
    }

   
    this.accidentRouteForm.setValue({
     timeAccident: this.accident.timeAccident,
      dateAccident: this.accident.dateAccident,
      dateSaisi: this.accident.dateSaisi,
      timeSaisi: this.accident.timeSaisi,
      dateInfo: this.accident.dateInfo,
      timeInfo: this.accident.timeInfo,
      description: this.accident.description,
     typeAccRoute: this.accident.typeAccRoute,
     idEmplacement:this.accident.idEmplacement,
     idAgentPcr:this.accident.idAgentPcr,
     idRecord:this.accident.idRecord,
     idSourceInfo:this.accident.idSourceInfo,
     idDegat:this.accident.idDegat,
     idBus:this.accident.idBus
    });
    
  }

  deleteAccident(): void {
    if (this.accident.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the accident: ${this.accident.id}?`)) {
        this.accidentService.deleteAccidentRoute(this.accident.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveAccident(): void {
    if (this.accidentRouteForm.valid) {
      if (this.accidentRouteForm.dirty) {
        const a = { ...this.accident, ...this.accidentRouteForm.value };

        if (a.id === 0) {
          this.accidentService.createAccidentRoute(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.accidentService.updateAccidentRoute(a)
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
    
    this.accidentRouteForm.reset();
    this.router.navigate(['/base/accidentsroute']);
  }
}
