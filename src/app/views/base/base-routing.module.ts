import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';
import { CarouselsComponent } from './carousels.component';
import { CollapsesComponent } from './collapses.component';
import { PaginationsComponent } from './paginations.component';
import {PopoversComponent} from './popovers.component';
import {ProgressComponent} from './progress.component';
import {TooltipsComponent} from './tooltips.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'تقارير'
    },
    children: [
      {
        path: '',
        redirectTo: 'تقارير'
      },
      {
        path: 'اعلام_بحدث',
        component: CardsComponent,
        data: {
          title: 'تقرير اعلام بحدث-حادث مرور'
        }
      },
      {
        path: 'تقارير',
        component: FormsComponent,
        data: {
          title: ' جدول الاعتداءات اليومية '
        }
      },
      {
        path: 'تسجيل_مطفأة',
        component: CarouselsComponent,
        data: {
          title: 'تسجيل مطفأة حريق'
        }
      },
      {
        path: 'متابعة_مطفأة',
        component: CollapsesComponent,
        data: {
          title: 'متابعة مطفأة حريق'
        }
      },
      {
        path: 'switches',
        component: SwitchesComponent,
        data: {
          title: 'Switches'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
     
      {
        path: 'paginations',
        component: PaginationsComponent,
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'popovers',
        component: PopoversComponent,
        data: {
          title: 'Popover'
        }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'Progress'
        }
      },
      {
        path: 'tooltips',
        component: TooltipsComponent,
        data: {
          title: 'Tooltips'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
