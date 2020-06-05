import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DailyReportFormComponent } from './daily-report-form.component';

@NgModule({
    imports:[
        CommonModule,
        DailyReportFormComponent,
        FormsModule
    ],
    declarations:[
        DailyReportFormComponent
    ]
})

export class IncidentFormModule{}