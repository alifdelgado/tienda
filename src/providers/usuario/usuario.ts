import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { AlertController, Platform } from 'ionic-angular';
import { URL_SERVICIOS } from './../../config/url.service';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
  token:string;
  id:string;

  constructor(public http: Http, private alertCtrl: AlertController, private platform: Platform, private storage: Storage) {
    this.cargar_storage();
  }

  activo():boolean {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  ingresar(correo:string, contrasena:string){
    let data = new URLSearchParams();
    let url = URL_SERVICIOS + "/login";
    data.append("correo", correo);
    data.append("contrasena", contrasena);

    return this.http.post(url, data).map(resp => {
      let dataResp = resp.json();
      console.log(dataResp);
      if (dataResp.error) {
        this.alertCtrl.create({
          title: 'Error al iniciar sesión',
          subTitle: dataResp.mensaje,
          buttons: ['OK']
        }).present();
      } else {
        this.token = dataResp.token;
        this.id = dataResp.id_usuario;
        this.guardar_storage();
      }
    });
  }

  cerrar_sesion() {
    this.token = null;
    this.id = null;
    this.guardar_storage();
  }

  private guardar_storage() {
    if (this.platform.is('cordova')) {
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id);
    } else {
      if (this.token) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('id_usuario', this.id);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('id_usuario');
      }
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.storage.ready().then(() => {
          this.storage.get('token').then(token => {
            if(token) {
              this.token = token;
            }
          });

          this.storage.get('id_usuario').then(id_usuario => {
            if(id_usuario) {
              this.id = id_usuario;
            }
            resolve();
          });
        });
      } else {
        if (localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.id = localStorage.getItem('id_usuario');
        }
        resolve();
      }
    });
    return promesa;
  }
}
