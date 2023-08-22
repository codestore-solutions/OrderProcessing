import { Component, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  disableLogin:boolean = false;

  isLoginError = new EventEmitter<boolean>(false);

  adminLoginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private _dataService: DataService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ){}

  login():void{
    this.disableLogin = true;

    if(this.adminLoginForm.value.username && this.adminLoginForm.value.password){
      this._dataService.userLogin({username:this.adminLoginForm.value.username, password:this.adminLoginForm.value.password})
      .subscribe((res)=>{
        if(res){
          localStorage.setItem("token", JSON.stringify(res));
          this._router.navigate(["navigation"]);
        }
      }, (err)=>{
        this.isLoginError.emit(true);
        this.disableLogin = false;
      })

      this.isLoginError.subscribe((isError)=>{
        if(isError){
          this._snackbar.open("Invalid username or password", "Try again", {duration: 2000});
        }
      })

    } else {
      this._snackbar.open("Please enter required fields.", "Dismiss", {duration: 2000});
      this.disableLogin = false;
    }
  }
}
