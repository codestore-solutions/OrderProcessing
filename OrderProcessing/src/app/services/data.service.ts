import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { OrderStatuses, Orders } from "../model/orders";

interface category {
    id: string;
    category: string;
    subCategory: string;
    productName: string;
}

@Injectable()
export class DataService {
    url2: string = 'http://localhost:3500/bookings'
    url: string = 'http://localhost:3000/api'
    constructor(private _http: HttpClient) {}
    sellerId: string = "3";

    getOrders(creds) {
        return this._http.get(environment.orderURL + `getOrdersBySellerId/` + `${this.sellerId}?page=${creds.page}&pageSize=${creds.pageSize}&orderStatus=${creds.orderStatus}`);
    }

    getOrdersByStatus(status) {
        return this._http.get(environment.orderURL + 'getSellerOrderBystatus/' + `${this.sellerId}?status=${status}`);
    }

    getOrderDetailByID(id) {
        return this._http.get("https://app-orderbooking-dev.azurewebsites.net/api/v1/order/listOfOrders?orderIds=" + `${id}`);
    }

    getOrderStatus() {
        return this._http.get(environment.order + 'getOrderStatus');
    }

    getBookingDetails(more: number) {
        return this._http.get(this.url2 + `?_limit=${more}`);
    }

    getNextBookingDetails(more: number) {
        return this._http.get(this.url2 + `?_page=${more}&_limit=20`);
    }

    getCartDetail(cartID: string) {
        return this._http.get('http://localhost:3000/api/seller/orders/' + `${this.sellerId}/` + `${cartID}`);
    }

    getServiceCategoryList() {
        const url = 'http://localhost:3500/category'
        return this._http.get(url);
    }

    getProductList() {
        return this._http.get("http://localhost:3500/products");
    }

    postProductCategory(productCategory: category) {
        console.log("post method called");
        console.log(productCategory);
        return this._http.post("http://localhost:3500/productCategory", productCategory).subscribe((result) => {
            alert('Category Added')
        });;
    }

    generateUUID() {
        return this._http.get("https://www.uuidtools.com/api/generate/timestamp-first")
    }

    loginService(userCred) {
        console.log(userCred);
        return this._http.post(`https://app-deliveryagent-dev.azurewebsites.net/api/v1/testing/login`, userCred)
    }


    // -------------------------------- new services ---------------------------------------------

    //gets list of possible statuses of an order
    getOrderStatuses():Observable<OrderStatuses>{
        return this._http.get<OrderStatuses>(`${environment.newUrl}order/getOrderStatus`);
    }


    //gets order list associated with a particular business and order status type
    getOrdersBySellerIdAndOrderStatus(sellerId:number, page:number, pageSize:number, orderStatus:number[]):Observable<Orders>{
        return this._http.get<Orders>(`${environment.newUrl}vendor/getOrdersBySellerId/${sellerId}?page=${page}&pageSize=${pageSize}&orderStatus=${orderStatus}`)
    }

}