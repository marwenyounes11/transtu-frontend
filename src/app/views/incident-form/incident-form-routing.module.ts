import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DailyReportFormComponent } from'./daily-report-form.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Incident Forms'
        },
        children: [
            {
                path: '',
                redirectTo: 'daily incident form'
            },
            {
                path: '',
                component: DailyReportFormComponent,
                data: {
                    title: 'Daily report form'
                }
            }
        ]
    }
]
@NgModule({
    //forChild(routes)
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IncidentFormRoutingModule { }