import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

interface category {
    id: string;
    category: string;
    subCategory: string;
    productName: string;
}

@Injectable()
export class DataService{
    url2: string = 'http://localhost:3500/bookings'
    url : string = 'http://localhost:3000/api'
    constructor(private http:HttpClient){

    }
    sellerId: string="eb1f91cc-0b57-4fa2-ac55-8c1848bb0903";
    getOrders() {
        return this.http.get('http://localhost:3000/api/seller/orders/' + `${this.sellerId}`);
    }

    getBookingDetails(more: number) {
        return this.http.get(this.url2 + `?_limit=${more}`);
    }

    getNextBookingDetails(more: number) {
        return this.http.get(this.url2 + `?_page=${more}&_limit=20`);
    }
    
    getCartDetail(cartID: string) {
        return this.http.get('http://localhost:3000/api/seller/orders/'+`${this.sellerId}/` + `${cartID}`);
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
        return this.http.post("http://localhost:3500/productCategory", productCategory).subscribe((result)=> {
            alert('Category Added')
        });;
    }

    generateUUID() {
        return this.http.get("https://www.uuidtools.com/api/generate/timestamp-first")
    }
}