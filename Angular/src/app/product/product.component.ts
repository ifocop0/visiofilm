import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CatalogService } from '../catalog.service';
import { CartService } from '../cart.service';
import { Product } from '../interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product;
  relatedProducts: Product[];

  private paramsSubscription: Subscription;

  constructor(
    private cartService: CartService,
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // console.log('route.snapshot.params:', this.route.snapshot.params);
    // console.log('route.snapshot.queryParams:', this.route.snapshot.queryParams);
    // console.log('route.snapshot.fragment:', this.route.snapshot.fragment);

    /**
     * Avec this.route.snapshot.params on récupère la valeur au chargement
     * et on conserve la valeur initiale durant toute la "vie" du composant.
     * Qu se passe-t-il si on appelle un autre produit à partir de cette page ?
     * -> l'identifiant changera dans la barre d'adresse mais les infos produits
     * ne seront pas mises à jour dans la page...
     */
    // const productId = this.route.snapshot.params['id'];
    // this.catalogService.getProductById(productId)
    // .subscribe((product: Product) => { // IMPORTANT: Utiliser une fonction flèche.
    //   product.image = `/assets/images/products/${product.image}`;
    //   this.product = product;
    // });

    /**
     * Pour refléter les changements suite à un lien interne à cette même page,
     * Il faut réagir au changement d'identifiant dans l'URL.
     * On utilise un observable pour refaire un appel au serveur à chaque changement
     * d'identifiant produit.
     * Puisque ce changement est détecté également la première fois,
     * on peut supprimer la version initiale de ce code et conserver uniquement la nouvelle.
     */
    this.paramsSubscription = this.route.params.subscribe((params: Params) => { // IMPORTANT: Utiliser une fonction flèche.
      // console.log('params change:', params);
      this.catalogService.getProductById(params.id).subscribe((product: Product) => { // IMPORTANT: Utiliser une fonction flèche.
        //product.image = `/assets/images/products/${product.image}`;
        //product.image = `/assets/images/products/${product.id}.jpg`;
        console.log("DEBUT VISU")
        //console.log(product);
        console.log(product[0]);
   
        console.log("FIN VISU")
        this.product = product[0];
        this.product.rating=5;
        this.product.qte = 5;
        if (this.product.qte > 0)
          this.product.inStock = true;
        else 
        this.product.inStock = false;
      });

      this.catalogService.getRelatedProducts(params.id).subscribe((products: Product[]) => { // IMPORTANT: Utiliser une fonction flèche.
        // console.log('products; ', products);
        this.relatedProducts = products;
      });
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe(); // facultatif, Angular se désinscrira automatiqument
    // de l'observable sur la route. Mais ce n'est pas le cas de tous les observables.
  }

  addToCart(product: Product): void {
    // console.log('Adding to cart:', product);
    this.cartService.addProduct(product);
    this.router.navigate(['/cart']);
  }
}
