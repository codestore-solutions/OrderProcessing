import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { DataService } from './services/data.service';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { dataReducer } from './store/reducer/order.reducer';
import { OrderEffects } from './store/effects/orders.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OrdersComponent } from './component/orders/orders.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DialogBodyComponent } from './util-components/dialog-body/dialog-body.component';

import { BookingsComponent } from './component/bookings/bookings.component';
import { ReusableTableComponent } from './util-components/reusable-table/reusable-table.component';
import { ProductDetailsComponent } from './util-components/product-details/product-details.component';
import { OrderDetailComponent } from './component/order-detail/order-detail.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { SharedModule } from './shared/shared.module';
import { IconsProviderModule } from './icons-provider.module';
import { NavComponent } from './component/nav/nav.component';
import { TokenIntercepter } from './services/interceptors/token.intercepter';
registerLocaleData(en);
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    DashboardComponent,
    DialogBodyComponent,
    BookingsComponent,
    ReusableTableComponent,
    ProductDetailsComponent,
    OrderDetailComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ order: dataReducer, booking: dataReducer, cartDetails: dataReducer, serviceCategoryList: dataReducer, productList: dataReducer}, {}),
    EffectsModule.forRoot([OrderEffects]),
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    IconsProviderModule,
    SharedModule
  ],
  providers: [
    DataService, 
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepter,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
