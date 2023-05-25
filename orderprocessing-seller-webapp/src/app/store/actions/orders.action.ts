import { createAction } from "@ngrx/store";
import { Booking } from "src/app/model/booking.model";
import { CartDetails } from "src/app/model/cartDetails";
import { Order } from "src/app/model/order.model";

export const loadOrder = createAction('[Order] Load Order'); 
export const loadOrderSuccess = createAction('[Order] Load Order', (order: Order[])=>({order}));
export const loadOrderError = createAction('[Order] Load Order');

export const loadBooking = createAction('[Booking] Load Booking', (more: number)=>({more})); 
export const loadBookingSuccess = createAction('[Booking] Load Booking', (booking: Booking[])=>({booking}));
export const loadBookingError = createAction('[Booking] Load Booking');

export const loadCartDetail = createAction('[Cart Detail] Load Detail', (cartID: string)=>({ cartID}));
export const loadCartDetailSuccess = createAction('[Cart Detail] Load Detail Success', (cartDetail: CartDetails[])=>({cartDetail}));
export const loadCartDetailsError = createAction('[Cart Detail] Load Detail Failed');
