import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent  implements OnInit {

  // Atributo que almacena los datos del chart
  public chart!: Chart;

  constructor() { }

  ngOnInit(): void {
    console.log("Ejecuta bar-chart")
    this.inicializarChart();
  }
  ngOnDestroy() {
    this.destroyChart();
  }

  private inicializarChart() {
    // Destruir el gráfico existente si existe
    this.destroyChart();
    // datos
   /*const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'DataSet1',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };*/

    /*const data = [
      {mes: 'Enero', valor: 65, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(255, 99, 132)', anchoBorde: 1},
      {mes: 'Febrero', valor: 59, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(255, 159, 64)', anchoBorde: 1},
      {mes: 'Marzo', valor: 80, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(255, 205, 86)', anchoBorde: 1},
      {mes: 'Abril ', valor: 81, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(75, 192, 192)', anchoBorde: 1},
      {mes: 'Mayo', valor: 56, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(54, 162, 235)', anchoBorde: 1},
      {mes: 'Junio', valor: 55, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(153, 102, 255)', anchoBorde: 1},
      {mes: 'Julio', valor: 40, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(255, 99, 132)', anchoBorde: 1},
      {mes: 'Agosto', valor: 45, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(255, 159, 64)', anchoBorde: 1},
      {mes: 'Septiembre', valor: 30, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(255, 205, 86)', anchoBorde: 1},
      {mes: 'Octubre ', valor: 38, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(75, 192, 192)', anchoBorde: 1},
      {mes: 'Noviembre', valor: 60, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(54, 162, 235)', anchoBorde: 1},
      {mes: 'Diciembre', valor: 76, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(153, 102, 255)', anchoBorde: 1},
    ];

    const data2 = [
      {mes: 'Enero', valor: 65, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(255, 99, 132)', anchoBorde: 1},
      {mes: 'Febrero', valor: 59, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(255, 159, 64)', anchoBorde: 1},
      {mes: 'Marzo', valor: 80, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(255, 205, 86)', anchoBorde: 1},
      {mes: 'Abril ', valor: 81, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(75, 192, 192)', anchoBorde: 1},
      {mes: 'Mayo', valor: 56, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(54, 162, 235)', anchoBorde: 1},
      {mes: 'Junio', valor: 55, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(153, 102, 255)', anchoBorde: 1},
      {mes: 'Julio', valor: 40, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(255, 99, 132)', anchoBorde: 1},
      {mes: 'Agosto', valor: 45, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(255, 159, 64)', anchoBorde: 1},
      {mes: 'Septiembre', valor: 30, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(255, 205, 86)', anchoBorde: 1},
      {mes: 'Octubre ', valor: 38, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(75, 192, 192)', anchoBorde: 1},
      {mes: 'Noviembre', valor: 60, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(54, 162, 235)', anchoBorde: 1},
      {mes: 'Diciembre', valor: 76, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(153, 102, 255)', anchoBorde: 1},
    ];*/

    // Supongamos que tienes un array de datos provenientes de la API llamado apiData
const apiData = [
  { empresa: 'A', datos: { mes: 'Enero', numMes: 1, valor: 65, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(255, 99, 132)', anchoBorde: 1 } },
  { empresa: 'A', datos: { mes: 'Febrero', numMes: 2, valor: 59, fondo: 'rgba(255, 99, 132, 0.2)', borde: 'rgb(255, 9, 132)', anchoBorde: 1 } },
  { empresa: 'C', datos: { mes: 'Febrero', numMes: 2, valor: 70, fondo: 'rgba(75, 192, 192, 0.2)', borde: 'rgb(75, 192, 192)', anchoBorde: 1 } },
  { empresa: 'B', datos: { mes: 'Febrero', numMes: 2, valor: 70, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(54, 162, 235)', anchoBorde: 1 } },
  { empresa: 'B', datos: { mes: 'Enero', numMes: 1, valor: 80, fondo: 'rgba(54, 162, 235, 0.2)', borde: 'rgb(54, 162, 235)', anchoBorde: 1 } },
  //{ empresa: 'C', datos: { mes: 'Enero', numMes: 1, valor: 50, fondo: 'rgba(75, 192, 192, 0.2)', borde: 'rgb(75, 192, 192)', anchoBorde: 1 } },
  // ... otros datos
];

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

// Itera sobre los datos de la API y organiza los datasets por empresa
apiData.forEach(row => {
  const { empresa, datos } = row;

  const adjustedNumMes = datos.numMes - 1;
  //Si no existe la creamos
  if (!datasetsByCompany[empresa]) {
    datasetsByCompany[empresa] = {
      label: 'Valores por meses de la Compañia ' +empresa,
      data: [],
      backgroundColor: [datos.fondo],
      borderColor: [datos.borde],
      borderWidth: 1
    };
  }

  datasetsByCompany[empresa].data[adjustedNumMes] = datos.valor;
  //datasetsByCompany[empresa].backgroundColor[adjustedNumMes] = datos.fondo;
  //datasetsByCompany[empresa].borderColor[adjustedNumMes] = datos.borde;


});

// Convierte el objeto a un array de datasets
const datasets = Object.values(datasetsByCompany);

  /************************************ OPCION 2 **********************/
    // Creamos la gráfica
    /*this.chart = new Chart("barChart", {
      type: 'bar' as ChartType, // tipo de la gráfica
      //data: {data}, // datos
      data: data,
      options: { // opciones de la gráfica
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });*/

    /************************************ OPCION 2 **********************/

    /*this.chart = new Chart("barChart", {
      type: 'bar' as ChartType, // tipo de la gráfica
      //data: {data}, // datos
      data: {
        labels: data.map(row => row.mes),
        datasets:[
          {
            label: 'Valores por meses de la Compañia A',
            data: data.map(row => row.valor),
            //backgroundColor: data.map(row => row.fondo),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            //borderColor: data.map(row => row.borde),
            borderColor: 'rgb(255, 99, 132)',
            //borderWidth: data.map(row => row.anchoBorde),
            borderWidth: 1
          },
          {
            label: 'Valores por meses de la Compañia B',
            data: data2.map(row => row.valor),
            //backgroundColor: data.map(row => row.fondo),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            //borderColor: data.map(row => row.borde),
            borderColor: 'rgb(54, 162, 235)',
            //borderWidth: data.map(row => row.anchoBorde),
            borderWidth: 1
          }
        ]
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
    });*/

    /********* OPCION 3 *****************************/
    this.chart = new Chart("barChart", {
      type: 'bar' as ChartType, // tipo de la gráfica
      //data: {data}, // datos
      data: {
        labels: apiData.map(row => row.datos.mes),
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