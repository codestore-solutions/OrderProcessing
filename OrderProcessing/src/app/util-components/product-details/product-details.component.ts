import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  @Input() detail;
  @Input() closeCard;
  @Output() cardClosed = new EventEmitter<any>();
  onClose() {
    this.closeCard = true;
    this.cardClosed.emit(this.closeCard);
  }
  ngOnInit(): void {
    console.log(this.detail);
  }
}
