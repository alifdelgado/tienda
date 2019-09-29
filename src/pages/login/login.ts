import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/index.services';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  correo:string = "";
  contrasena:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private userProv: UsuarioProvider) {
  }

  ingresar() {
    this.userProv.ingresar(this.correo, this.contrasena).subscribe(() => {
      if (this.userProv.activo()) {
        this.viewCtrl.dismiss(true);
      }
    });
  }

}
