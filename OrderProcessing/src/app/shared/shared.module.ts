import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';

import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PortalModule } from '@angular/cdk/portal';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips'
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NoDataFoundComponent } from './no-data-found/no-data-found.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


const dependencies = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatCardModule,
  MatDividerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatGridListModule,
  MatMenuModule,
  LayoutModule,
  MatTabsModule,
  ReactiveFormsModule,
  FormsModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  PortalModule,
  HttpClientModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatChipsModule,
  CommonModule,
  FlexLayoutModule,
  MatProgressBarModule
]


@NgModule({
  declarations: [
    PageNotFoundComponent,
    NoDataFoundComponent
  ],
  imports: [
    CommonModule,
    dependencies
  ],
  exports: [
    dependencies,
    PageNotFoundComponent,
    NoDataFoundComponent
  ]
})
export class SharedModule { }
