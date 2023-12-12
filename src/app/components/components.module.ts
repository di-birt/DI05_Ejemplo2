import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    NoticiaComponent, BarChartComponent, LineChartComponent, PieChartComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoticiaComponent, BarChartComponent, LineChartComponent, PieChartComponent
  ]
})
export class ComponentsModule { }
