import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './component/orders/orders.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BookingsComponent } from './component/bookings/bookings.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'bookings',
    component: BookingsComponent
  },
  {
    path: 'order-details/:title',
    component: OrderDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
