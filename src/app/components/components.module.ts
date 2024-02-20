import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TablasComponent } from './tablas/tablas.component';



@NgModule({
  declarations: [
    BarChartComponent, LineChartComponent, PieChartComponent, TablasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BarChartComponent, LineChartComponent, PieChartComponent, TablasComponent
  ]
})
export class ComponentsModule { }
