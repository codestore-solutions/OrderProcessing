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
    // {
    //   statusCode: 2,
    //   statusName:"Cancel"
    // },
    {
      statusCode: 3,
      statusName:"Packing"
    },
    {
      statusCode: 4,
      statusName:"Packing Completed"
    },
    // {
    //   statusCode: 5,
    //   statusName:"Agent Assigned"
    // },
    // {
    //   statusCode: 6,
    //   statusName:"Accepted by Agent"
    // },
    // {
    //   statusCode: 7,
    //   statusName:"Agent Re-assigned"
    // },
    // {
    //   statusCode: 8,
    //   statusName:"Picked Up"
    // },
    // {
    //   statusCode: 9,
    //   statusName:"Reached Destination"
    // },
    // {
    //   statusCode: 10,
    //   statusName:"Not Accepted by Customer"
    // },
    // {
    //   statusCode: 11,
    //   statusName:"Delivered"
    // },
    // {
    //   statusCode: 12,
    //   statusName:"Return"
    // },
    // {
    //   statusCode: 13,
    //   statusName:"Exchanged"
    // },
    // {
    //   statusCode: 14,
    //   statusName:"Payment Failed"
    // },
    // {
    //   statusCode: 15,
    //   statusName:"Cancelled by Seller"
    // },
    // {
    //   statusCode: 16,
    //   statusName:"Cancelled by Customer"
    // }
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
  errorInOrderFetching!:boolean;
  errorInDeliveryFetching!:boolean;
  // orderInformation!:any;
  // statusList!:{id:number; name:string;}[];
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
    // this.getAllOrderStatuses();
  }

  // getAllOrderStatuses(): void {
  //   this._dataService.getOrderStatuses().subscribe((res) => {
  //     this.statusList = res.data;
  //   })
  // }

  getOrderDetails():void{
    this._dataService.getOrderDetails(this.orderId).subscribe((res)=>{
      this.orderDetails = res;
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
      window.location.reload();
    })
  }
}