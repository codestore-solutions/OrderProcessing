import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { DataService } from "./data.service";
import { Router } from '@angular/router';


@Injectable()
export class TokenIntercepter implements HttpInterceptor {
    constructor(public service: DataService, private _router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenString = localStorage.getItem('token');
        if (tokenString) {
            let tokenObject = JSON.parse(tokenString);
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${tokenObject.jwtToken}`,
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        return next.handle(req).pipe(
            catchError((err)=>{
                if(err instanceof HttpErrorResponse){
                    if(err.status === 401){
                        localStorage.clear();
                        this._router.navigate([""])
                    }
                }
                return throwError(err);
            })
        )
    }

} 