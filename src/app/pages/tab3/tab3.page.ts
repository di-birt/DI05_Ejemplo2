import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  tipoDeChartSeleccionado: String = "bar-chart";

  constructor(private router: Router) {}

  ngOnInit() {
    // Seleccionar por defecto el valor 'bar-chart'
    this.router.navigate(['/tabs/graficos', 'bar-chart']);
  }

  segmentChanged(event: any) {
    this.router.navigate(['/tabs/graficos', event.detail.value]);
    this.tipoDeChartSeleccionado = event.detail.value;
  }
}
