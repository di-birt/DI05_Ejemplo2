import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { GestionNoticiasLeerService } from 'src/app/services/gestion-noticias-leer.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent  implements OnInit {
  @Input() noticia: Article = {} as Article;

  constructor(private gestionNoticiasLeer: GestionNoticiasLeerService, private alertController: AlertController) { }

  ngOnInit() {}

  onClick() {
    this.confirmarBorrar();  
  }

  async confirmarBorrar() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Borrar noticia?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.gestionNoticiasLeer.borrarNoticia(this.noticia);
          }
        }
      ]
    });

    await alert.present();
  }

}
