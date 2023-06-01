import { createReducer, on } from "@ngrx/store";
import { Order } from "src/app/model/order.model";
import { loadBookingSuccess, loadCartDetailSuccess, loadOrderSuccess, loadProcessedOrdersSuccessful } from "../actions/orders.action";
import { Booking } from "src/app/model/booking.model";
import { CartDetails } from "src/app/model/cartDetails";


export const featureKey1 = 'order';
export interface DataState {
    order: Order[],
    booking: Booking[],
    cart: CartDetails[],
    processedOrders: Order[]
}

const initialState: DataState = {
    order: [],
    booking: [],
    cart: [],
    processedOrders: []
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
    })),
    on(loadProcessedOrdersSuccessful, (state, {processedOrders}) => ({
        ...state,
        processedOrders: processedOrders
    }))
)