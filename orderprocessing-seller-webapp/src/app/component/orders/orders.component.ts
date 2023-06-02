import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order } from 'src/app/model/order.model';
import { loadOrder, loadProcessedOrders } from 'src/app/store/actions/orders.action';
import { selectOrders, selectProcessedOrders } from 'src/app/store/selector/order.selector';
import { DataService } from 'src/app/services/data.service';
import * as dayjs from 'dayjs';

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
export class OrdersComponent implements OnInit{
  title: string = 'Orders';
  tableType = ['newOrder', 'processingOrder', 'completedOrder']
  //Selector from store
  orderData$ = this.store.select(selectOrders);

  //Fields for New Orders
  orderList: order[] = [];
  dataList: Order[] = [];

  //Fields for Processed Orders
  processedOrderList: Order[] = [];
  
  //Header of Mat-table
  columnArray = [
    { header: 'Customer Name', field_name: 'customerName' },
    { header: 'Product Count', field_name: 'productCount' },
    { header: 'Ordered At', field_name: 'paymentDate' },
    { header: 'Paid Amount', field_name: 'paidAmnt' },
    { header: 'Actions', field_name: 'Actions' }
  ]
  constructor(private store: Store, private service: DataService) {

  }
  ngOnInit(): void {
    this.store.dispatch(loadOrder());
    this.orderData$.subscribe((data) => {
      this.dataList = data;
      this.orderList = this.parseObject(this.dataList);
    });
    this.service.getSocketData().subscribe((data) => {
      if (data != null && this.dataList != null) {
        this.dataList.push(data);
        this.orderList = this.parseObject(this.dataList);
      }
    });
  }


  onDispatch(event: Event) {
    console.log(event);
  }

  

  //Parsing Incoming Order List
  parseObject(dataList: Order[]): order[] {
    const result: order[] = [];
    if (dataList != null) {
      for (let data of dataList) {
        const date = dayjs(data.createdAt.split('T', 2)[0], 'DD-MM-YYYY').format('D MMMM, YYYY');
        const orderItem: order = {
          cartId: data.cartId,
          address: data.address.country + " " + data.address.state + " " + data.address.city + " " + data.address.street + " " + data.address.postalCode,
          productCount: data.totalProductCount,
          customerName: data.customer.username,
          paidAmnt: data.totalAmount,
          paymentDate: date.toString(),
          discount: data.totalDiscount
        };
        result.push(orderItem);
      }
    }

    return result;
  }

  //Tab change event listener
  onTabClick(event) {
    if (event.tab.textLabel == 'processingOrders') {
      this.store.dispatch(loadProcessedOrders());
      this.orderData$ = this.store.select(selectProcessedOrders);
      this.orderData$.subscribe(data => {
        this.dataList = data;
        this.orderList = this.parseObject(data);
      })
    } else if (event.tab.textLabel == 'newOrders') {
      this.store.dispatch(loadOrder());
      this.orderData$ = this.store.select(selectOrders);
    }
  }
}


