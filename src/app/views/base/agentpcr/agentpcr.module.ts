import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AgentPcrListComponent } from './agent-pcr-list.component';
import { AgentPcrDetailComponent } from './agent-pcr-detail.component';
import { AgentPcrEditComponent } from './agent-pcr-edit.component';
import { AgentPcrEditGuard} from './agent-pcr-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path:'قائمة العمال', component: AgentPcrListComponent },
      { path: 'agents/:id', component: AgentPcrDetailComponent },
      {
        path: 'agents/:id/edit',
        canDeactivate: [AgentPcrEditGuard],
        component: AgentPcrEditComponent
      }
    ])
  ],
  declarations: [
    AgentPcrListComponent,
    AgentPcrDetailComponent,
   AgentPcrEditComponent
  ]
})
export class AgentPcrModule { }