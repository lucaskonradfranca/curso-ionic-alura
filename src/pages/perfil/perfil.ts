import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../domain/usuario/usuario-service';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage implements OnInit{

  public url: string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public camera: Camera,
              private _service: UsuarioService) {}

  ngOnInit(){
    this._service.obtemAvatar();
  }

  tiraFoto(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    })
      .then(url => {
        this._service.guardaAvatar(url);
        this.url = url;
      }).catch(err => {console.log(err)});

  }

  get usuarioLogado(){
    return this._service.obtemUsuarioLogado();
  }

}
