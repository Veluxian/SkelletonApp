import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login:any={
    Usuario:"",
    Contrasena:""
  }
  field:string="";

  constructor(public toastController: ToastController) { }

  ngOnInit() {
  }

  ingresar(){
    if(this.validateModel(this.login)){
      this.presentToast("bienvenido");
    }
    else{
      this.presentToast("falta: " + this.field);
    }
  }

  validateModel(model:any){
    for (var [key, value] of Object.entries(model)){
      if(value == ""){
        this.field=key;
        return false;
      }
    }
    return true;
  }
  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration: 2000
      }
    );
    toast.present();
  }
}
