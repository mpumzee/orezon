import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../enums/roles';
import { environment } from '../../environments/environment.development';
import { ProductCategory } from '../../models/product-category';
import { SubCategory } from '../../models/sub-category';
import { CartService } from '../../services/cart.service';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  URL = environment.domain;
  currentCart: any = [];
  searchTerm = '';
  filterValue = '';
  totalCart = 0;
  cartTotalAmount = 0;

  showCart = false

  role: any;

  categories: ProductCategory[] = [];

  subCategories: SubCategory[] = [];

  filteredSubCategories: SubCategory[] = [];


  constructor(
    private http: HttpClient,
    private router: Router,
    private searchService: SearchService,
    private subCategoryService: SubCategoriesService,
    private categoryService: CategoriesService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.role = sessionStorage.getItem('loggedUserRole') || '{}';

    if (this.role == Roles.SELLER || this.role == Roles.ADMIN) {
      this.showCart = false
    } else {
      this.showCart = true
    }

    this.cartService.updateTotal.subscribe((resp) => {
      if (resp) {
        this.currentCart = this.cartService.getCurrentCart();
        this.totalCart = this.cartService.getTotaltems();
        this.cartTotalAmount = this.cartService.getTotal();
      }
    });
    this.currentCart = this.cartService.getCurrentCart();
    this.totalCart = this.cartService.getTotaltems();
    this.cartTotalAmount = this.cartService.getTotal();
    this.currentCart = this.currentCart.slice(0, 2);

    this.categoryService.getAllList().subscribe((res) => {
      this.categories = res.data;
      console.log('categories:', this.categories);
    });

    this.subCategoryService.getAllList().subscribe((res) => {
      this.subCategories = res.data;
      this.filteredSubCategories = this.subCategories
      console.log('sub categories:', this.subCategories);
    })
  }


  removeItem(item) {
    this.cartService.removeFromCart(item)
  }

  onSelection(item: any) {
    const selectedCategory = (item.target as HTMLSelectElement).value;

    this.filteredSubCategories = this.subCategories.filter(x => x.category_id == selectedCategory)

  }

  goToCategoryProducts(item: any) {
    const selectedCategory = (item.target as HTMLSelectElement).value;

    this.router.navigate(['/category-shop', selectedCategory]);

  }


  // search(){
  //   const url = this.URL + "/search";
  //   this.http.get(url).subscribe((result) =>{

  //   })
  // }

  onSearch() {
    console.log(this.searchTerm);
    this.searchService.changeSearchTerm(this.searchTerm); // Update the search term in the service
  }
}
