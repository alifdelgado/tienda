import { URL_SERVICIOS } from './../../config/url.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosProvider {
  pagina:number = 0;
  productos:any[] = [];
  lineas:any[] = [];
  por_categoria:any[] = [];
  busqueda:any[] = [];

  constructor(public http: Http) {
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_lineas() {
    let url = URL_SERVICIOS + "/lineas";
    this.http.get(url).map(resp => resp.json()).subscribe(data => {
      if (data.error) {
      } else {
        this.lineas = data.lineas;
      }
    });
  }

  cargar_todos() {
    let promesa = new Promise((resolve, reject) => {
      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;
      this.http.get(url).map(respuesta => respuesta.json()).subscribe(data => {
        if (data.error) {

        } else {
          let nuevaData = this.agrupar(data.productos, 2);
          this.productos.push(...nuevaData);
          this.pagina += 1;
        }
        resolve();
      });
    });
    return promesa;
  }

  cargar_por_categoria(categoria: number) {
    let url = URL_SERVICIOS + '/productos/porTipo/' + categoria;
    this.http.get(url).map(resp => resp.json()).subscribe(data => {
      this.por_categoria = data.productos;
    });
  }

  private agrupar(arr: any, tamano: number) {
    let nuevoArreglo = [];
    for(let i=0; i<arr.length; i+=tamano) {
      nuevoArreglo.push(arr.slice(i, i+tamano));
    }
    return nuevoArreglo;
  }

  buscar_producto(termino:string) {
    let url = `${URL_SERVICIOS}/productos/buscar/${termino}`;
    this.http.get(url).subscribe(resp => {
      let data = resp.json();
      this.busqueda = data.productos;
    });
  }
}
