import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  constructor(private router: Router) {}

  categoriesList = [
    {
      id: 1,
      name: 'Earth Mover Collections',
      img: 'assets/img/earth mover.jpg',
    },
    {
      id: 2,
      name: 'Crushing Equipment',
      img: 'assets/img/Hammer-Mill-scaled-1-1.jpg',
    },
    {
      id: 3,
      name: 'Protective Equipment',
      img: 'assets/img/ppe.jpg',
    },
  ];

  goToCategoryProducts(id: any) {
    this.router.navigate(['/category-shop',id])
  }
}
