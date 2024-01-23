import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
// Necesitamos importar Chart desde chart.js
import { Chart, ChartType } from 'chart.js/auto';
 
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
 
  // Atributo que almacena los datos del chart
  public chart!: Chart;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
 
  ngOnInit(): void {
    console.log("Ejecuta line-chart");
    this.inicializarChart();
  }
  ngOnDestroy() {
    this.destroyChart();
  }

  private inicializarChart(){
    // Destruir el gráfico existente si existe
    this.destroyChart();
    // datos
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    // Creamos la gráfica
    const canvas = this.renderer.createElement('canvas');
    this.renderer.setAttribute(canvas, 'id', 'lineChart');
  
    // Añadimos el canvas al div con id "contenedor-linechart"
    const container = this.el.nativeElement.querySelector('#contenedor-linechart');
    this.renderer.appendChild(container, canvas);

    // Creamos la gráfica
    this.chart = new Chart(canvas, {
      type: 'line' as ChartType, // tipo de la gráfica 
      data: data, // datos
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
              boxWidth: 0,
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