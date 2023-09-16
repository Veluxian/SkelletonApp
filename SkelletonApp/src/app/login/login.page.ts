import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login={
    Usuario:"",
    Contrasena:("")
  }
  field:string="";

  constructor(public toastController: ToastController, private router:Router) { }

  ngOnInit() {
  }

  ingresar(){
    
    if(this.validateModel(this.login)){
      let navigationExtras:NavigationExtras = {
        state: {usuario:this.login.Usuario}
      };
      this.presentToast("bienvenido");
      this.router.navigate(['/home'], navigationExtras);
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
