import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { BarChartComponent } from 'src/app/components/bar-chart/bar-chart.component';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    //Añadimos los path para los componentes
    children:[
      { path: 'bar-chart', component: BarChartComponent },
      { path: 'line-chart', component: LineChartComponent },
      { path: 'pie-chart', component: PieChartComponent },
      { path: '', pathMatch: 'full', redirectTo: 'bar-chart' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
