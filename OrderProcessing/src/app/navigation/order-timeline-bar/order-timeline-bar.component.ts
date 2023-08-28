import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-timeline-bar',
  templateUrl: './order-timeline-bar.component.html',
  styleUrls: ['./order-timeline-bar.component.scss']
})
export class OrderTimelineBarComponent {
  
  @Input() currentOrderStatus!: number;

  orderStatuses: {statusCode:number; statusName:string;}[] = [
    {
      statusCode: 1,
      statusName:"New"
    },
    {
      statusCode: 4,
      statusName:"Packing Completed"
    },
    {
      statusCode: 8,
      statusName:"Picked Up"
    },
    {
      statusCode: 10,
      statusName:"Not Accepted by Customer"
    },
    {
      statusCode: 11,
      statusName:"Delivered"
    },
    {
      statusCode: 12,
      statusName:"Return"
    },
    {
      statusCode: 13,
      statusName:"Exchanged"
    },
    {
      statusCode: 14,
      statusName:"Payment Failed"
    },
    {
      statusCode: 16,
      statusName:"Cancelled by Customer"
    }
  ];
  
}
