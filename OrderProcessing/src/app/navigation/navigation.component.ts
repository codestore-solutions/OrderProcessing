import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuItems = [
    { label: "Dashboard", icon: "", path: 'dashboard' },
    { label: "Orders", icon:'', path:"orders"},
    // { label: 'Bookings', icon: "", path: 'bookings' },
    // {
    //   label: 'Products', icon: 'inventory', children: [
    //     { label: 'Products', icon: '', path: 'productDetails' },
    //     { label: 'Add Products', icon: '', path: 'products' },
    //     { label: 'Category', icon: '', path: 'categoryList' },
    //     { label: 'Brands', icon: '', path: 'brandList' },
    //   ]
    // }
  ]
}
