import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, async, asyncScheduler, catchError, exhaustMap, map } from "rxjs";
import { DataService } from "src/app/services/data.service";
import { loadBooking, loadBookingSuccess, loadCartDetail, loadCartDetailSuccess, loadOrder, loadOrderSuccess } from "../actions/orders.action";
import { Order } from "src/app/model/order.model";
import { Booking } from "src/app/model/booking.model";
import { CartDetails } from "src/app/model/cartDetails";


@Injectable()
export class OrderEffects{
    constructor(private action$:Actions, private service: DataService) {
        
    }

    // loadOrder = createEffect(()=> this.action$.pipe(
    //     ofType(loadOrder),
    //     exhaustMap(()=>this.service.getOrders().pipe(
    //         map((order:Order[])=>(loadOrderSuccess(order))),
    //         catchError(()=>EMPTY)
    //     ))
    // ))

    loadBooking = createEffect(()=> this.action$.pipe(
        ofType(loadBooking),
        exhaustMap(({more})=>this.service.getBookingDetails(more).pipe(
            map((booking:Booking[])=>(loadBookingSuccess(booking))),
            catchError(()=>EMPTY)
        ))
    ))

    loadCartDetail =  createEffect(()=> this.action$.pipe(
        ofType(loadCartDetail),
        exhaustMap(({cartID})=> this.service.getCartDetail(cartID).pipe(
            map((cartDetails: CartDetails[])=>(loadCartDetailSuccess(cartDetails))),
            catchError(()=> EMPTY)
        ))
    ));

   
}