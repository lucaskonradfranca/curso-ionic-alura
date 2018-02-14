import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgendamentoDao } from '../../domain/agendamento/agendamento-dao';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
//import { AlertController } from 'ionic-angular/components/alert/alert';

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage {

  public agendamentos: Agendamento[];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private _dao: AgendamentoDao,
              private _service: AgendamentoService) {

    this._dao.listaTodos()
      .then(agendamentos => {
        this.agendamentos = agendamentos;
      });


  }

  reenvia(agendamento: Agendamento){
    this._service
      .reagenda(agendamento)
      .then(confirmado => {
        if (confirmado){
          this.alertCtrl.create({
            title: "Envio",
            subTitle: "Agendamento reenviado com sucesso.",
            buttons: [{text: "OK"}]
          }).present();
        }else{
          this.alertCtrl.create({
            title: "Envio",
            subTitle: "Não foi possível reenviar o agendamento. Tente novamente.",
            buttons: [{text: "OK"}]
          }).present();
        }
      });
  }

}
