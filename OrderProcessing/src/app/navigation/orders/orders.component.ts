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
    'New', 'Cancel', 'Packing', 'Packing Completed', 'Agent Assigned', 'Agent Re-assigned', 'Picked Up', 'Reached Destination', 'Not Accepted', 'Delivered', 'Return', 'Exchanged', 'Payment Failed', 'Cancelled by seller', 'Cancelled by seller'
  ]
  displayedColumns: string[] = [];
  constructor(private service: DataService, private router: Router, private datePipe: DatePipe, private change: ChangeDetectorRef) {

  }

  viewDetails(element) {
    this.router.navigate(['order-detail']);
  }
  
  ngOnInit(): void {
    const defaultCreds = {
      page: 1,
      pageSize: 10,
      orderStatus: 1
    }
    this.service.getOrders(defaultCreds).subscribe((data: Order) => {
      console.log(data.data.list);
      this.ordersList = this.dataParser(data);
      this.dataSource = new MatTableDataSource(this.ordersList);
    })

    this.service.getOrderStatus().subscribe((data: ResponseModel) => {
      this.statusList = data.data;
      console.log(this.statusList);
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
    const creds = {
      page: 1,
      pageSize: 10,
      orderStatus: this.selectedStatus
    }
    console.log(this.selectedStatus + " " + this.status[this.selectedStatus-1]);
    this.service.getOrders(creds).subscribe((data: Order)=> {
      this.ordersList = this.dataParser(data);
      this.dataSource.data = this.ordersList;
    })
    this.change.detectChanges();
  }
}



