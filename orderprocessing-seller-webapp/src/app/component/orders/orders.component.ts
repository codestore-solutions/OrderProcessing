import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/model/order.model';
import { loadOrder } from 'src/app/store/actions/orders.action';
import { selectOrders } from 'src/app/store/selector/order.selector';
import { DataService } from 'src/app/services/data.service';

interface order {
  cartId: string,
  address: string,
  productCount: number,
  customerName: string,
  paidAmnt: number,
  paymentDate: string,
  discount: number
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  orderData$ = this.store.select(selectOrders);
  orderList: order[] = [];
  dataList: Order[] = [];
  title: string = 'Orders';
  columnArray = [
    { header: 'Address', field_name: 'address' },
    { header: 'Product Count', field_name: 'productCount' },
    { header: 'Customer Name', field_name: 'customerName' },
    { header: 'Created At', field_name: 'paymentDate' },
    { header: 'Paid Amount', field_name: 'paidAmnt' },
    { header: 'Details', field_name: 'Details' }
  ]
  constructor(private store: Store, private service: DataService) {

  }
  ngOnInit(): void {
    this.store.dispatch(loadOrder());
  }

  ngAfterViewInit(): void {
    this.orderData$.subscribe((data) => {
      this.dataList = data;
      this.orderList = this.parseObject(this.dataList);
    })
  }

  onDispatch(event: Event) {
    console.log(event);
  }

  // isIteratble(obj) {
  //   if (obj == null) {
  //     return false;
  //   }
  //   return typeof obj[Symbol.iterator] === 'function';
  // }

  parseObject(dataList: Order[]): order[] {
    const result: order[] = [];
    if (dataList != null) {
      for (let data of dataList) {
        const orderItem: order = {
          cartId: data.cartId,
          address: data.address.country + " " + data.address.state + " " + data.address.city + " " + data.address.street + " " + data.address.postalCode,
          productCount: data.count,
          customerName: data.customer.username,
          paidAmnt: data.payment.amountPaid,
          paymentDate: data.payment.createdAt,
          discount: data.payment.discount
        };
        result.push(orderItem);
      }
    }

    return result;
  }
}
