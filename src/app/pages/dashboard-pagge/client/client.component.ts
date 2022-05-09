import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Clients } from 'src/app/shared/models/Clients';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  isEdit: boolean = false;
  nom?:string;
  prenom?:string;
  password?:string;
  email?:string;
  idToUpdate?: number;
  clients:Clients[]=[]
  constructor(private toats: NgToastService, private authService:AuthService) { }

  ngOnInit(): void {
    this.loadClient();
  }
  addClient() {}
  updateClient(){}
  editClient(client:Clients){}
  deleteClient(client:Clients){

    this.authService.deleteClient(client.id).subscribe(
      data => {
        this.loadClient();
        this.toats.success({detail: 'Gestionnaire supprimé',summary:'Vous venez de supprimer '+client.first_name+' de la liste',duration:5000});
      }
    )
  }

  loadClient(){
    this.authService.getAllclients().subscribe(
      data => {
        this.clients=data;
      }  );

    }


}
