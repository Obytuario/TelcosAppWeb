import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { WorkOrdersComponent } from './work-orders/work-orders.component';
import { TechnicalComponent } from './technical/technical.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    WorkOrdersComponent,
    TechnicalComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE'
    }),
    LocationRoutingModule
  ]
})
export class LocationModule { }
