import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-detail-card',
  templateUrl: './customer-detail-card.component.html',
  styleUrls: ['./customer-detail-card.component.scss']
})
export class CustomerDetailCardComponent {
  @Input() customerName:string = "";
  @Input() customerEmail:string = "";
  @Input() customerCountryCode:string = "";
  @Input() customerPhone:string = "";
  @Input() customerAdressStreet:string = "";
  @Input() customerAdressCity:string = ""
  @Input() customerAdressState:string = "";
  @Input() customerAdressPostalCode: string = "";

}