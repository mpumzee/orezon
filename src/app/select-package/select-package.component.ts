import { Component } from '@angular/core';
import { Package } from '../../models/package';
import { PackagesComponent } from '../packages/packages.component';
import { PackagesService } from '../../services/packages.service';
import { UserPackage } from '../../models/user-package';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-package',
  templateUrl: './select-package.component.html',
  styleUrl: './select-package.component.css'
})
export class SelectPackageComponent {

    packages: Package[] = [];

    user: any

    userPackage: UserPackage = {} as UserPackage

    constructor(private packageService: PackagesService,private router: Router){}

    ngOnInit(): void {

      this.user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');

    if (!this.user) {
      this.router.navigate(['/login']);
    }
          
      this.packageService.getAllList()
      .subscribe(res => {
        this.packages = res.data;
        console.log('packages:', this.packages)
      });
    
    }

    selectPackage(item: any){
      console.log(item);
      console.log(this.user);
      this.userPackage.package_id = item.id
      this.userPackage.user_id = this.user
      this.packageService.selectPackage(this.userPackage)
        .subscribe((res) => {
          console.log(res);
  
          if (res.status == 'sucess') {
            console.log(res.message);
            this.router.navigate(["/dashboard"])
          }
          else {
            console.error(Error);
            console.log(res.message);
      // Handle the error as needed
          }
  
        },
          (error) => {
            console.error(error);
            console.log(error.error.message);
            // Handle the error as needed
          });

        }

}
