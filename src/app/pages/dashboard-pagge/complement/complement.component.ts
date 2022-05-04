import { Component, OnInit } from '@angular/core';
import { Complements } from 'src/app/shared/models/Complements';
import { TypesComplements } from 'src/app/shared/models/TypesComplements';
import { ComplementServiceService } from 'src/app/shared/services/complement-service/complement-service.service';
import { TypeServiceService } from 'src/app/shared/services/types-service/type-service.service';
import{ NgToastService} from 'ng-angular-popup';
@Component({
  selector: 'app-complement',
  templateUrl: './complement.component.html',
  styleUrls: ['./complement.component.css']
})
export class ComplementComponent implements OnInit {

  constructor( private complementService: ComplementServiceService, private typesComplementService: TypeServiceService, private toats: NgToastService) { }
  complements: Complements[] = [];
  types: TypesComplements [] = [];
  nom?: string;
  description?: string;
  prix?: number;
  type?: TypesComplements;
  typeSelect?: TypesComplements;
  etat?: any;
  isEdit: boolean = false;
  idToUpdate?: number;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes : any = [7, 14, 28, 56];


  ngOnInit(): void {
    this.loadComplements();
    this.loadTypesComplements();

  }

  onSelectType($event: any) {
    let id = $event.target.value;
    this.typeSelect = this.types.find(type => type.id == id);
    console.log(this.type);
  }
  onSelectEtat($event: any) {
    let etat = $event.target.value;
    if (etat == "true") {
      this.etat = true;
    }else{
      this.etat = false;
    }
    //console.log(this.etat);
  }
  addComplement() {

    if (this.nom != "" && this.nom != undefined && this.description != "" && this.description != undefined && this.prix != null && this.type != null) {
      let complement: any= {
        "name": this.nom,
        "price": this.prix,
        "description": this.description,
        "status": this.etat,
        "typeId": this.typeSelect?.id,
      }
      this.complementService.addComplement(complement).subscribe(data => {
        if (data.name != null) {
          this.complements.push(data);
          this.toats.success({detail: 'Type ajouter',summary:'Vous venez d\'ajouter '+data.name+' a la liste',duration:5000});
          this.restForm()
        }
      })

    }



  }
  updateComplement() {

    if (this.nom != "" && this.nom != undefined && this.description != "" && this.description != undefined && this.prix != null && this.type != null) {
      let complement: any= {
        "id": this.idToUpdate,
        "name": this.nom,
        "price": this.prix,
        "description": this.description,
        "status": this.etat,
        "typeId": this.type.id,
      }
      this.complementService.updateComplement(complement).subscribe(data => {
          this.loadComplements();

          this.toats.success({detail: 'complement modifier',summary:'Modification reussi',duration:5000});
          this.restForm()

      })

    }

  }

  deleteComplement(complement: Complements) {
    this.complementService.deleteComplement(complement).subscribe(data => {

        this.complements.splice(this.complements.indexOf(complement), 1);
        this.toats.success({detail: 'Type ajouter',summary:'Vous venez d\'ajouter '+data.name+' a la liste',duration:5000});

    })
  }

  editComplement(complement: Complements) {
    this.idToUpdate = complement.id;
    this.nom = complement.name;
    this.description = complement.description;
    this.prix = complement.price;
    this.type = this.types.find(type => type.name == complement.typeComplementName);
    console.log(this.type);
    this.etat = complement.status;
    this.isEdit = true;
  }





  loadComplements() {
    this.complementService.getComplements().subscribe(data => {
      this.complements = data;
    });
  }

  loadTypesComplements() {
    this.typesComplementService.getTypes().subscribe(data => {
      this.types = data;
    });
  }
  restForm() {
    this.nom = "";
    this.description = "";
    this.prix = undefined;
    this.type = undefined;
    this.etat = null;
    this.isEdit = false;
  }

  onTableDataChange (event: any) {
    this.page = event;
    this.loadComplements();

  }

  onTableSizeChange ( event : any ) : void {
    this.tableSize = event.target.value ;
    this.page = 1 ;
    this.loadComplements();
  }

}
