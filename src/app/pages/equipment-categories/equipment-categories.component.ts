import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategory } from '../../../models/sub-category';
import { SubCategoriesService } from '../../tools/services';

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

  sparesSubCategories: SubCategory[] = [];

  constructor(
    private router: Router,
    private subCatgeorySevice: SubCategoriesService
  ) { }

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
      this.sparesSubCategories = res.data.filter(
        (x) => x.category_id == 9
      );
      this.sparesSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/spares.png';
      });
      this.drillingSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/drill_rig.png';
        if (product.id == 9) {
          product.img_url = 'assets/img/jack_hammers.jpeg'
        }
        if (product.id == 8) {
          product.img_url = 'assets/img/pneumatic_drills.jpeg'
        }
        if (product.id == 7) {
          product.img_url = 'assets/img/rotary_drills.jpeg'
        }
      });
      this.haulingSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/hauling.png';
        if (product.id == 10) {
          product.img_url = 'assets/img/loaders.jpeg'
        }
        if (product.id == 11) {
          product.img_url = 'assets/img/load_haul.jpeg'
        }
        if (product.id == 12) {
          product.img_url = 'assets/img/conveyor_ belt.jpeg'
        }
      });
      this.crushingSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/crushing.png';
        if (product.id == 16) {
          product.img_url = 'assets/img/ball_mill.jpeg'
        }
        if (product.id == 15) {
          product.img_url = 'assets/img/conec_crushers.jpeg'
        }
        if (product.id == 33) {
          product.img_url = 'assets/img/jaw_crushers.jpeg'
        }
        if (product.id == 17) {
          product.img_url = 'assets/img/roda_mills.jpeg'
        }

      });
      this.separationSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/separation.png';
        if (product.id == 20) {
          product.img_url = 'assets/img/centrifuges.jpeg'
        }
        if (product.id == 19) {
          product.img_url = 'assets/img/magnetic_separators.jpeg'
        }
        if (product.id == 21) {
          product.img_url = 'assets/img/spiral_concentrators.jpeg'
        }
      });
      this.undergroundSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/underground.png';
        if (product.id == 24) {
          product.img_url = 'assets/img/scissor_lifts.jpeg'
        }
        if (product.id == 25) {
          product.img_url = 'assets/img/underground_trucks.jpeg'
        }
      });
      this.safetySubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/safety.png';
        if (product.id == 29) {
          product.img_url = 'assets/img/fall_protection.jpeg'
        }
        if (product.id == 28) {
          product.img_url = 'assets/img/respirators.jpeg'
        }
      });
      this.miscellaneousSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/miscellaneous.png';
        if (product.id == 32) {
          product.img_url = 'assets/img/conveyor_ belt.jpeg'
        }
        if (product.id == 33) {
          product.img_url = 'assets/img/explosives.jpeg'
        }
        if (product.id == 30) {
          product.img_url = 'assets/img/generators.jpeg'
        }
        if (product.id == 31) {
          product.img_url = 'assets/img/pumps.jpeg'
        }
      });
      this.subCategories = res.data;
      console.log('subCategories:', this.subCategories);
      this.productList = this.drillingSubCategories;
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
