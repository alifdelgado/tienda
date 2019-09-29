import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductoPage } from '../index.paginas';
import { CarritoProvider, UsuarioProvider, ProductosProvider } from '../../providers/index.services';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productoPage = ProductoPage;
  constructor(public navCtrl: NavController, public prodProv: ProductosProvider, public cs: CarritoProvider, public us: UsuarioProvider) {

  }

  siguiente_pagina(infiniteScroll) {
    this.prodProv.cargar_todos().then(() =>{
      infiniteScroll.complete();
    });
  }
}
