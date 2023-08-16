import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private service: DataService, private router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null),
      password: new FormControl(null)
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    const userCred = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password
    }
    this.service.loginService(userCred).subscribe(data => {
      console.log(data);
      if (data) {
        localStorage.setItem('token', JSON.stringify(data));
      }
      this.router.navigate(['navigation']);
    });
  }
}