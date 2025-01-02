import { Component } from '@angular/core';
import { Package } from '../../models/package';
import { PackagesComponent } from '../packages/packages.component';
import { PackagesService } from '../../services/packages.service';

@Component({
  selector: 'app-select-package',
  templateUrl: './select-package.component.html',
  styleUrl: './select-package.component.css'
})
export class SelectPackageComponent {

    packages: Package[] = [];

    constructor(private packageService: PackagesService){}

    ngOnInit(): void {
          
      this.packageService.getAllList()
      .subscribe(res => {
        this.packages = res.data;
        console.log('packages:', this.packages)
      });
    }

}
