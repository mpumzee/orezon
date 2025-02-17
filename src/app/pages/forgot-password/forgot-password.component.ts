import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from '../../tools/models';
import { SignUpService } from '../../tools/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email]),
  });

  packages: any;

  packageId: any;

  bank: any;

  branch: any;

  success = false;

  successMsg: any;

  errorMsg: any;

  error = false;

  title: any;

  msg: any;

  role: any;

  bankId: any;

  branch_code: any;

  created_at: any;

  updated_at: any;

  account_no: any;

  id: any;

  constructor(private router: Router, private loginService: SignUpService) {
  }

  ngOnInit(): void {
    sessionStorage.clear();
    console.log(sessionStorage);
  }

  toEquipmentUpload() {
    this.router.navigate(['/admin']);
  }

  login() {
    console.log(this.loginForm.value);

    if(this.loginForm.invalid) {
      return this.loginService.error('Please fill in the required fields');
    }
    this.loginService.forgotPassword(this.loginForm.value).subscribe((data) => {
        this.loginService.success('Password reset link has been sent to your email, please check your email and complete the process');
      },)



  }

  hideDialog() {
    this.error = false;
    this.success = false;
  }
}
