import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import{ NgToastService} from 'ng-angular-popup';
import { Commandes } from 'src/app/shared/models/Commandes';
import { CommandeService } from 'src/app/shared/services/commande.service';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.css']
})
export class DetailCommandeComponent implements OnInit {

  commande?:Commandes;

  constructor(private router:Router,private route:ActivatedRoute,private commandeServ:CommandeService,private toats: NgToastService) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params["id"];
    this.commandeServ.getCommandeById(id).subscribe(
      (data)=>{
        this.commande=data;
      }
    )

  }

  cancelCommande(){

    if(this.commande?.status=="en attente"){

      this.commandeServ.updateCommandeStatus(this.commande.id,"ANNULER").subscribe(
        (data)=>{
          this.toats.success({detail: 'commande annuler',summary:'Modification reussi',duration:5000});

          this.commande=data;
        }
      )



    }else{
      this.toats.error({detail: 'commande deja effectuer',summary:'Modification impossible',duration:5000});
    }




  }
  confirmCommande(){

    if(this.commande?.status=="en attente"){

      this.commandeServ.updateCommandeStatus(this.commande.id,"CONFIRMER").subscribe(
        (data)=>{
          this.toats.success({detail: 'commande Confirmer',summary:'Modification reussi',duration:5000});

          this.commande=data;
        }
      )



    }else{
      this.toats.error({detail: 'commande deja traité',summary:'Modification impossible',duration:5000});
    }
}
readyCommande(){

    if(this.commande?.status=="CONFIRMER"){

      this.commandeServ.updateCommandeStatus(this.commande.id,"PRET").subscribe(
        (data)=>{
          this.toats.success({detail: 'commande pret pour recuperation',summary:'Modification reussi',duration:5000});

          this.commande=data;
        }
      )



    }else{
      this.toats.error({detail: 'commande deja traité',summary:'Modification impossible',duration:5000});
    }
}
closeCommande(){

    if(this.commande?.status=="PRET"){

      this.commandeServ.updateCommandeStatus(this.commande.id,"TERMINER").subscribe(
        (data)=>{
          this.toats.success({detail: 'commande Terminez',summary:'Modification reussi',duration:5000});

          this.commande=data;
        }
      )



    }else{
      this.toats.error({detail: 'commande deja traité',summary:'Modification impossible',duration:5000});
    }
}

}

