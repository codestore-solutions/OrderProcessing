import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerDetailCardComponent } from './customer-detail-card/customer-detail-card.component';
import { VendorDetailCardComponent } from './vendor-detail-card/vendor-detail-card.component';
import { DeliveryDetailCardComponent } from './delivery-detail-card/delivery-detail-card.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent,
    DashboardComponent,
    CustomerDetailCardComponent,
    VendorDetailCardComponent,
    DeliveryDetailCardComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    SharedModule
  ]
})
export class NavigationModule { }
