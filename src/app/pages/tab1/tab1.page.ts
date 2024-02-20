import { environment } from 'src/environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GestionApiService } from 'src/app/services/gestion-api.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  /* En el html, añadimos el atributo #container al div padre (será una id única), para luego poder gestionar todo lo que hay dentro de este div.
   * @ViewChield('container'), busca el atributo #container
   * Añadimos !, para decirle que el valor no será ni null ni undefined. En caso contrarío tendríamos que comprobar que if(this.container) antes de 
   * realizar this.container.nativeElement.
   */
  @ViewChild('container') container!: ElementRef;

  constructor() {}

  ngOnInit() {
  }

  generarPDF() {
    //Ancho en px de A4
    const anchoMax = 794;
    //Alto en px de A4
    const altoMax = 1123;
    const doc = new jsPDF({
      orientation: 'portrait', //Orientación normal
      unit: 'px', //En este caso como unidades utilizamos px, pero podríamos poner cm,mm,em,pt,...
      //mm -> [210, 297] para A4
      format: [anchoMax,altoMax]
    });
    // Agregar el contenido HTML al PDF
    const content = this.container.nativeElement.querySelector('.dashboard-content') as HTMLElement;

    content.style.maxWidth = anchoMax+"px";
    //const content = document.getElementById('container') as HTMLElement;
    doc.html(content, {
      callback: (pdf) => {
        // Guardar el PDF o mostrarlo en el navegador
        pdf.save('Dashboard.pdf');
        content.style.maxWidth = "100%";
      }
    });
  }
}
