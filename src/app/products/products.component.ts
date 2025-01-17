import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from '../../models/product-category';
import { Products } from '../../models/products';
import { SubCategory } from '../../models/sub-category';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Products[] = [];

  sellerId = 6;

  categories: ProductCategory[] = [];

  subCategories: SubCategory[] = [];

  filteredSubCategories: SubCategory[] = [];

  newProduct: Products = {} as Products;

  selectedProduct: Products = {} as Products;

  selectedCategory: ProductCategory = {} as ProductCategory;

  public productForm: FormGroup;

  success = false;

  successMsg: any;

  errorMsg: any;

  error = false;

  editProduct = false;

  selectedFile: File | null = null;

  addProduct_ = false;

  title: any;

  msg: any;

  equipment: any;

  deleteModal = false;

  createModal = false;

  deletename: any;

  viewProduct = false;

  slides: any;

  user: any;

  selectedId = 0;

  showSubCategories = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private searchService: SearchService,
    private productService: ProductsService,
    private subCategoryService: SubCategoriesService,
    private categoryService: CategoriesService,
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      sub_category_id: new FormControl('', [Validators.required]),
      image_url: new FormControl(''),
    });
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser') || '{}');
    console.log(this.user);

    if (!this.user) {
      this.router.navigate(['/login']);
    }

    this.categoryService.getAllList().subscribe((res) => {
      this.categories = res.data;
      console.log('categories:', this.categories);
    });

    this.subCategoryService.getAllList().subscribe((res) => {
      this.subCategories = res.data;
      console.log('sub categories:', this.subCategories);

      this.productService.getSellerProducts(this.user).subscribe((res) => {
        res.data.forEach((product: any) => {
          product.image_url =
            'https://orezon.co.zw/storage/app/public/' + product.image_url;
          const category = this.subCategories.filter(
            (x) => x.id == product.sub_category_id
          );
          category.forEach((cat) => {
            product.sub_category_name = cat.name;
          });
        });
        this.products = res.data;
        console.log('products:', this.products);
      });
    });


    this.searchService.currentSearchTerm.subscribe((term) => {
      if (term) {
        this.searchEquipment(term); // Call with the updated search term
      } else {
        this.getAllEquipment();
      }
    });
  }

  onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files!.item(0);

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.displayImage(e.target!.result as string);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  displayImage(imageData: string): void {
    // Update the image preview in the template
    this.imagePreview = imageData;
  }

  imagePreview: string = '';

  getImagePreview(): string {
    if (!this.selectedFile) {
      return 'assets/img/upload.svg';
    }
    return URL.createObjectURL(this.selectedFile);
  }

  addProduct() {
    console.log(this.productForm.value);
    this.newProduct = this.productForm.value;
    this.newProduct.user_id = this.user;
    var formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('quantity', this.productForm.value.quantity);
    formData.append('sub_category_id', this.productForm.value.sub_category_id);
    formData.append('image_url', this.selectedFile, this.selectedFile.name);
    formData.append('user_id', this.user);

    this.createModal = false;

    this.productService.create(formData).subscribe(
      (res) => {
        console.log('res', res);

        if (res.status == 'created') {
          alert(res.message);
          this.productService.getSellerProducts(this.user).subscribe((res) => {
            res.data.forEach((product: any) => {
              product.image_url =
                'https://orezon.co.zw/storage/app/public/' + product.image_url;
              const category = this.categories.filter(
                (x) => x.id == product.sub_category_id
              );
              category.forEach((cat) => {
                product.sub_category_name = cat.name;
              });
            });
            this.products = res.data;
            console.log('products:', this.products);
          });
          console.log(res.message);
        } else {
          console.log(res.message);
          // Handle the error as needed
        }
      },
      (error) => {
        console.error(error.error.message);
        alert(error.error.message);
        // Handle the error as needed
      }
    );
    this.productForm.reset();
  }

  updateProduct() {
    console.log(this.productForm.value, this.selectedId);
    this.productService
      .update(this.productForm.value, this.selectedId)
      .subscribe(
        (res) => {
          console.log('res', res);

          if (res.status == 'success') {
            alert(res.message);
            var index = this.products.findIndex(
              (x) => x.id === this.selectedId
            );
            this.products.splice(index, 1);

            this.products = [...this.products, res.data];
          } else {
            console.error(Error);
          }
        },
        (error) => {
          console.error(error.message);
          alert(error.error.message);
        }
      );

    this.productForm.reset();
    this.editProduct = false;
  }

  clear() {
    this.productForm.reset();
  }

  hideDialog() {
    this.success = false;
    this.error = false;
    this.deleteModal = false;
    this.editProduct = false;
    this.viewProduct = false;
    this.createModal = false;
  }

  edit(item: any) {
    this.editProduct = true;
    this.selectedProduct = item;
    this.selectedId = item.id;
    console.log(this.selectedProduct);
    this.productForm = new FormGroup({
      name: new FormControl(this.selectedProduct.name, [Validators.required]),
      description: new FormControl(this.selectedProduct.description, [
        Validators.required,
      ]),
      price: new FormControl(this.selectedProduct.price, [Validators.required]),
      quantity: new FormControl(this.selectedProduct.quantity, [
        Validators.required,
      ]),
      sub_category_id: new FormControl(this.selectedProduct.sub_category_id, [
        Validators.required,
      ]),
    });
    console.log(this.productForm.value);
  }

  view(item: any) {
    this.selectedProduct = item;
    this.viewProduct = true;
  }

  delete(item: any) {
    this.deletename = item.name;
    this.selectedId = item.id;
    this.deleteModal = true;
  }

  showModal() {
    this.createModal = true;
  }

  confirmDelete() {
    this.productService.delete(this.selectedId).subscribe(
      (res) => {
        console.log('res', res);

        this.success = true;
        this.title = 'SUCESS';
        this.successMsg = this.deletename + ' deleted successfully';
        var index = this.products.findIndex((x) => x.id === this.selectedId);
        this.products.splice(index, 1);

        this.products = [...this.products, res.data];
      },
      (error) => {
        console.error(error.message);
        this.error = true;
        this.title = error.error.status;
        this.errorMsg = error.error.message;
      }
    );

    this.deleteModal = false;
  }

  onSelection(item: any) {
    const selectedCategory = (item.target as HTMLSelectElement).value;

    this.filteredSubCategories = this.subCategories.filter(x => x.category_id == selectedCategory)

    if (this.filteredSubCategories.length > 0) {
      this.showSubCategories = true
    } else {
      this.showSubCategories = false
    }
  }

  getAllEquipment() {
    const url = `http://localhost:8000/api/v1/equipment`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.slides = data.data;
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error as needed
      },
    });
  }

  searchEquipment(name?: string) {
    const url = `http://localhost:8000/api/v1/equipment/search/${name}`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        console.log('Search result ', data);
        this.slides = data;
      },
      error: (error: any) => {
        console.error(error);
        // Handle the error as needed
      },
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
