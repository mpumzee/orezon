import { Component } from '@angular/core';
import jsPDF from 'jspdf';
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

  constructor(private wishlistService: WishListService) { }

  ngOnInit(): void {
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
