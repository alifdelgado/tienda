import { Component } from '@angular/core';
import { CarritoProvider } from '../../providers/index.services';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public cs: CarritoProvider, public viewCtrl: ViewController) {
  }

}
