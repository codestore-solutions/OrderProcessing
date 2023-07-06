import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  requester;
  
  constructor(private service: DataService, private route: ActivatedRoute) {
    this.requester = route.snapshot.params['requester'];
  }

  ngOnInit(): void {
    console.log(this.requester);
    const orderIds : number[] = [];
    orderIds.push(parseInt(this.requester));
    this.service.getOrderDetailByID(orderIds).subscribe((data)=> {
      console.log(data);
    });
  }
}
