import { Component } from '@angular/core';
import { ProductoPage } from './../producto/producto';
import { NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from './../../providers/productos/productos';

/**
 * Generated class for the PorCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  categoria:any = {};
  productoPage = ProductoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public prodProv: ProductosProvider) {
    this.categoria = this.navParams.get('categoria');
    this.prodProv.cargar_por_categoria(this.categoria.id);
  }

}
