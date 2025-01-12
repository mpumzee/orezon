import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { SubCategory } from '../../models/sub-category';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css',
})
export class SubCategoriesComponent {
  categories: Category[] = [];

  subCategories: SubCategory[] = [];

  public subCategoryForm: FormGroup;

  success = false;

  editProduct = false;

  viewProduct = false;

  successMsg: any;

  errorMsg: any;

  selectedSubCategory: SubCategory = {} as SubCategory;

  error = false;

  deleteName: any;

  selectedId = 0;

  title: any;

  msg: any;

  deleteModal = false;

  createModal = false;

  constructor(
    private categoryService: CategoriesService,
    private subCatgeorySevice: SubCategoriesService
  ) {
    this.subCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category_id: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllList().subscribe((res) => {
      this.categories = res.data;
      console.log('categories:', this.categories);
    });

    this.subCatgeorySevice.getAllList().subscribe((res) => {
      res.data.forEach((product: any) => {
        const category = this.categories.filter(
          (x) => x.id == product.category_id
        );
        category.forEach((cat) => {
          product.category_name = cat.name;
        });
      });
      this.subCategories = res.data;
      console.log('subCategories:', this.subCategories);
    });
  }

  createSubCategory() {
    this.subCatgeorySevice.create(this.subCategoryForm.value).subscribe(
      (res) => {
        console.log('res', res);

        if (res.status == 'created') {
          alert(res.message);
          this.subCatgeorySevice.getAllList().subscribe((res) => {
            res.data.forEach((product: any) => {
              const category = this.categories.filter(
                (x) => x.id == product.category_id
              );
              category.forEach((cat) => {
                product.category_name = cat.name;
              });
            });
            this.subCategories = res.data;
            console.log('products:', this.subCategories);
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
    this.subCategoryForm.reset();
    this.createModal = false;
  }

  updateSubCategory() {
    console.log(this.subCategoryForm.value, this.selectedId);
    this.subCatgeorySevice
      .update(this.subCategoryForm.value, this.selectedId)
      .subscribe(
        (res) => {
          console.log('res', res);

          if (res.status == 'success') {
            alert(res.message);
            var index = this.subCategories.findIndex(
              (x) => x.id === this.selectedId
            );
            this.subCategories.splice(index, 1);

            this.subCategories = [...this.subCategories, res.data];
          } else {
            console.error(Error);
          }
        },
        (error) => {
          console.error(error.message);
          alert(error.error.message);
        }
      );

    this.subCategoryForm.reset();
    this.editProduct = false;
  }

  hideDialog() {
    this.success = false;
    this.error = false;
    this.deleteModal = false;
    this.editProduct = false;
    this.viewProduct = false;
    this.createModal = false;
  }

  showModal() {
    this.createModal = true;
  }

  edit(item: any) {
    this.editProduct = true;
    this.selectedSubCategory = item;
    this.selectedId = item.id;
    console.log(this.selectedSubCategory);
    this.subCategoryForm = new FormGroup({
      name: new FormControl(this.selectedSubCategory.name, [
        Validators.required,
      ]),
      description: new FormControl(this.selectedSubCategory.description, [
        Validators.required,
      ]),
      category_id: new FormControl(this.selectedSubCategory.category_id, [
        Validators.required,
      ]),
    });
    console.log(this.subCategoryForm.value);
  }

  view(item: any) {
    this.selectedSubCategory = item;
    this.viewProduct = true;
  }

  clear() {
    this.subCategoryForm.reset();
  }

  delete(item: any) {
    this.deleteName = item.name;
    this.selectedId = item.id;
    this.deleteModal = true;
  }

  confirmDelete() {}
}
