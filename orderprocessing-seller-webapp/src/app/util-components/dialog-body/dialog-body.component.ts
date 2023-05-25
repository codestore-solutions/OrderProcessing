import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ReusableTableComponent } from '../reusable-table/reusable-table.component';
import { Store } from '@ngrx/store';
import { selectCartDetails } from 'src/app/store/selector/order.selector';


@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit {
  cartDetail$ = this.store.select(selectCartDetails);
  cartData;
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<ReusableTableComponent>, private store: Store) {

  }

  ngOnInit(): void {
    this.cartDetail$.subscribe(res => {
      this.cartData = res;
    })
  }
}
