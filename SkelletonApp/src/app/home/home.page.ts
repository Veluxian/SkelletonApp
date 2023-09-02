import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { createAnimation, Animation } from '@ionic/core';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  usuario:string="";
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
  
  constructor(public alertController:AlertController, private activeroute: ActivatedRoute, private router: Router, private animationCTRL: AnimationController) 
  {
    this.activeroute.paramMap.subscribe(params => {
      if (window.history.state.usuario) {
        this.usuario = window.history.state.usuario;
      }
    });
  }
  limpiar(){
    for(var [key,value] of Object.entries(this.data)){
      Object.defineProperty(this.data,key,{value:""})
    }
  }

  mostrar(){
    (this.data.nombre!="" && this.data.apellido!="") && 
    this.presentAlert("usuario", "Su nombre es " + this.data.nombre + " " + this.data.apellido);
  }
//animaciones
ionViewDidEnter(){
  this.animacionTitulo();
  this.animacionBoton();
}

animacionBoton(){
  const boton = document.querySelector('.botoncito');
  if(boton){
    const animacion:Animation = this.animationCTRL.create()
      .addElement(boton)
      .duration(1000)
      .keyframes([
        { offset: 0.1, transform:'transalteX(-5px)' },
        {offset: 0.2, transform:'transalteX(5px)' },
        {offset: 0.3, transform:'transalteX(-5px)' },
        {offset: 0.4, transform:'transalteX(5px)' },
      ])
  }
  else {
    console.log("elemento no encontrado")
  }
}
animacionTitulo(){
  const titulo = document.querySelector('#titulo');
  if(titulo) {
    const animation:Animation = this.animationCTRL.create()
      .addElement(titulo)
      .duration(2500)
      .iterations(Infinity)
      // .keyframes([
      //   { offset: 0, transform: 'translateX(0px)' },
      //   { offset: 0.5, transform: 'translateX(50px)' }, 
      //   { offset: 1, transform: 'translateX(0px)' }, 
      // ])
      .fromTo('transform', 'translateX(-50px)', 'translateX(100px)')
    animation.play();
  }
  else{
    console.log("elemento no encontrado")
  }

}

  /*
  Falta utilizar los diferentes tipos de eventos del ciclo de vida 
  ngOnInit(){} Esta se ejecuta una vez durante la inicializacion del componente
  ionViewWillEnter()[] Cuando el enrutamiento de los componentes esta a punto de animarse a la vista
  ionViewDidEnter(){} cuando el enrutamiento ha terminado de animarse etapa lista para usar
  ionViewWillLeave(){} Cuando el enrutamiento esta a punto de animarse pero para sacar la visual(page)
  ionViewDidLeave(){} cuando el page o el component se ha retirado totalmente de la visial
  ngOnDestroy(){} se ejecuta justo antes de que angular destruya la vista, util para limpieza u observables
  */
  async presentAlert(titulo:string, message:string){
    const alert= await this.alertController.create({
      header: titulo,
      message: message,
      buttons: ['Listo']
    });

    await alert.present();
  }
  
}
