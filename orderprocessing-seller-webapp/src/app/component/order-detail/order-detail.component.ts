import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as dayjs from 'dayjs';
import { CartDetails } from 'src/app/model/cartDetails';
import { loadCartDetail } from 'src/app/store/actions/orders.action';
import { selectCartDetails } from 'src/app/store/selector/order.selector';

interface order {
  productName: string;
  quantity: number;
  unitPrice: number;
  productDescription: string;
}

interface orderDetail {
  id: string;
  orderedAt: string;
  createdAt: string;
  customerName: string;
  address: string;
  paymentMode: string;
}


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges {
  //Headers for Item Table
  columnArray = [
    { header: 'Product Description', field_name: 'productDescription' },
    { header: "Product Name", field_name: 'productName' },
    { header: "Quantity", field_name: 'quantity' },
    { header: "Unit Price", field_name: 'unitPrice' },
  ]

  //Fields for data from table 
  cartDetail$ = this.store.select(selectCartDetails);
  cartData: order[];
  email: string = "ramesh@gmail.com";
  order: orderDetail = {
    id: '',
    orderedAt: '',
    customerName: '',
    address: '',
    paymentMode: '',
    createdAt: ''
  };
  title: string;


  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  constructor(private store: Store, private location: Location, private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.title = this.route.snapshot.params['title'];
    const cartID = this.route.snapshot.params['cartID'];
    this.store.dispatch(loadCartDetail(cartID));
    this.cartDetail$.subscribe(data => {
      if (data != null) {
        console.log(data);
        this.cartData = this.orderParser(data);
        if (this.orderDetailParser(data)!) {
          this.order = this.orderDetailParser(data);
        }
      }
    });
    this.displayedColumns = this.displayedColumns.concat(this.columnArray.map(c => c.field_name));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.cartData);
  }

  orderParser(obj: CartDetails[]) {
    let result: order[] = []
    if (obj !== null) {
      for (let data of obj) {
        const orderItem: order = {
          productName: data.product.name,
          quantity: data.quantity,
          unitPrice: data.product.price,
          productDescription: data.product.description
        };
        result.push(orderItem);
      }
    }
    return result;
  }


  orderDetailParser(obj: CartDetails[]): orderDetail {
    let result: orderDetail;
    if (obj[0] != null) {
      const date = obj[0].createdAt.split('T', 2);
      const time = date[1].split('.', 2);
      result = {
        id: obj[0].cartId,
        orderedAt: dayjs(date[0], 'DD-M-YYYY').format('D MMMM, YYYY').toString(),
        customerName: obj[0].customer.username,
        address: obj[0].address.country + " " + obj[0].address.state + " " + obj[0].address.city + " " + obj[0].address.street + ", " + obj[0].address.postalCode,
        paymentMode: obj[0].paymentMode,
        createdAt: dayjs(obj[0].createdAt).format('hh:mm:ss A').toString()
      };
    }
    return result;
  }

  backNavigate() {
    this.location.back();
  }
}


