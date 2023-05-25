import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Booking } from 'src/app/model/booking.model';
import { loadBooking } from 'src/app/store/actions/orders.action';
import { selectBookings } from 'src/app/store/selector/order.selector';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit{
  data$ = this.store.select(selectBookings);
  bookingList: Booking[];
  loadMore: number = 10;
  title: string = 'Booking';

  columnArray = [
    { header: 'Address', field_name: 'address' },
    { header: 'Service Site', field_name: 'service_site' },
    { header: 'Customer Name', field_name: 'customer_name' },
    { header: 'Payment Status', field_name: 'payment_status' },
    { header: 'Payment Amount', field_name: 'payment_amount' },
    { header: 'Detail', field_name: 'Details' },
  ]
  constructor(private store: Store) {

  }

  ngOnInit(): void{
    this.store.dispatch(loadBooking(this.loadMore));
    this.data$.subscribe(data=> {
      this.bookingList = data;
    })
  }

  loadMoreData() {
    this.loadMore+=10;
    this.store.dispatch(loadBooking(this.loadMore));
  }

  loadLessData() {
    this.loadMore-=10;
    this.store.dispatch(loadBooking(this.loadMore));
  }
}
