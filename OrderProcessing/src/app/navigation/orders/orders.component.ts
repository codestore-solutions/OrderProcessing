import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { ResponseModel } from 'src/app/model/response.model';
import { DataService } from 'src/app/services/data.service';

interface orderObject {
  user: string;
  date: string;
  amount: number;
  paymentStatus: string;
  paymentMode: string;
  orderStatus: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  ordersList;
  selectedStatus;
  statusList;
  tableHeaders = [
    { header: "Sr.No.", field_name: "sn" },
    { header: "User", field_name: "user" },
    { header: "Date", field_name: "date" },
    { header: "Amount", field_name: "amount" },
    { header: "Payment Mode", field_name: "paymentMode" },
    { header: 'Order Status', field_name: 'orderStatus'},
    { header: "Action", field_name: "action" }
  ]
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
  ]
  displayedColumns: string[] = [];
  constructor(
    private _dataService: DataService,
    private router: Router,
    private datePipe: DatePipe,
    private change: ChangeDetectorRef) {

    }

  viewDetails(element) {
    this.router.navigate(['order-detail']);
  }
  
  ngOnInit(): void {

    this.getAllOrderStatuses();
    this.getBusinessRelatedOrders();


    const defaultCreds = {
      page: 1,
      pageSize: 10,
      orderStatus: 1
    }
    this._dataService.getOrders(defaultCreds).subscribe((data: Order) => {
      this.ordersList = this.dataParser(data);
      this.dataSource = new MatTableDataSource(this.ordersList);
    })

    this._dataService.getOrderStatus().subscribe((data: ResponseModel) => {
      this.statusList = data.data;
    })
    this.displayedColumns = this.displayedColumns.concat(this.tableHeaders.map(c => c.field_name));
    
  }

  dataParser(orderList: Order) {
    let dataList: orderObject[] = [];
    if (orderList) {
      for (let order of orderList.data.list) {
        const object: orderObject = {
          date: this.datePipe.transform(order.createdAt, 'd-M-yyyy'),
          user: order.customer.name,
          amount: Math.floor(Math.random() * (12000 - 0 + 1)) + 0,
          paymentStatus: order.paymentStatus == 1 ? 'Done' : 'Pending',
          paymentMode: order.paymentMode == 1 ? 'COD' : 'Online',
          orderStatus: order.orderStatus
        }
        dataList.push(object);
      }
    }
    return dataList;
  }

  statusChange() {
    console.log(this.selectedStatus);
    const creds = {
      page: 1,
      pageSize: 10,
      orderStatus: this.selectedStatus
    }
    this._dataService.getOrders(creds).subscribe((data: Order)=> {
      this.ordersList = this.dataParser(data);
      this.dataSource.data = this.ordersList;
      console.log(this.ordersList);
    })
    this.change.detectChanges();
  }

  // ---------------------------------- new code --------------------------------

  pageConfig:{page:number; pageSize:number} = {
    page:1,
    pageSize:50
  }

  getAllOrderStatuses():void{
    this._dataService.getOrderStatuses().subscribe((res)=>{
      // do 
      console.log(res);
    })
  }

  getBusinessRelatedOrders():void{
    this._dataService.getOrdersBySellerIdAndOrderStatus(3, this.pageConfig.page, this.pageConfig.pageSize, [1]).subscribe((res)=>{
      // do something
    })
  }

}