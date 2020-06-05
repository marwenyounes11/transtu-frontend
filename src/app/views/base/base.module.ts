// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CardsComponent } from './cards.component';
import{AccidentModule} from './accidents/accident.module';
import{AgentPcrModule} from './agentpcr/agentpcr.module';
import{ChauffeurModule} from './chauffeurs/chauffeur.module';
import{DegatModule} from './degat/degat.module';
import{DepartementModule} from './departements/departement.module';
import{DepotModule} from './depots/depot.module';
import{DistrictModule} from './districts/district.module';
import{EmplacementModule} from './emplacements/emplacement.module';
import{LineModule} from './lines/line.module';
import{RapportModule} from './rapports/rapport.module';
import{ReceveurModule} from './receveurs/receveur.module';
import{RecordModule} from './record/record.module';
import{SourceInfoModule} from './sourceinfo/sourceinfo.module';
import{TransportModule} from './transport/transport.module';
import{VictimeModule} from './victime/victime.module';
// Forms Component
import { FormsComponent } from './forms.component';

import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselsComponent } from './carousels.component';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CollapsesComponent } from './collapses.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoversComponent } from './popovers.component';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationsComponent } from './paginations.component';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProgressComponent } from './progress.component';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TooltipsComponent } from './tooltips.component';


// Components Routing
import { BaseRoutingModule } from './base-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccidentModule,
    AgentPcrModule,
    ChauffeurModule,
    DegatModule,
    DepartementModule,
    DepotModule,
    DistrictModule,
    EmplacementModule,
    LineModule,
    RapportModule,
    ReceveurModule,
    RecordModule,
    SourceInfoModule,
    TransportModule,
    VictimeModule,
    BaseRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    CardsComponent,
    FormsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent,
    CarouselsComponent,
    CollapsesComponent,
    PaginationsComponent,
    PopoversComponent,
    ProgressComponent,
    TooltipsComponent
  ]
})
export class BaseModule { }
