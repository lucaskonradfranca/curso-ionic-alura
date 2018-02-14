//import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

import { Agendamento } from "./agendamento";
import { AgendamentoDao } from "./agendamento-dao";
import { HttpModule } from "@angular/http/src/http_module";
import { Http } from "@angular/http";

@Injectable()
export class AgendamentoService {
    constructor(private _http: Http,
                private _dao: AgendamentoDao) {

    }

    private _montaURI(agendamento: Agendamento){
        return `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
    }

    agenda(agendamento: Agendamento) {
        let api = this._montaURI(agendamento);
        
        return this._dao.agendamentoDuplicado(agendamento)
            .then( existe => {
                if(existe) throw new Error('Agendamento já existe.')
                return this._http
                    .get(api)
                    .toPromise()
                    .then( () => agendamento.confirmado = true, err => console.log(err))
                    .then( () => this._dao.salva(agendamento))
                    .then( () => agendamento.confirmado);
            });
    }

    reagenda(agendamento: Agendamento){
        let api = this._montaURI(agendamento);
    
        return this._http
            .get(api)
            .toPromise()
            .then( () => agendamento.confirmado = true, err => console.log(err))
            .then( () => this._dao.salva(agendamento))
            .then( () => agendamento.confirmado);
    }
}