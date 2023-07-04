import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


interface orderObject {
  vendorName: string;
  user: string;
  date: string;
  amount: string;
  paymentStatus: string;
  paymentMode: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  tableHeaders = [
    { header: "Sr.No.", field_name: "sn"},
    { header: "Vendor Name", field_name: "vendorName"},
    { header: "User", field_name: "user"},
    { header: "Date", field_name: "date"},
    { header: "Amount", field_name: "amount"},
    { header: "Payment Mode", field_name: "paymentMode"},
    { header: "Payment Status", field_name: "paymentStatus"},
    { header: "Action", field_name: "action"}
  ]
  displayedColumns: string[] = [];
  constructor(private service: DataService, private router: Router) {
    this.dataSource = new MatTableDataSource(this.Data);
    
  }

  viewDetails(element) {
    this.router.navigate(['order-detail']);
  }
  ngOnInit(): void {
    // this.service.getOrders().subscribe(data => {
    //   console.log(data);
    // })
    this.displayedColumns = this.displayedColumns.concat(this.tableHeaders.map(c=>c.field_name));
  }

  Data: orderObject[] = [
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
    {
      vendorName: "Suresh Verma",
      user: "Ramesh Singh",
      date: "22/05/23",
      amount: "1220",
      paymentMode: "Card",
      paymentStatus: "Done"
    },
  ]
}



