import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderTimelineBarComponent } from './order-timeline-bar/order-timeline-bar.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent,
    DashboardComponent,
    OrderTimelineBarComponent,
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    SharedModule
  ]
})
export class NavigationModule { }
