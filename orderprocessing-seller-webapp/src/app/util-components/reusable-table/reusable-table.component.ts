import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.css']
})
export class ReusableTableComponent implements OnInit, OnChanges{
  @Input() HeadArray: any[] = [];
  @Input() DataArray: any[] = [];
  @Input() Title: string = '';
  @Input() TableType: string = '';
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  @Output() dispatch = new EventEmitter<any>();
  @Output() details = new EventEmitter<any>();
  sellerID: string = 'eb1f91cc-0b57-4fa2-ac55-8c1848bb0903';

  constructor(public dialog: MatDialog, private store: Store, private router: Router, private service: DataService) {

  }
  ngOnInit() {
    this.displayedColumns = this.displayedColumns.concat(this.HeadArray.map(c => c.field_name));
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.DataArray);
  }


  onDispatch(item: any) {
    this.dispatch.emit(item);
  }

  onDetail(item: any) {
    
    this.details.emit(item);
    if(item.cartId != null) {
      this.router.navigate([`order-details/${this.Title}/${item.cartId}`]);
    }else if(item.bookingId != null) {
      
    }
  }


  onApprove(item: any) {
    this.details.emit(item);
  }

  onCardClosed(event: Event) {
    console.log(event);
  }

  changeStatus(item, i) {
    console.log(i);
    this.DataArray.splice(i, 1);
    this.dataSource = new MatTableDataSource(this.DataArray);
    this.service.changeOrderStatus(item.cartId);
  }
}
