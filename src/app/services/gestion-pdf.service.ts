import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionPdfService {

  constructor(private renderer: Renderer2) {}

  generarHTML(contenedor: HTMLElement | null) {
    const datosGrafica = this.generarGrafica();
    const datosTabla = this.generarTabla();
    const datosLista = this.generarLista();

    const graficaHTML = this.crearGraficaHTML(datosGrafica);
    const tablaHTML = this.crearTablaHTML(datosTabla, contenedor);
    const listaHTML = this.crearListaHTML(datosLista);

    return `${graficaHTML}${tablaHTML}${listaHTML}`;
  }

  private generarGrafica(): any {
    // Lógica para generar los datos de la gráfica
    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Series A',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
  }

  private generarTabla(): any[] {
    // Lógica para generar los datos de la tabla
    return [
      { nombre: 'Juan', edad: 30 },
      { nombre: 'María', edad: 25 },
      { nombre: 'Pedro', edad: 40 }
    ];
  }

  private generarLista(): any[] {
    // Lógica para generar los datos de la lista
    return [
      { nombre: 'Juan', edad: 30 },
      { nombre: 'María', edad: 25 },
      { nombre: 'Pedro', edad: 40 }
    ];
  }

  private crearGraficaHTML(datos: any): string {
    // Lógica para crear el HTML de la gráfica
    return '<div>Gráfica HTML</div>';
  }

  private crearTablaHTML(datos: any[], contenedor: HTMLElement | null) {
    // Crear elementos de la tabla
    const tabla = this.renderer.createElement('table');
    this.renderer.addClass(tabla, 'mi-tabla');

    // Cabecera de la tabla
    const thead = this.renderer.createElement('thead');
    const trHead = this.renderer.createElement('tr');
    for (const key in datos[0]) {
      const th = this.renderer.createElement('th');
      const text = this.renderer.createText(key);
      this.renderer.appendChild(th, text);
      this.renderer.appendChild(trHead, th);
    }
    this.renderer.appendChild(thead, trHead);
    this.renderer.appendChild(tabla, thead);

    // Cuerpo de la tabla
    const tbody = this.renderer.createElement('tbody');
    datos.forEach(fila => {
      const trBody = this.renderer.createElement('tr');
      for (const key in fila) {
        const td = this.renderer.createElement('td');
        const text = this.renderer.createText(fila[key]);
        this.renderer.appendChild(td, text);
        this.renderer.appendChild(trBody, td);
      }
      this.renderer.appendChild(tbody, trBody);
    });
    this.renderer.appendChild(tabla, tbody);

    // Agregar la tabla al contenedor
    this.renderer.appendChild(contenedor, tabla);
  }

  /*private crearTablaHTML(datos: any[]): string {
    if (datos.length === 0) {
      return ''; // Si no hay datos, no se crea ninguna tabla
    }
  
    let tablaHTML = "<table [ngClass]='mi-tabla'>";
  
    // Cabecera de la tabla
    tablaHTML += '<thead><tr>';
    for (const key in datos[0]) {
      tablaHTML += `<th>${key}</th>`;
    }
    tablaHTML += '</tr></thead>';
  
    // Filas de la tabla
    tablaHTML += '<tbody>';
    datos.forEach(fila => {
      tablaHTML += '<tr>';
      for (const key in fila) {
        tablaHTML += `<td>${fila[key]}</td>`;
      }
      tablaHTML += '</tr>';
    });
    tablaHTML += '</tbody>';
  
    tablaHTML += '</table>';
  
    return tablaHTML;
  }*/

  private crearListaHTML(datos: any[]): string {
    // Lógica para crear el HTML de la lista
    return '<div>Lista HTML</div>';
  }
}
