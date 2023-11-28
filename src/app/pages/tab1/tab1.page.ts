import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  // Array para la cabecera de las noticias
  categorias: string[] = ["general", "business", "technology", "science", "sports"];

  // Atributos para generar la consulta REST
  // Están almacenados en los ficheros de la carpeta enviroments
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;
  //Declaramos y creamos el array de noticias vacío
  listaNoticias: Article[] = [];
  /*
   * Creamos un objeto {} Observable que estará vacío y será del tipo Observable<RespuestaNoticias>. En este caso estamos creando un objeto vacío no será null.
   *
   * Otra manera de hacer esto sería utilizar | null = null, de esta manera decimos que el objeto respuestaNoticiasObservable de tipo Observable<RespuestaNoticias>
   * puede ser null y lo inicializamos null.
   * 
   * Crearlo como global puede ser útil si utilizamos el observable en varios métodos.
  */
  //respuestaNoticiasObservable: Observable<RespuestaNoticias> = {} as Observable<RespuestaNoticias>;
  //respuestaNoticiasObservable: Observable<RespuestaNoticias> | null = null;

  //Añadimos HttpClient y el servicio en el constructor
  constructor(private leerArticulosServicioHttp: HttpClient, public gestionNoticiasLeerService: GestionNoticiasLeerService) {
    //Incluso podríamos crear la llamada en el constructor si fuese necesario
    //this.respNoticiasObservable = this.leerArticulosFicheroHttp.get<RespuestaNoticias>("/assets/datos/articulos.json");
    //this.leerArticulosFichero();
    this.cargarCategoria(this.categorias[0]);
  }

  // Se realiza la consulta REST de una categoría
  // Se concatena la URL, la categoría y la apiKey
  private cargarCategoria(categoria: string) {
    let respuesta: Observable<RespuestaNoticias> = this.leerArticulosServicioHttp.get<RespuestaNoticias>("https://newsapi.org/v2/top-headlines?category=" + categoria + "&apiKey=" + this.apiKey);

    respuesta.subscribe( resp => {
      // console.log("Noticias", resp);
      this.listaNoticias.push(... resp.articles);
    } );
  }

  // En función de la categoría elegida se realiza la consulta REST correspondiente
  public cambiarCategoria(eventoRecibido: any) {
    this.listaNoticias = [];
    this.cargarCategoria(eventoRecibido.detail.value);
  }

  // Cuando cambia el check, en función de su valor añade o borra la noticia del array
  checkNoticia(eventoRecibido: any, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeerService.addNoticias(item);
    } else {
      this.gestionNoticiasLeerService.borrarNoticia(item);
    }
  }

  // Comprueba si la noticia seleccionada (checked) está para leer o no
  
  seleccionado(item: Article): boolean {
    let indice: number = this.gestionNoticiasLeerService.buscarNoticia(item);
    if (indice != -1) {
      return true;
    }
    return false; 
  }

  /*
  private leerArticulosFichero(){
    //Hacemos uso de la función get de HttpClient para leer el json diciendo que será de tipo RespuestaNoticias y la guardamos
    let respNoticiasObservable: Observable<RespuestaNoticias> | null = null;
    respNoticiasObservable = this.leerArticulosFicheroHttp.get<RespuestaNoticias>("/assets/datos/articulos.json");
    respNoticiasObservable.subscribe( resp => {
      console.log("Noticias", resp);
      this.listaNoticias.push(...resp.articles);
    });
  }*/
  
}
