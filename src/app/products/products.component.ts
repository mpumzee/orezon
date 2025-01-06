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

  sellerId = 6

  categories: ProductCategory[] = []

  newProduct: Products = {} as Products

  selectedProduct: Products = {} as Products

  selectedCategory: ProductCategory = {} as ProductCategory

    public productForm: FormGroup;

    success = false;

    successMsg: any;

    errorMsg: any;

    error = false

    editProduct = false

    addProduct_ = false

    title: any

    msg: any

  equipment: any;

  slides: any;

  user: any

  selectedId=0

  constructor(private http: HttpClient, 
    private router: Router, private searchService: SearchService, private productService: ProductsService, private categoryService: ProductCategoryService){ 
      this.productForm = new FormGroup({
        name: new FormControl('', [Validators.required]),     
        description: new FormControl('', [Validators.required]),     
        price: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]),
        category_id: new FormControl('', [Validators.required]),
      });
    }


  ngOnInit() {

    this.user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    console.log(this.user)

    if (!this.user) {
      this.router.navigate(['/login']);
    }

    this.categoryService.getAllList()
      .subscribe(res => {
        this.categories = res.data;
        console.log('categories:', this.categories)
      });

    this.productService.getSellerProducts(this.user)
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
    if (this.editProduct == true){
      this.updateProduct()
    }
    else {
    console.log(this.productForm.value)
    this.newProduct = this.productForm.value;
    this.newProduct.user_id = this.user
    console.log('product',this.newProduct);

    this.productService.create(this.newProduct)
      .subscribe((res) => {
        console.log('res',res);

        if (res.status == 'created') {
          this.success = true
          this.title = res.status
          this.successMsg = res.message
          this.productService.getSellerProducts(this.user)
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
          console.log(res.message)
        }
        else {
          console.log(res.message);
    // Handle the error as needed
        }

      },
        (error) => {
          console.error(error.error.message);
          this.error = true
          this.title = error.error.status
          this.errorMsg = error.error.message
          // Handle the error as needed
        });
    this.productForm.reset()
    this.addProduct_ = false
      }
  }

  updateProduct(){
    this.productService.update(this.productForm.value, this.selectedId)
      .subscribe((res) => {

        if (res.status == 'success') {
          console.log(res.message, this.selectedId, this.products)
          var index = this.products.findIndex(x => x.id === this.selectedId);
          this.products.splice(index, 1);

          this.products = [...this.products, res.data];
        }
        else {
          console.error(Error);
        }

      },
        (error) => {
          console.error(error.message);
        });
        
    this.productForm.reset();
    this.editProduct = false
  }

  clear(){
    this.productForm.reset()
  }

  hideDialog(){
    this.success = false
    this.error = false
  }

  edit(item: any){
    this.editProduct = true
    this.selectedProduct = item
    this.selectedId = item.id
    console.log(this.selectedProduct)
    this.productForm = new FormGroup({
      name: new FormControl(this.selectedProduct.name, [Validators.required]),     
      description: new FormControl(this.selectedProduct.description, [Validators.required]),     
      price: new FormControl(this.selectedProduct.price, [Validators.required]),
      quantity: new FormControl(this.selectedProduct.quantity, [Validators.required]),
      category_id: new FormControl(this.selectedProduct.category_id, [Validators.required]),
    });
    console.log(this.productForm.value)
  }

  addProductModal(){
  this.addProduct_ = true
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
