import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { GestionStorageService } from './gestion-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private leerNoticias : Article[] = [];

  constructor(private gestionStorage: GestionStorageService) {
    // Se recuperan los datos que hubiera en Storage. Le llamamos readNoticias.
    let datosPromesa: Promise<Article[]> = gestionStorage.getObject("readNoticias");
    datosPromesa.then( datos => {
      if (datos) {
        // console.log(datos);
        this.leerNoticias.push(...datos);
      }
    });
    
  }

  // Devuelve todas las noticias para leer
  getNoticias() {
    return this.leerNoticias;
  }

  //Añade una nueva noticia al array para poder leer
  addNoticias(noticia : Article){
    let noticiaString = JSON.stringify(noticia);
    noticia = JSON.parse(noticiaString);

    this.leerNoticias.push(noticia);
    //Al hacer el set guardamos con el nombre readNoticias para diferenciar del resto.
    this.gestionStorage.setObject("readNoticias", this.leerNoticias)
  }

  /* Comprueba si una noticia ya está en el array.
   * Mediante find vamos recorriendo todo el array hasta encontrar un objeto noticia que coincida con el objeto item que viene desde tab1.page.ts -> seleccionado()
   */
  buscarNoticia(item: Article): number  {
    let indice: number = this.leerNoticias.findIndex(
      function(noticia) {
        return JSON.stringify(noticia) == JSON.stringify(item);
      }
    );
    //let indice = this.leerNoticias.indexOf(articuloEncontrado);
    return indice;
  }

  // Borra una noticia del array
  borrarNoticia(item: Article) {
    let indice = this.buscarNoticia(item);
    if (indice != -1) {
      this.leerNoticias.splice(indice, 1);
      //Modificamos readNoticias para que no aparezca el valor borrado.
      this.gestionStorage.setObject("readNoticias", this.leerNoticias)
    }
  }

}
