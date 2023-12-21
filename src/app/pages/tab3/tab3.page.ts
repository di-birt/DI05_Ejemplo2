import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GestionNoticiasLeerService } from 'src/app/services/gestion-noticias-leer.service';
import { forkJoin , map, Observable } from 'rxjs';
import { GestionApiService } from 'src/app/services/gestion-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  // Array para la cabecera de las noticias
  categorias: string[] = [
    "business",
    "entertainment",
    "general",
    "technology",
    "health",
    "science",
    "sports"
  ];
  backgroundColorCat: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];

  borderColorCat: string[] =[
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];

  // Atributos para generar la consulta REST
  // Están almacenados en los ficheros de la carpeta enviroments
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;
  //Declaramos y creamos el array de noticias vacío
  //listaResultadosCategoria: number[] = [];


  tipoDeChartSeleccionado: string = "bar-chart";

  constructor(private router: Router, public gestionServiceApi: GestionApiService) {}

  ngOnInit() {
    // Limpiamos la lista de resultados al iniciar
    //this.listaResultadosCategoria = [];

    this.categorias.forEach(categoria => {
      this.gestionServiceApi.cargarCategoria(categoria);
    });

    // Suscríbete a los cambios en datos$
    /*this.gestionServiceApi.datos$.subscribe((datos) => {
      if (datos !== undefined) {
        this.listaResultadosCategoria.push(datos.totalResults);
      }
    });*/
  }

  segmentChanged(event: any) {
    this.router.navigate(['/tabs/graficos', event.detail.value]);
    this.tipoDeChartSeleccionado = event.detail.value;
    this.categorias.forEach(categoria => {
      this.gestionServiceApi.cargarCategoria(categoria);
    });
  }
}
