import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';



@NgModule({
  declarations: [
    NoticiaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoticiaComponent
  ]
})
export class ComponentsModule { }
