import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartDetails } from 'src/app/model/cartDetails';
import { selectCartDetails } from 'src/app/store/selector/order.selector';

interface orderDetail {
  productName: string;
  quantity: number;
  unitPrice: number;
  productDescription: string;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  columnArray = [
    { header : "Product Name", field_name : 'productName'},
    { header: "Quantity", field_name: 'quantity'},
    { header: "Unit Price", field_name: 'unitPrice'},
    { header: 'Product Description', field_name: 'productDescription'}
  ]
  cartDetail$ = this.store.select(selectCartDetails);
  cartData: orderDetail[];
  order;
  title: string;
  constructor(private store: Store, private location: Location, private route: ActivatedRoute) {
    this.cartDetail$.subscribe(data => {
      this.cartData = this.parseObject(data);
      this.order = data;
    });
  }

  ngOnInit(): void {
    this.title = this.route.snapshot.params['title'];
  }

  parseObject(obj: CartDetails[]) {
    let result : orderDetail[]=[]
    if(obj != null) {
      for(let data of obj) {
        const orderItem:orderDetail = {
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

  backNavigate() {
    this.location.back();
  }
}


