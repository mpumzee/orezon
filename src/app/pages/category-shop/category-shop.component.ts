import { Component, TemplateRef, ViewChild, type OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Orders } from '../../../models/orders';
import { ProductCategory } from '../../../models/product-category';
import { Products } from '../../../models/products';
import { Seller } from '../../../models/seller';
import { SubCategory } from '../../../models/sub-category';
import { CartService, ProductsService, SellerRegistrationService, SubCategoriesService, WishListService } from '../../tools/services';

@Component({
  selector: 'app-category-shop',
  standalone: false,
  templateUrl: './category-shop.component.html',
  styleUrl: './category-shop.component.css',
})
export class CategoryShopComponent implements OnInit {
  @ViewChild('enquiryDialog') enquiryDialogTemplate!: TemplateRef<any>;

  currentCart: any = [];
  currentItem: any;
  order: Orders = {} as Orders;
  id = 0;
  products: Products[] = [];
  unfilteredProducts: Products[] = [];
  categories: ProductCategory[] = [];
  subCategories: SubCategory[] = [];
  wishlist = [];
  user: any;
  selectedProduct: Products = {} as Products;
  role: any
  sellers: Seller[] = []
  viewProduct = false
  image: any

  // Enquiry related properties
  enquiryProduct: Products = {} as Products;
  enquiryEmail: string = '';
  enquiryMessage: string = '';

  constructor(
    public cartService: CartService,
    private wishlistServie: WishListService,
    private productService: ProductsService,
    private categoryService: SubCategoriesService,
    public actRoute: ActivatedRoute,
    private sellerService: SellerRegistrationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('cart', this.cartService.getCurrentCart());
    this.role = sessionStorage.getItem('loggedUserRole') || '{}';

    this.categoryService.getAllList().subscribe((res) => {
      this.subCategories = res.data;
      console.log('categories:', this.subCategories);

      this.sellerService.getAllList().subscribe((res) => {
        this.sellers = res.data;
        console.log('sellers:', this.sellers);

        this.productService.getAllList().subscribe((res) => {
          console.log('res.data:', res.data);
          this.unfilteredProducts = res.data.filter(
            (x) => x.sub_category_id == this.id
          );
          this.unfilteredProducts.forEach((product: any) => {
            product.image_url =
              'https://ore-zone.com/storage/app/public/' + product.image_url;
            product.image_url2 =
              'https://ore-zone.com/storage/app/public/' + product.image_url2;
            product.image_url3 =
              'https://ore-zone.com/storage/app/public/' + product.image_url3;
            this.sellers.filter(x => x.user_id == product.user_id).forEach(seller => {
              product.seller_name = seller.user.name
            })
            const category = this.subCategories.filter(
              (x) => x.id == product.sub_category_id
            );
            console.log('category', category);
            category.forEach((cat) => {
              product.sub_category_name = cat.name;
              console.log('category', product.sub_category_name);
            });
          });
          this.products = this.unfilteredProducts;
          console.log('products:', this.products);
        });
      });
    });

    this.id = this.actRoute.snapshot.params['id'];



    this.cartService.updateTotal.subscribe((resp) => {
      if (resp) {
        this.currentCart = this.cartService.getCurrentCart();
      }
    });
    this.currentCart = this.cartService.getCurrentCart();
  }

  updateCart(item: any) {
    this.cartService.success('Item added to cart');
    this.cartService.addToCart(item, item.price, 1);

    this.checkIfExist(item);
  }

  getCurrentItemAmount(item): number {
    return this.cartService.getCurrentItemAmount(item);
  }

  checkIfExist(item) {
    const index = this.currentCart?.findIndex((p) => p.id === item.id);
    if (index >= 0) {
      return this.currentCart[index].quantity;
    }
    return 0;
  }


  addTowishList(item) {
    this.cartService.success('Item added to wishlist');
    return this.wishlistServie.addToCart(item, item.price, 1)
  }


  checkIfIteminWishList(item): boolean {
    const index = this.currentCart.findIndex((p) => p.id === item.id);

    if (index !== -1) {


      // Item found, index contains the position of the item in the array
      console.log(`Item found at index: ${index}`);
      return true
    } else {
      // Item not found
      console.log('Item not found in the cart');
      return false
    }
  }

  viewImage(item: any) {
    console.log('item', item)
    this.viewProduct = true
    this.selectedProduct = item
  }

  hideDialog() {
    this.viewProduct = false
  }

  openEnquiryDialog(product: Products) {
    this.enquiryProduct = product;
    this.enquiryEmail = '';
    this.enquiryMessage = '';

    this.dialog.open(this.enquiryDialogTemplate, {
      width: '600px',
      disableClose: false
    });
  }

  closeEnquiryDialog() {
    this.dialog.closeAll();
  }

  submitEnquiry() {
    if (!this.enquiryEmail || !this.enquiryMessage) {
      return;
    }

    const enquiryData = {
      productId: this.enquiryProduct.id,
      productName: this.enquiryProduct.name,
      email: this.enquiryEmail,
      message: this.enquiryMessage,
      sellerId: this.enquiryProduct.user_id,
      date: new Date()
    };

    // Here you would send the data to your backend
    console.log('Submitting enquiry:', enquiryData);

    // Display success message
    this.cartService.success('Your enquiry has been submitted');

    // Close the dialog
    this.closeEnquiryDialog();
  }
}
