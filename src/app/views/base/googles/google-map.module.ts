import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { GoogleMapComponent } from './google-map.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({apiKey:'AIzaSyAwCPbQv6XPe0SIiBPy3fJg5OevzUopTVY'
    }),
    RouterModule.forChild([
      { path: 'googlemap', component: GoogleMapComponent }    
  ])
  ],

  declarations: [
    GoogleMapComponent
  ]
})
export class GoogleMapModule { }