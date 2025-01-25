import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategory } from '../../../models/sub-category';
import { SubCategoriesService } from '../../tools/services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  subCategories: SubCategory[] = [];

  unfilteredSubCategories: SubCategory[] = [];

  constructor(
    private router: Router,
    private subCatgeorySevice: SubCategoriesService
  ) { }

  ngOnInit(): void {
    this.subCatgeorySevice.getAllList().subscribe((res) => {
      this.unfilteredSubCategories = res.data.filter((x) => x.category_id == 1);
      this.unfilteredSubCategories.forEach((product: SubCategory) => {
        product.img_url = 'assets/img/minerals.png';
      });
      this.unfilteredSubCategories.filter(x => x.id == 1).forEach(cat => {
        cat.img_url = 'assets/img/gold.png';
      })
      this.unfilteredSubCategories.filter(x => x.id == 5).forEach(cat => {
        cat.img_url = 'assets/img/metallic.png';
      })
      this.subCategories = this.unfilteredSubCategories;
      console.log('subCategories:', this.unfilteredSubCategories);
    });
  }

  goToCategoryProducts(id: any) {
    this.router.navigate(['/category-shop', id]);
  }
}
