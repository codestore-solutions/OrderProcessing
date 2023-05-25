import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DataState } from "../reducer/order.reducer";


const getOrders = createFeatureSelector<DataState>('order');
const getBookings = createFeatureSelector<DataState>('booking');
const getCartDetails = createFeatureSelector<DataState>('cartDetails');
const getServiceCategoryList = createFeatureSelector<DataState>('serviceCategoryList');

const getProductList = createFeatureSelector<DataState>('productList')
export const selectOrders = createSelector(
    getOrders,
    (state:DataState)=>state.order
);
export const selectBookings = createSelector(
    getBookings,
    (state:DataState)=>state.booking
);

export const selectCartDetails = createSelector(
    getCartDetails,
    (state:DataState)=>state.cart
);

