import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  invalidFormAlert = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.invalidFormAlert = false;
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      this.customerService.createAccount(this.signupForm.value)
      .subscribe((data) => {
        this.customerService.login(this.signupForm.value).subscribe((loginResponse: boolean) => {
          if (loginResponse) {
            this.router.navigate(['/account']);
          } else {
            this.invalidFormAlert = true;
          }
        });
      });
    }
  }
}

