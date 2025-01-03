import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SignUpService } from '../../services/sign-up.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(private router: Router, private loginService: SignUpService){
    this.loginForm = new FormGroup({     
                        email: new FormControl('', [Validators.email]),     
                        password: new FormControl('', [Validators.required,Validators.minLength(10)]),
                      });
  }

  ngOnInit(): void{}

  toEquipmentUpload(){
    this.router.navigate(["/admin"])
  }

  login(){
      console.log(this.loginForm.value);
    
            this.loginService.login(this.loginForm.value)
              .subscribe((res) => {
                console.log(res);
        
                if (res.message === 'Login Successful') {
                  this.router.navigate(["/dashboard"])
                }
                else {
                  console.log(res.message);
            // Handle the error as needed
                }
        
              },
                (error) => {
                  console.error(error);
                  // Handle the error as needed
                });
  }
}
