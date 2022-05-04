import { Component, OnInit } from '@angular/core';
import { TypesComplements } from 'src/app/shared/models/TypesComplements';
import { TypeServiceService } from 'src/app/shared/services/types-service/type-service.service';
import{ NgToastService} from 'ng-angular-popup';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-type-complement',
  templateUrl: './type-complement.component.html',
  styleUrls: ['./type-complement.component.css']
})
export class TypeComplementComponent implements OnInit {

  constructor(private typeService: TypeServiceService, private toats: NgToastService,private fileUploadService: FileUploadService) { }
  title = 'Type de compléments';
  types: TypesComplements[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes : any = [7, 14, 28, 56];
  valideReq: boolean = false;
  nom : any | undefined;
  typeToUpdate : TypesComplements| any;

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file?: File; // Variable to store file
  image?: any;
  ngOnInit(): void {
    this.typeToUpdate = false;
    this.valideReq = false;
    this.TypeList();


  }
// On file Select
onChangeFile(event: any) {
  //this.file = event.target.files[0];
  console.log(event.target.files[0]);
  this.image = event.target.files;
  console.log(this.image);
  //this.file = event.target.files[0];
  //get the file by id

}



  TypeList() {
    this.typeService.getTypes().subscribe(data => {
      this.types = data;
    });
  }

  ajouterType() : void {
    if (this.nom != "" && this.nom != undefined) {

     // this.sendImageToServer(this.image);
     // console.log(this.shortLink)

      let type: TypesComplements  = {
        "name": this.nom,
        "image": this.nom,
      }
      console.log(type)


      this.typeService.addType(type).subscribe(data => {
        if (data.name != null  ) {
          this.toats.success({detail: 'Type ajouter',summary:'Vous venez d\'ajouter '+data.name+' a la liste',duration:5000});
          this.types.push(data);
          this.nom = "";
        }else{
          this.toats.error({detail: 'Error error',summary:'une erreur est survenue',duration:5000});
          this.valideReq = true;
        }

      });

    }else{
      this.toats.error({detail: 'Error error',summary:'une erreur est survenue',duration:5000});
      this.valideReq = true;
    }
  }

  annuler() : void {

  }

  deleteType(type : TypesComplements) : void {

    if(type.complements?.length == 0){

      this.typeService.deleteType(type).subscribe(data => {

        this.toats.success({detail: 'Type supprimer',summary:'Vous venez de la liste',duration:5000});
        this.types.splice(this.types.indexOf(type), 1);


    });

    }else{
      this.toats.error({detail: 'Suppression Impossible',summary:'Impossible de supprimer ce type ',duration:5000});

    }


  }

  updateTypeLoad(type : TypesComplements) : void {
    this.typeToUpdate = type;
    this.nom = type.name;

  }
  updateType(name:any,typeToUpdate:TypesComplements): void {
    if (this.nom != "" && this.nom != undefined) {
    typeToUpdate.name = name;
    this.typeService.updateType(typeToUpdate).subscribe(data => {
      this.typeToUpdate = false;
      this.toats.success({detail: 'type modifier',summary:'Modification reussi',duration:5000});
      this.nom = "";
    });
  }else{
    this.valideReq = true;
  }

  }

  onTableDataChange (event: any) {
    this.page = event;
    this.TypeList();

  }

  onTableSizeChange ( event : any ) : void {
    this.tableSize = event.target.value ;
    this.page = 1 ;
    this.TypeList();
  }

  sendImageToServer(image: File) : void {


    this.loading = !this.loading;

        this.fileUploadService.upload(this.image).subscribe(
          (data) => {

            this.shortLink = data.fullname

          }
        );
    }


  }




