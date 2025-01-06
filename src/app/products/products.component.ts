import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { Products } from '../../models/products';
import { ProductsService } from '../../services/products.service';
import { ProductCategory } from '../../models/product-category';
import { ProductCategoryService } from '../../services/product-category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Products[] = []

  categories: ProductCategory[] = []

  newProduct: Products = {} as Products

  selectedProduct: Products = {} as Products

  selectedCategory: ProductCategory = {} as ProductCategory

    public productForm: FormGroup;

  equipment: any;
  slides: any;

  constructor(private http: HttpClient, 
    private router: Router, private searchService: SearchService, private productService: ProductsService, private categoryService: ProductCategoryService){ 
      this.productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),     
        description: new FormControl('', [Validators.required]),     
        price: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
      });
    }


  ngOnInit() {

    this.categoryService.getAllList()
      .subscribe(res => {
        this.categories = res.data;
        console.log('categories:', this.categories)
      });

    this.productService.getAllList()
      .subscribe(res => {
        res.data.forEach((product: any) => {
          const category = this.categories.filter(x => x.id == product.category_id)
          category.forEach(cat => {
            product.category_name = cat.name
          })
        });
        this.products = res.data;
        console.log('products:', this.products)
      });

    this.searchService.currentSearchTerm.subscribe(term => {
      if (term) {
        this.searchEquipment(term); // Call with the updated search term
      }
      else{
        this.getAllEquipment();
      }
      
    });
  }


  addProduct(){
    console.log(this.productForm.value)
    this.newProduct = this.productForm.value;
    this.newProduct.category_id = 1
    console.log('product',this.newProduct);

    this.productService.create(this.newProduct)
      .subscribe((res) => {
        console.log('res',res);

        if (res.status == 'success') {
          console.log(res.message)
        }
        else {
          console.log(res.message);
    // Handle the error as needed
        }

      },
        (error) => {
          console.error(error.error.message);
          // Handle the error as needed
        });
    this.productForm.reset()
  }

  clear(){
    this.productForm.reset()
  }

  getAllEquipment(){
    const url = `http://localhost:8000/api/v1/equipment`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.slides = data.data;
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error as needed
      }
    });
    }

  searchEquipment(name?: string){
    const url = `http://localhost:8000/api/v1/equipment/search/${name}`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        console.log("Search result ",data);
        this.slides = data;
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error as needed
      }
    });
    }

    // slides = [
    //   { img: 'http://placehold.it/350x150/000000' },
    //   { img: 'http://placehold.it/350x150/111111' },
    //   // more slides...
    // ];
    
    slideConfig = {
      slidesToShow: 4, // Adjust based on how many slides you want visible
      slidesToScroll: 1,
      dots: true,
      infinite: true,
  };
}
