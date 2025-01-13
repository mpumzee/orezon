import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategory } from '../../models/sub-category';
import { SubCategoriesService } from '../../services/sub-categories.service';

@Component({
  selector: 'app-equipment-categories',
  templateUrl: './equipment-categories.component.html',
  styleUrl: './equipment-categories.component.css',
})
export class EquipmentCategoriesComponent {
  productList: any = [];

  subCategories: SubCategory[] = [];

  drillingSubCategories: SubCategory[] = [];

  haulingSubCategories: SubCategory[] = [];

  crushingSubCategories: SubCategory[] = [];

  separationSubCategories: SubCategory[] = [];

  undergroundSubCategories: SubCategory[] = [];

  safetySubCategories: SubCategory[] = [];

  miscellaneousSubCategories: SubCategory[] = [];

  constructor(
    private router: Router,
    private subCatgeorySevice: SubCategoriesService
  ) {}

  ngOnInit() {
    this.subCatgeorySevice.getAllList().subscribe((res) => {
      this.drillingSubCategories = res.data.filter((x) => x.category_id == 2);
      this.haulingSubCategories = res.data.filter((x) => x.category_id == 3);
      this.crushingSubCategories = res.data.filter((x) => x.category_id == 4);
      this.separationSubCategories = res.data.filter((x) => x.category_id == 5);
      this.undergroundSubCategories = res.data.filter(
        (x) => x.category_id == 6
      );
      this.safetySubCategories = res.data.filter((x) => x.category_id == 7);
      this.miscellaneousSubCategories = res.data.filter(
        (x) => x.category_id == 8
      );
      this.drillingSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/drill_rig.png';
      });
      this.haulingSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/hauling.png';
      });
      this.crushingSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/crushing.png';
      });
      this.separationSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/separation.png';
      });
      this.undergroundSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/underground.png';
      });
      this.safetySubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/safety.png';
      });
      this.miscellaneousSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/miscellaneous.png';
      });
      this.subCategories = res.data;
      console.log('subCategories:', this.subCategories);
    });
  }

  showDrilling() {
    this.productList = this.drillingSubCategories;
  }

  showLoading() {
    this.productList = this.haulingSubCategories;
  }

  showCrushing() {
    this.productList = this.crushingSubCategories;
  }

  showSeparation() {
    this.productList = this.separationSubCategories;
  }

  showUnderground() {
    this.productList = this.undergroundSubCategories;
  }

  showSafety() {
    this.productList = this.safetySubCategories;
  }

  showMiscellaneos() {
    this.productList = this.miscellaneousSubCategories;
  }

  goToCategoryProducts(id: any) {
    this.router.navigate(['/category-shop', id]);
  }
}
