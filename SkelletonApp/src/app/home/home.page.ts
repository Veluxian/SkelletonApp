import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario:String;
  niveles:any[]=[
    {id:1,nivel:"Media"},
    {id:2,nivel:"Tecnico"},
    {id:3,nivel:"Superior"}
  ]

  data:any={
    nombre:"",
    apellido:"",
    educacion:"",
    nacimiento:""
  };
  
  constructor(public alertController:AlertController) {}

  limpiar(){
    for(var [key,value] of Object.entries(this.data)){
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  mostrar(){
    (this.data.nombre!="" && this.data.apellido!="") && 
    this.presentAlert("usuario", "Su nombre es " + this.data.nombre + " " + this.data.apellido);
  }

  async presentAlert(titulo:string, message:string){
    const alert= await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['Listo']
    });

    await alert.present();
  }
}
