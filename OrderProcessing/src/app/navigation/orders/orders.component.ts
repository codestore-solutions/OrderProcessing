import { SelectionChange } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from 'src/app/interfaces/orders';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UniqueOrderObject {
  id: number;
  customer: string;
  createdAt: string;
  amount: string;
  paymentMode: string;
  paymentStatus: string;
  orderStatus:string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
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

  orderStatuses: {statusCode:number; statusName:string;}[] = [
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
    {
      statusCode: 5,
      statusName:"Agent Assigned"
    },
    {
      statusCode: 6,
      statusName:"Accepted by Agent"
    },
    {
      statusCode: 7,
      statusName:"Agent Re-assigned"
    },
    {
      statusCode: 8,
      statusName:"Picked Up"
    },
    {
      statusCode: 9,
      statusName:"Reached Destination"
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
      statusCode: 15,
      statusName:"Cancelled by Seller"
    },
    {
      statusCode: 16,
      statusName:"Cancelled by Customer"
    }
  ];

  PaymentStatuses = [
    "Failed",
    "Successful",
    "Pending"
  ];

  PaymentModes = [
    "Online",
    "COD"
  ]

  selectedStatus!:number;
  // statusList!:{id:number; name:string; displayName?:string}[];
  totalOrdersWithRespectiveStatus!:number;

  columnsToDisplay: string[] = ["serial", "id", "customer", "createdAt", "amount", "paymentMode", "paymentStatus", "orderStatus", "action"];
  mainDataSource!: MatTableDataSource<UniqueOrderObject>;
  @ViewChild('paginator') paginator!: MatPaginator;

  statusSpecificOrderList!: Orders;
  remappedStatusSpecificOrderList: UniqueOrderObject[] = [];

  serverSideError!:boolean;

  pageConfig: { page: number; pageSize: number } = {
    page: 0,
    pageSize: 50
  }

  constructor(
    private _dataService: DataService,
    private _cd: ChangeDetectorRef,
    private _snackbar: MatSnackBar
    ) {
  }

  ngOnInit(): void {
    this.selectedStatus = 1;
    // this.getAllOrderStatuses();
    this.getBusinessRelatedOrders();
  }

  // getAllOrderStatuses(): void {
  //   this._dataService.getOrderStatuses().subscribe((res) => {
  //     this.statusList = res.data;
  //     this.statusList = this.statusList.map((x, index)=>({...x, displayName:this.statuses[index]}));
  //   })
  // }

  getBusinessRelatedOrders(): void {
    this._dataService.getOrdersBySellerIdAndOrderStatus(3, this.pageConfig.page+1, this.pageConfig.pageSize, [this.selectedStatus])
    .subscribe((res) => {
      this.statusSpecificOrderList = res;
      this.totalOrdersWithRespectiveStatus = res.data.totalOrders;
      this.orderListDataHandler(this.statusSpecificOrderList);
      this.mainDataSource = new MatTableDataSource(this.remappedStatusSpecificOrderList);
      this.serverSideError = false;
      this._cd.detectChanges();
    }, (err)=>{
      this._snackbar.open("Failed to load resources.", "Dismiss", {duration: 2500});
      this.serverSideError = true;
    })
  }

  orderListDataHandler(orderListResponse: Orders): void {
    this.remappedStatusSpecificOrderList = [];
    if (orderListResponse.data.list.length) {
      for (let order of orderListResponse.data.list) {
        let tempOrderObject: UniqueOrderObject = {
          id: order.id,
          customer: order.customer.name,
          createdAt: order.createdAt,
          amount: "N/A",
          paymentMode: this.PaymentModes[order.paymentMode-1],
          paymentStatus: this.PaymentStatuses[order.paymentStatus],
          orderStatus: this.statuses[order.orderStatus-1]
        }
        this.remappedStatusSpecificOrderList.push(tempOrderObject);
      }
    }
  }

  orderStatusSelectionChange(e:MatSelectChange):void{
    this.selectedStatus = e.value;
    this.getBusinessRelatedOrders();
  }

  handlePageEvent(e:PageEvent){
    this.pageConfig.pageSize = e.pageSize;
    this.pageConfig.page = e.pageIndex;
    this.getBusinessRelatedOrders();
  }
}