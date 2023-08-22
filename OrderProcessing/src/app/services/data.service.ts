import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { OrderDetails, OrderStatuses, Orders } from "../interfaces/orders";

interface category {
    id: string;
    category: string;
    subCategory: string;
    productName: string;
}

@Injectable()
export class DataService {
    constructor(private _http: HttpClient) {}

    // getOrders(creds) {
    //     return this._http.get(environment.orderURL + `getOrdersBySellerId/` + `${this.sellerId}?page=${creds.page}&pageSize=${creds.pageSize}&orderStatus=${creds.orderStatus}`);
    // }

    // getOrdersByStatus(status) {
    //     return this._http.get(environment.orderURL + 'getSellerOrderBystatus/' + `${this.sellerId}?status=${status}`);
    // }

    // getOrderDetailByID(id) {
    //     return this._http.get("https://app-orderbooking-dev.azurewebsites.net/api/v1/order/listOfOrders?orderIds=" + `${id}`);
    // }

    // getOrderStatus() {
    //     return this._http.get(environment.order + 'getOrderStatus');
    // }

    // generateUUID() {
    //     return this._http.get("https://www.uuidtools.com/api/generate/timestamp-first")
    // }

    // -------------------------------- new services ---------------------------------------------

    //logs user in to the dashboard
    userLogin(userCredentials:{username:string; password:string;}):Observable<any>{
        return this._http.post<any>("https://app-deliveryagent-dev.azurewebsites.net/api/v1/testing/login", userCredentials)
    }

    //gets list of possible statuses of an order
    getOrderStatuses():Observable<OrderStatuses>{
        return this._http.get<OrderStatuses>(`${environment.orderProcessingUrl}order/getOrderStatus`);
    }

    //gets order list associated with a particular business and order status type
    getOrdersBySellerIdAndOrderStatus(sellerId:number, page:number, pageSize:number, orderStatus:number[]):Observable<Orders>{
        return this._http.get<Orders>(`${environment.orderProcessingUrl}vendor/getOrdersBySellerId/${sellerId}?page=${page}&pageSize=${pageSize}&orderStatus=${orderStatus}`)
    }

    //get order details based on order id
    getOrderDetails(orderId:number):Observable<OrderDetails>{
        return this._http.get<OrderDetails>(`${environment.orderProcessingUrl}business/getOrderDetailsByOrderId/${orderId}`)
    }

    //update statuses of the orders
    updateOrderStatuses(payload:{status:number; orders:number[]}):Observable<any>{
        return this._http.put<any>(`${environment.orderProcessingUrl}order/updateOrder`, payload)
    }
    
}