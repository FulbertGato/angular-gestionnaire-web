import { Component, OnInit } from '@angular/core';

import { Commandes } from 'src/app/shared/models/Commandes';
import { CommandeService } from 'src/app/shared/services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  commandes:Commandes[]=[]

  constructor(private commandeServ:CommandeService) { }

  ngOnInit(): void {
    this.commandeLoad();
  }

  commandeLoad(): void {
    this.commandeServ.getAllCommandes().subscribe(
      (data)=>{
        this.commandes=data;
      }
    )

  }

  getPending(status:string): void {

     let commandesList:Commandes[]  = [];
     this.commandes.filter(
      (commande)=>{
       if (commande.status==status){

          commandesList.push(commande);
       }
      }
    )
    console.log(commandesList);
    this.commandes=commandesList;
    commandesList=[];


  }



}
