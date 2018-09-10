import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) { }
  loginForm: FormGroup;
  submitted = false;
  invalidLoginAlert = false;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    this.invalidLoginAlert = false;

    if (this.loginForm.invalid) {
      console.log('Invalid form');
      return;
    }

     this.customerService.login(this.loginForm.value).subscribe((loginResponse: boolean) => {
      console.log('loginResponse', loginResponse, typeof loginResponse);
      if (loginResponse) {
        console.log('finally logged in');
        this.router.navigate(['/account']);
      } else {
        console.log('finally failed login');
        this.invalidLoginAlert = true;
      }
    });

  }
}
