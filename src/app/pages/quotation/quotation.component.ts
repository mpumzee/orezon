import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { User } from '../../../models/user';
import { WishListService } from '../../tools/services';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css'
})
export class QuotationComponent {

  wishlist = []

  wishlistCount = 0

  todayDate = new Date()

  role: any

  user: User = {} as User;

  constructor(private router: Router, private wishlistService: WishListService) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('loggedUserRole') || '{}';
    this.user.name = sessionStorage.getItem('loggedUserName') || '{}';
    this.user.email = sessionStorage.getItem('loggedUserEmail') || '{}';

    if (sessionStorage.length == 0) {
      this.router.navigate(['/login']);
    }

    this.wishlist = this.wishlistService.getCurrentCart()
    this.wishlistCount = this.wishlistService.getTotal()
    this.wishlist.forEach(wish => {
      wish.price = Number(wish.price)
    })
    console.log(this.wishlist)
  }


  captureReportModal(section: any) {

    const doc = new jsPDF('landscape', 'pt', 'a4', true);

    doc.html(section!, {
      callback: function (doc) {


        // Save the PDF
        doc.save(`Quotation.pdf`);
      },
      x: 0,
      y: 0,
      html2canvas: {
        scale: 0.7, // Adjust this value as needed
        useCORS: true,
        windowWidth: doc.internal.pageSize.getWidth(),
        windowHeight: doc.internal.pageSize.getHeight()
      }
    });
  }

}
