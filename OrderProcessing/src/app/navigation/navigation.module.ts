import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';


@NgModule({
  declarations: [
    NavigationComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    SharedModuleModule
  ]
})
export class NavigationModule { }
