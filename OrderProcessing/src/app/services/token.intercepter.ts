import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "./data.service";


@Injectable()
export class TokenIntercepter implements HttpInterceptor {
    constructor(public service: DataService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            })
        }
        return next.handle(req);
    }

} 