import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { GestionApiService } from 'src/app/services/gestion-api.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent  implements OnInit {

  valoresCategorias: number[] = [];
  @Input() nombresCategorias: string[] = [];
  // Atributo que almacena los datos del chart
  public chart!: Chart;
  public apiData: {categoria: string; totalResults: number}[] = [];

  constructor(public gestionServiceApi: GestionApiService) { }

  ngOnInit(): void {
    console.log("Ejecuta bar-chart")
    this.gestionServiceApi.datos$.subscribe((datos) => {
      // Utiliza los datos para renderizar la gráfica
      if(datos != undefined){
        this.valoresCategorias.push(datos.totalResults);
        this.actualizarValoresChart(datos.categoria, datos.totalResults);
        this.inicializarChart();
      }
    });
  }
  ngOnDestroy() {
    this.destroyChart();
  }

  private actualizarValoresChart(categoria: string, totalResults: number){
    this.apiData. push({categoria: categoria, totalResults: totalResults});
    /*for (let i = 0; i < this.nombresCategorias.length; i++) {
      const nombre = this.nombresCategorias[i];
      const valor = this.valoresCategorias[i];
      const objeto = { categoria: nombre, valor: valor };
      this.apiData.push(objeto);
    }*/
  }

  private inicializarChart() {
    // Destruir el gráfico existente si existe
    this.destroyChart();
    // datos   

    // Inicializa un objeto para almacenar los datasets por empresa
    const datasetsByCompany: { [key: string]: 
      {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
      } 
    } = {};

    this.apiData.forEach((row: { categoria: string; totalResults: number }, index: number) => {
      const { categoria, totalResults } = row;

      //Si no existe la creamos
      if (!datasetsByCompany[categoria]) {
        datasetsByCompany[categoria] = {
          label: 'Valores de ' +categoria,
          data: [],
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgb(54, 162, 235)"],
          borderWidth: 1
        };
      }

      datasetsByCompany[categoria].data[index] = totalResults;
      //datasetsByCompany[empresa].backgroundColor[adjustedNumMes] = datos.fondo;
      //datasetsByCompany[empresa].borderColor[adjustedNumMes] = datos.borde;

    });

    // Convierte el objeto a un array de datasets
    const datasets = Object.values(datasetsByCompany);


    /********* OPCION 3 *****************************/
    this.chart = new Chart("barChart", {
      type: 'bar' as ChartType, // tipo de la gráfica
      //data: {data}, // datos
      data: {
        labels: this.apiData.map((row: { categoria: string; totalResults: number}) => row.categoria),
        datasets: datasets
      },
      options: { // opciones de la gráfica
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              //boxWidth: 0,
              font: {
                size: 16,
                weight: 'bold'
              }
            },
          }
        },
      }
    });


    this.chart.canvas.width = 100;
    this.chart.canvas.height = 100;
  }

  private destroyChart() {
    // Destruir el gráfico si existe
    if (this.chart) {
      this.chart.destroy();
    }
  }
}