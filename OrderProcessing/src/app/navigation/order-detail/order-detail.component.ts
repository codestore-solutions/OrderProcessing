import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from 'src/app/interfaces/orders';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeliveryAgentDetails } from 'src/app/interfaces/deliveryAgent';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  statuses: string[] = [
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
  updatableOrderStatuses:{statusCode:number; statusName:string;}[] = [
    {
      statusCode: 1,
      statusName:"New"
    },
    {
      statusCode: 3,
      statusName:"Packing"
    },
    {
      statusCode: 4,
      statusName:"Packing Completed"
    }
  ]
  PaymentStatuses = [
    "Failed",
    "Successful",
    "Pending"
  ];
  PaymentModes = [
    "Online",
    "COD"
  ]
  
  orderId!:number;
  orderDetails!: OrderDetails;
  deliveryAgentDetails!:DeliveryAgentDetails;
  productsInOrderDetails!:any;
  errorInOrderFetching!:boolean;
  errorInDeliveryFetching!:boolean;
  errorInProductFetching!:boolean;
  updateStatusPayload!:{status:number; orders:number[]};
  newStatusToBeUpdated!:number;
  
  constructor(
    private _dataService: DataService,
    private _activatedRoute: ActivatedRoute,
    private _snackbar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.orderId = parseInt(this._activatedRoute.snapshot.paramMap.get("orderId")!);
    this.getOrderDetails();
  }

  getOrderDetails():void{
    this._dataService.getOrderDetails(this.orderId).subscribe((res)=>{
      this.orderDetails = res;
      console.log(res);
      this.errorInOrderFetching = false;
      if(this.orderDetails?.data?.deliveryAgentId){
        this.getDeliveryAgentDetails(this.orderDetails.data.deliveryAgentId);
      }
    }, (err)=>{
      this.errorInOrderFetching = true;
    })
  }

  getDeliveryAgentDetails(deliveryAgentId:number):void{
    this._dataService.getDeliveryAgentDetails(deliveryAgentId).subscribe((res)=>{
      this.deliveryAgentDetails = res;
      this.errorInDeliveryFetching = false;
    }, (err)=>{
      this.errorInDeliveryFetching = true;
    })
  }

  getProductDetails():void{

  }

  orderStatusSelectionChange(e:MatSelectChange):void{
    this.newStatusToBeUpdated = e.value;
  }

  updateStatus():void{
    if(this.orderDetails?.data?.orderStatus===1 && this.newStatusToBeUpdated===4){
      this._snackbar.open("Order must under packing to be considered packed.", "OK", {duration:2500});
      return
    }
    this.updateStatusPayload = {
      status: this.newStatusToBeUpdated,
      orders:[
        this.orderId
      ]
    }
    this._dataService.updateOrderStatus(this.updateStatusPayload)
    .subscribe((res)=>{
      this._snackbar.open("Order status updated successfully", "OK")
    }, (err)=>{
      this._snackbar.open("Failed to update the status for the order.", "OK", {duration: 2500})
    })
    window.location.reload();
  }
}