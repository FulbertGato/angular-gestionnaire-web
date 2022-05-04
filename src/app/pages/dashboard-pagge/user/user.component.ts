import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Gestionnaires } from 'src/app/shared/models/Gestionnaire';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private toats: NgToastService, private authService:AuthService) { }
  gestionnaires:Gestionnaires[]=[]
  isEdit: boolean = false;
  nom?:string;
  prenom?:string;
  password?:string;
  email?:string;
  idToUpdate?: number;


  ngOnInit(): void {
    this.loadGestionnaires();
  }

  loadGestionnaires(){
    this.authService.getAllGestionnaires().subscribe(
      data => {
        this.gestionnaires=data;
      }  );

    }

    editGestionnaire(gestionnaire:Gestionnaires){
      this.isEdit=true;
      this.idToUpdate=gestionnaire.id;
      this.nom=gestionnaire.nom;
      this.prenom=gestionnaire.prenom;
      this.email=gestionnaire.email;


    }

    deleteGestionnaire(gestionnaire:Gestionnaires){

      this.authService.deleteGestionnaire(gestionnaire.id).subscribe(
        data => {
          this.loadGestionnaires();
          this.toats.success({detail: 'Gestionnaire supprimé',summary:'Vous venez de supprimer '+gestionnaire.nom+' de la liste',duration:5000});
        }
      )

    }

    addGestionnaire(){

      if (this.nom != "" && this.nom != undefined && this.prenom != "" && this.prenom != undefined && this.password != "" && this.password != undefined && this.email != "" && this.email != undefined) {
        let gestionnaire: Gestionnaires= {
          "nom": this.nom,
          "prenom": this.prenom,
          "email": this.email,
          "password": this.password,
        }
        this.authService.addGestionnaire(gestionnaire).subscribe(
          data => {
            this.loadGestionnaires();
            this.toats.success({detail: 'Gestionnaire ajouté',summary:'Vous venez d\'ajouter '+data.nom+' a la liste',duration:5000});
            this.restForm();
          }
        )
      }


    }
    updateGestionnaire(){

      if (this.nom != "" && this.nom != undefined && this.prenom != "" && this.prenom != undefined && this.password != "" && this.password != undefined && this.email != "" && this.email != undefined) {
        let gestionnaire: Gestionnaires= {
          "id": this.idToUpdate,
          "nom": this.nom,
          "prenom": this.prenom,
          "email": this.email,
          "password": this.password,
        }
        this.authService.updateGestionnaire(gestionnaire).subscribe(
          data => {
            this.loadGestionnaires();
            this.toats.success({detail: 'Gestionnaire modifié',summary:'Vous venez de modifier '+data.nom+' dans la liste',duration:5000});
            this.restForm();
          }
        )
      }

    }

    restForm(){
      this.nom="";
      this.prenom="";
      this.password="";
      this.email="";
      this.idToUpdate=undefined;
      this.isEdit=false;
    }
}
