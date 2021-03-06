import { URL_SERVICIOS } from './../../config/url.service';
import 'rxjs/add/operator/map';
import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../usuario/usuario';

import { LoginPage, CarritoPage } from '../../pages/index.paginas';

@Injectable()
export class CarritoProvider {
  items:any[] = [];
  total_carrito:number = 0;
  ordenes:any[] = [];
  constructor(public http: Http, private alertCtrl: AlertController, private platform: Platform, private storage: Storage, private usuarioProv: UsuarioProvider, private modalCtrl: ModalController) {
    this.cargar_storage();
    this.actualizar_total();
  }

  remover_item(idx:number) {
    this.items.splice(idx, 1);
    this.guardar_storage();
  }

  realizar_pedido() {
    let data = new URLSearchParams();
    let codigos:string[] = [];

    for(let item of this.items) {
      codigos.push(item.codigo);
    }
    data.append("items", codigos.join(","));
    let url = `${URL_SERVICIOS}/pedidos/realizarOrden/${this.usuarioProv.token}/${this.usuarioProv.id}`;
    this.http.post(url, data).subscribe(resp => {
      let respuesta = resp.json();
      if (respuesta.error) {
        this.alertCtrl.create({
          title: "Error en la orden",
          subTitle: respuesta.mensaje,
          buttons:["OK"]
        }).present();
      } else {
        this.items = [];
        this.alertCtrl.create({
          title: "Orden Realizada",
          subTitle: "Nos contactaremos con usted próximamente",
          buttons:["OK"]
        }).present();
      }
    });
  }

  ver_carrito() {
    let modal:any;
    if (this.usuarioProv.token) {
      modal = this.modalCtrl.create(CarritoPage);
    } else {
      modal = this.modalCtrl.create(LoginPage);
    }

    modal.present();

    modal.onDidDismiss((abrirCarrito:boolean) => {
      console.log(abrirCarrito);
      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present();
      }
    });
  }

  agregar_carrito(item_parametro:any) {
    for(let item of this.items) {
      if(item.codigo == item_parametro.codigo) {
        this.alertCtrl.create({
          title: "Item existe",
          subTitle: item_parametro.producto + ", ya existe en su carrito de compras",
          buttons: ["OK"]
        }).present();
        return;
      }
    }
    this.items.push(item_parametro);
    this.actualizar_total();
    this.guardar_storage();
  }

  actualizar_total() {
    this.total_carrito = 0;
    for(let item of this.items) {
      this.total_carrito += Number(item.precio_compra);
    }
  }

  private guardar_storage() {
    if (this.platform.is('cordova')) {
      this.storage.set('items', this.items);
    } else {
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  }

  cargar_storage() {
    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.storage.ready().then(() => {
          this.storage.get('items').then(items => {
            if(items) {
              this.items = items;
            }
            resolve();
          });
        });
      } else {
        if (localStorage.getItem('items')) {
          this.items = JSON.parse(localStorage.getItem('items'));
        }
        resolve();
      }
    });
    return promesa;
  }

  cargar_ordenes() {
    let url = `${URL_SERVICIOS}/pedidos/obtenerPedidos/${this.usuarioProv.token}/${this.usuarioProv.id}`;
    this.http.get(url).map(resp => resp.json()).subscribe(data => {
      if (data.error) {

      } else {
        this.ordenes = data.ordenes;
      }
    });
  }

  borrar_orden(orden_id:string) {
    let url = `${URL_SERVICIOS}/pedidos/borrarPedido/${this.usuarioProv.token}/${this.usuarioProv.id}/${orden_id}`;
    return this.http.delete(url).map(resp => resp.json());
  }
}
