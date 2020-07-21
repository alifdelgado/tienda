import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PorCategoriasPage } from './../index.paginas';
import { ProductosProvider } from './../../providers/productos/productos';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  porCategorias = PorCategoriasPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public prodProv: ProductosProvider) {

  }

}
