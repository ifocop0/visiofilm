import { Component, OnInit, ViewChild } from '@angular/core';

import { CartService } from '../cart.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  closeResult: string;
  @ViewChild('modalContent') private modalContent;

  constructor(
    private cartService: CartService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
  }

  removeOne(productId: string) {
    if (this.cartService.getProductQty(productId) > 1) {
      this.cartService.removeOne(productId);
    } else {
      this.removeProduct(productId);
    }
  }

  addOne(productId: string) {
    this.cartService.addOne(productId);
  }

  removeProduct(productId: string) {
    this.modalRemoveProduct(productId);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      // console.log('C', 'by pressing ESC');
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      // console.log('D', 'by clicking on a backdrop');
      return 'by clicking on a backdrop';
    } else {
      // console.log('E', reason);
      return  `with: ${reason}`;
    }
  }

  private modalRemoveProduct(productId: string): void {
    this.modalService.open(this.modalContent, { centered: true })
    .result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.cartService.removeProduct(productId);
      // console.log('A', this.closeResult);
    }, (reason: ModalDismissReasons) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // console.log('B', this.closeResult);
    });

  }
}
