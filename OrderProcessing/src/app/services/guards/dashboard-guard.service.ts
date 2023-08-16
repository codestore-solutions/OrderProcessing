import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService implements CanActivate{

  constructor(private _router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    if(!localStorage.getItem("token")){
      this._router.navigate([""]);
      return false;
    }
    return true
  }
}
