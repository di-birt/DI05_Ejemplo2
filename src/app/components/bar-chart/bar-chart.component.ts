import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { GestionApiService } from 'src/app/services/gestion-api.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  valoresCategorias: number[] = [];
  @Input() nombresCategorias: string[] = [];
  @Input() backgroundColorCategorias: string[] = [];
  @Input() borderColorCategorias: string[] = [];
  // Atributo que almacena los datos del chart
  public chart!: Chart;
  public apiData: { categoria: string; totalResults: number }[] = [];

  constructor(public gestionServiceApi: GestionApiService, private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    console.log("Ejecuta bar-chart")
    this.inicializarChart(); // Inicializa el gráfico una vez en el inicio

    this.gestionServiceApi.datos$.subscribe((datos) => {
      // Utiliza los datos para renderizar la gráfica
      if (datos != undefined) {
        this.actualizarValoresChart(datos.categoria, datos.totalResults);
        this.actualizarChart();
      }
    });
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  private actualizarValoresChart(categoria: string, totalResults: number) {
    const existingData = this.apiData.find(item => item.categoria === categoria);

    if (existingData) {
      // Si ya existe una entrada para esta categoría, actualiza el valor
      existingData.totalResults = totalResults;
    } else {
      // Si no existe, agrega una nueva entrada
      this.apiData.push({ categoria, totalResults });
    }
  }

  private actualizarChart() {
    // Actualiza solo los datos del gráfico sin volver a crearlo
    const datasetsByCompany: { [key: string]: { label: string; data: number[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number } } = {};

    this.apiData.forEach((row: { categoria: string; totalResults: number }, index: number) => {
      const { categoria, totalResults } = row;

      if (!datasetsByCompany[categoria]) {
        datasetsByCompany[categoria] = {
          label: 'Valores de ' + categoria,
          data: [],
          backgroundColor: [this.backgroundColorCategorias[index]],
          borderColor: [this.borderColorCategorias[index]],
          borderWidth: 1
        };
      }

      datasetsByCompany[categoria].data[index] = totalResults;
      datasetsByCompany[categoria].backgroundColor[index] = this.backgroundColorCategorias[index];
      datasetsByCompany[categoria].borderColor[index] = this.borderColorCategorias[index];
    });

    // Actualiza los datos del gráfico
    this.chart.data.labels = this.apiData.map((row: { categoria: string; totalResults: number }) => row.categoria);
    this.chart.data.datasets = Object.values(datasetsByCompany);
    this.chart.update(); // Actualiza el gráfico
  }

  private inicializarChart() {
    // Destruir el gráfico existente si existe
    this.destroyChart();
  
    // Objeto para almacenar los datasets por categoría
    const datasetsByCompany: { [key: string]: 
      {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
      } 
    } = {};
  
    // Si el gráfico no está inicializado, entonces créalo
    if (!this.chart) {
      this.apiData.forEach((row: { categoria: string; totalResults: number }, index: number) => {
        const { categoria, totalResults } = row;
  
        if (!datasetsByCompany[categoria]) {
          datasetsByCompany[categoria] = {
            label: 'Valores de ' + categoria,
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          };
        }
      });
  
      const datasets = Object.values(datasetsByCompany);

      // Creamos la gráfica
      const canvas = this.renderer.createElement('canvas');
      this.renderer.setAttribute(canvas, 'id', 'bar-chart');
    
      // Añadimos el canvas al div con id "chartContainer"
      const container = this.el.nativeElement.querySelector('#contenedor-barchart');
      this.renderer.appendChild(container, canvas);
  
      this.chart = new Chart(canvas, {
        type: 'bar' as ChartType,
        data: {
          labels: this.apiData.map((row: { categoria: string; totalResults: number }) => row.categoria),
          datasets: datasets
        },
        options: {
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
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
            }
          },
        }
      });
    } else {
      // Si el gráfico ya está inicializado, actualiza solo los datos
      this.chart.data.labels = this.apiData.map((row: { categoria: string; totalResults: number }) => row.categoria);
      this.chart.data.datasets = Object.values(datasetsByCompany);
      this.chart.update(); // Actualiza el gráfico con los nuevos datos
    }
  
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
