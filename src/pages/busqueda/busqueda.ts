import { Component } from '@angular/core';
import { ProductoPage } from './../index.paginas';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from './../../providers/productos/productos';

/**
 * Generated class for the BusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {
  productoPage = ProductoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ps: ProductosProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusquedaPage');
  }

  buscar_productos(event:any) {
    let valor = event.target.value;
    this.ps.buscar_producto(valor);
  }
}
