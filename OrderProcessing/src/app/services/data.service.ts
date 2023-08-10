import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment";

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
    constructor(private http: HttpClient) {

    }
    sellerId: string = "3";
    // orders APIs
    getOrders(creds) {
        return this.http.get(environment.orderURL + `getOrdersBySellerId/` + `${this.sellerId}?page=${creds.page}&pageSize=${creds.pageSize}&orderStatus=${creds.orderStatus}`);
    }

    getOrdersByStatus(status) {
        return this.http.get(environment.orderURL + 'getSellerOrderBystatus/' + `${this.sellerId}?status=${status}`);
    }

    getOrderDetailByID(id) {
        return this.http.get("https://app-orderbooking-dev.azurewebsites.net/api/v1/order/listOfOrders?orderIds=" + `${id}`);
    }

    getOrderStatus() {
        return this.http.get(environment.order + 'getOrderStatus');
    }

    getBookingDetails(more: number) {
        return this.http.get(this.url2 + `?_limit=${more}`);
    }

    getNextBookingDetails(more: number) {
        return this.http.get(this.url2 + `?_page=${more}&_limit=20`);
    }

    getCartDetail(cartID: string) {
        return this.http.get('http://localhost:3000/api/seller/orders/' + `${this.sellerId}/` + `${cartID}`);
    }

    getServiceCategoryList() {
        const url = 'http://localhost:3500/category'
        return this.http.get(url);
    }

    getProductList() {
        return this.http.get("http://localhost:3500/products");
    }

    postProductCategory(productCategory: category) {
        console.log("post method called");
        console.log(productCategory);
        return this.http.post("http://localhost:3500/productCategory", productCategory).subscribe((result) => {
            alert('Category Added')
        });;
    }

    generateUUID() {
        return this.http.get("https://www.uuidtools.com/api/generate/timestamp-first")
    }

    loginService(userCred) {
        console.log(userCred);

        return this.http.post(`https://app-deliveryagent-dev.azurewebsites.net/api/v1/testing/login`, userCred)
    }
}