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
  orderId:any;
  
  constructor(private _dataService: DataService, private _activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.orderId = this._activatedRoute.snapshot.paramMap.get("orderId");
    console.log(this.orderId);
    this._dataService.getOrderDetails(this.orderId).subscribe((res)=>{
      console.log(res);
    })
    
  }
}
