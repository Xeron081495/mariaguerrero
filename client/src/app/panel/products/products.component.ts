import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // atributes
  public products: Array<Product>;
  public productsAll: Array<Product>;
  public pagine: number = 0;
  public cant = 10;
  public storage: string;
  public filter: string = '';

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this.storage = GLOBAL.storage;
    this.getProductos();
  }

  /**
   * Delect a product in the view
   * @param p 
   */
  deleteProductView(p: Product){
    this.products.splice(this.products.indexOf(p),1);
    if(this.pagine>0 && this.products.length%this.cant==0)
      this.pagine--;
  }

  /**
   * Delete product
   */
  private getProductos(){
    this._productService.getAll().subscribe(
      (response) => {
        if(response.status === 'success'){
          this.products = response.productos;
          this.productsAll = response.productos; 
        }else if(response.status === 'error'){
          this.setMessage('alert','alert-danger',response.errors);
        }
      },
      (error) => {
        this.setMessage('alert','alert-danger','Error al cargar los productos. Recargue la pantalla y verifique conexión de internet');
      }
    );
  }

  /**
   * set message
   * @param id id del div a editar
   * @param alert alert de bootstrap a usar
   * @param err arreglo de strings o string cn errores
   */  
  private setMessage(id: string, alert: string, err: any){
    const div = document.getElementById(id);
    div.classList.remove('d-none', 'alert-info', 'alert-success', 'alert-danger');
    div.classList.add(alert, 'animated', 'fadeIn');
    
    if(Array.isArray(err)){
      div.innerText = '';
      for(let error of err){
        div.innerText = div.innerText+"-"+error+"\r";
      }
    }else{
      div.innerText = err;
    }
  }

   // filtrar productos por nombre o codigo
   filtrar() {
    let prof = [];
    this.products = null;
    this.productsAll.forEach((element) => {
      if (
        element.title.toLowerCase().search(this.filter.toLowerCase()) !== -1 ||
        element.category.name.toLowerCase().search(this.filter.toLowerCase()) !== -1 
      ) {
        prof.push(element);
      }
    });

    this.products = prof;

    if(this.filter=='')
      this.products = this.productsAll;

  }


}
