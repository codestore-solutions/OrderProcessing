import { createReducer, on } from "@ngrx/store";
import { Order } from "src/app/model/order.model";
import { loadBookingSuccess, loadCartDetailSuccess, loadOrderSuccess } from "../actions/orders.action";
import { Booking } from "src/app/model/booking.model";
import { CartDetails } from "src/app/model/cartDetails";


export const featureKey1 = 'order';
export interface DataState {
    order: Order[],
    booking: Booking[],
    cart: CartDetails[],
}

const initialState: DataState = {
    order: [],
    booking: [],
    cart: [],
}

export const dataReducer = createReducer(
    initialState,
    on(loadOrderSuccess, (state, {order})=>(
        {
            ...state,
            order:order
        }
    )),
    on(loadBookingSuccess, (state, {booking})=> ( 
        {
            ...state,
            booking:booking
        }
    )),
    on(loadCartDetailSuccess, (state, {cartDetail})=>({
        ...state,
        cart: cartDetail
    }))
)