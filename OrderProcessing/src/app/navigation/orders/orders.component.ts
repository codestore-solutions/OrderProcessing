import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { Orders } from 'src/app/model/orders';
import { ResponseModel } from 'src/app/model/response.model';
import { DataService } from 'src/app/services/data.service';

export interface UniqueOrderObject {
  id: number;
  customer: string;
  createdAt: string;
  amount: string;
  paymentMode: number;
  paymentStatus: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  status: string[] = [
    'New',
    'Cancel',
    'Packing',
    'Packing Completed',
    'Agent Assigned',
    'Accepted by Agent',
    'Agent Re-assigned',
    'Picked Up',
    'Reached Destination',
    'Not Accepted by Customer',
    'Delivered',
    'Return',
    'Exchanged',
    'Payment Failed',
    'Cancelled by Seller',
    'Cancelled by Customer'
  ];
  PaymentStatus = {
    0 : "Failed",
    1 : "Successful",
    2 : "Pending"
  };
  PaymentMode = {
    1 : "Online",
    2 : "COD"
  }

  selectedStatus!:number;
  statusList!:{id:number; name:string;}[];
  totalOrdersWithRespectiveStatus!:number;

  columnsToDisplay: string[] = ["serial", "id", "customer", "createdAt", "amount", "paymentMode", "paymentStatus", "action"];
  mainDataSource!: MatTableDataSource<UniqueOrderObject>;
  @ViewChild('paginator') paginator!: MatPaginator;

  statusSpecificOrderList!: Orders;
  remappedStatusSpecificOrderList: UniqueOrderObject[] = [];

  pageConfig: { page: number; pageSize: number } = {
    page: 0,
    pageSize: 50
  }

  constructor(
    private _dataService: DataService,
    private router: Router,
    private datePipe: DatePipe,
    private _cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.selectedStatus = 1;
    this.getAllOrderStatuses();
    this.getBusinessRelatedOrders();
  }

  getAllOrderStatuses(): void {
    this._dataService.getOrderStatuses().subscribe((res) => {
      this.statusList = res.data;
    })
  }

  getBusinessRelatedOrders(): void {
    this._dataService.getOrdersBySellerIdAndOrderStatus(3, this.pageConfig.page+1, this.pageConfig.pageSize, [this.selectedStatus])
    .subscribe((res) => {
      this.statusSpecificOrderList = res;
      this.totalOrdersWithRespectiveStatus = res.data.totalOrders;
      this.orderListDataHandler(this.statusSpecificOrderList);
      this.mainDataSource = new MatTableDataSource(this.remappedStatusSpecificOrderList);
      this._cd.detectChanges();
    })
  }

  orderListDataHandler(orderListResponse: Orders): void {
    this.remappedStatusSpecificOrderList = [];
    if (orderListResponse.data.list.length) {
      for (let order of orderListResponse.data.list) {
        let tempOrderObject: UniqueOrderObject = {
          id: order.id,
          customer: order.customer.name,
          createdAt: order.createdAt,
          amount: "N/A",
          paymentMode: this.PaymentMode[order.paymentMode],
          paymentStatus: this.PaymentStatus[order.paymentStatus]
        }
        this.remappedStatusSpecificOrderList.push(tempOrderObject);
      }
    }
  }

  orderStatusSelectionChange(e:MatSelectChange):void{
    this.selectedStatus = e.value;
    this.getBusinessRelatedOrders();
  }

  handlePageEvent(e:PageEvent){
    this.pageConfig.pageSize = e.pageSize;
    this.pageConfig.page = e.pageIndex;
    this.getBusinessRelatedOrders();
  }
}