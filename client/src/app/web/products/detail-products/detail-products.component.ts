import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router,Route, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { GLOBAL } from 'src/app/services/global';
import { ShopcartService } from 'src/app/services/shopcart.service'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-products',
  templateUrl: './detail-products.component.html',
  styleUrls: ['./detail-products.component.scss']
})
export class DetailProductsComponent implements OnInit {
  public product: Product;
  public mainPhoto: String;
  public photos: Array<String>;
  public storage: string;

  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _shopCart: ShopcartService,
    private _title: Title,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.storage = GLOBAL.storage;
  }

  private getProduct(){
    const id = +this._activatedRoute.snapshot.paramMap.get('id');

    this._productService.getById(id).subscribe(
      (response)=>{
        if (response.status === 'success' ){
          this.product = response.producto;
          this.mainPhoto = this.product.images[0];
          this.photos = this.product.images;
          this.photos.splice(0,1);          
          this._title.setTitle(this.product.title+' | ' + this.product.category.name + ' | Maria Guerrero: Muebles y objetos | Bahía Blanca');  
          this.setAnchoImagenes();
        }
      },
      (error)=>{

      }
    );
  }

  private setAnchoImagenes(){
    for(let imagen of this.product.images){
      const index = this.product.images.indexOf(imagen);

      let img = new Image();
      img.src = this.storage + '' + imagen;

      img.onload = function () {
        const alto = img.naturalWidth;
        const ancho = img.naturalHeight;
        const element = document.getElementById('imagen-'+index); 
        (alto>ancho) ? element.classList.add('imagen-vertical') : element.classList.add('imagen-horizontal');        
      };      

    }
  }

  enviarPresupuestar(){
    let elememento = <HTMLInputElement>  document.getElementById('cantidad-r');
    let cantidad = elememento.value
    console.log(cantidad);
    this._shopCart.saveProduct(this.product,cantidad);
    this._router.navigate(['presupuesto']);
  }

}
