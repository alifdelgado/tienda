import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';
import { OrdenesDetallePage } from './../ordenes-detalle/ordenes-detalle';

/**
 * Generated class for the OrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
  ordenesDetalle = OrdenesDetallePage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cs: CarritoProvider) {
  }

  ionViewWillEnter(){
    console.log('cargando ordenes');
    this.cs.cargar_ordenes();
  }
}
