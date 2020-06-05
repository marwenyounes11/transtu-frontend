import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import {AgentPcrDto } from './agentpcrdto';
import { AgentPcrService } from './agentpcr.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: './agent-pcr-edit.component.html'
})
export class AgentPcrEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'تتحديث عمال القاعة' ;
  errorMessage: string;
  agentPcrForm: FormGroup;

  agentpcr: AgentPcrDto;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  

  filteredAgentPcr: AgentPcrDto[] = [];
 agentspcr: AgentPcrDto[] = [];
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agentpcrService: AgentPcrService) {

   
   this.validationMessages = {
      nameAgent: {
        required: 'يجب تسجيل  اسم عامل القاعة.',
         minlength: 'يجب أن يكون  اسم عامل القاعة  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوزاسم عامل القاعة 15 حرفًا.'
      },
       lastNameAgent: {
       required: 'يجب تسجيل لقب عامل القاعة',
         minlength: 'يجب أن يكون  لقب عامل القاعة  متكون من 3 أحرف على الأقل.',
        maxlength: 'لا يمكن أن يتجاوز   لقب عامل القاعة  15 حرفًا.'
      },
       phoneAgent: {
        required: 'يجب تسجيل هاتف عامل القاعة'
      }
    };
    
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.agentPcrForm = this.fb.group({
      nameAgent: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
      lastNameAgent: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)]],
       phoneAgent: ['', Validators.required]
    });

    
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getAgentPcr(id);
      }
    );

    this.agentpcrService.getAgentsPcr().subscribe(
      agentspcr => {
        this.agentspcr = agentspcr;
        this.filteredAgentPcr = this.agentspcr;
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

    
    merge(this.agentPcrForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.agentPcrForm);
    });
  }

  
getAgentPcr(id: number): void {
    this.agentpcrService.getAgentPcr(id)
      .subscribe(
        (agentpcr: AgentPcrDto) => this.displayAgentPcr(agentpcr),
        (error: any) => this.errorMessage = <any>error
      );
  }
  

  

  displayAgentPcr(agentpcr: AgentPcrDto): void {
    if (this.agentPcrForm) {
      this.agentPcrForm.reset();
    }
    this.agentpcr = agentpcr;

    if (this.agentpcr.id === 0) {
      this.pageTitle = 'إضافة عامل  القاعة';
    } else {
      this.pageTitle = `تحديث عامل  القاعة : ${this.agentpcr.id}`;
    }

   
    this.agentPcrForm.setValue({
    nameAgent: this.agentpcr.nameAgent,
    lastNameAgent: this.agentpcr. lastNameAgent,
    phoneAgent: this.agentpcr.phoneAgent
    });
    
  }

  deleteAgentPcr(): void {
    if (this.agentpcr.id === 0) {
      
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the agentPcr: ${this.agentpcr.id}?`)) {
        this.agentpcrService.deleteAgentPcr(this.agentpcr.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveAgentPcr(): void {
    if (this.agentPcrForm.valid) {
      if (this.agentPcrForm.dirty) {
        const a = { ...this.agentpcr, ...this.agentPcrForm.value };

        if (a.id === 0) {
          this.agentpcrService.createAgentPcr(a)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.agentpcrService.updateAgentPcr(a)
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
    
    this.agentPcrForm.reset();
    this.router.navigate(['/base/ائمة  عمال ']);
  }
}
