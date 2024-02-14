import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss'],
})
export class TablasComponent  implements OnInit {

  @ViewChild('tablaContainer', { static: true }) tablaElement: ElementRef | undefined;
  @Input() datosTabla: any[] = [];
  constructor() { }

  ngOnInit() {}

  getColumnas(fila: any): string[] {
    return Object.keys(fila);
  }

  getHtmlContent(): Promise<string> {
    //return document.querySelector('app-tablas')?.innerHTML;
    //const tablaElement: HTMLElement = document.querySelector('app-tablas') as HTMLElement;
    //return tablaElement;

    if(this.tablaElement){
      const tabla = this.tablaElement.nativeElement;

      // Captura el contenido de la tabla como una imagen utilizando html2canvas
      return html2canvas(tabla).then(canvas => {
        // Convierte el canvas a una imagen en formato base64
        return canvas.toDataURL('image/png');
      });
    } else {
      return Promise.resolve("Error creando la tabla");
    }
    //return base64Image;
  }
}
