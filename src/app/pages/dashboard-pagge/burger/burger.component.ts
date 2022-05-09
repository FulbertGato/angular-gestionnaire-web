import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Burgers } from 'src/app/shared/models/Burgers';
import { BurgerService } from 'src/app/shared/services/burger/burger.service';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {

  constructor(private burgerService: BurgerService,private toats: NgToastService,private fileUploadService: FileUploadService) { }

  burgers : Burgers[] = []
  nom?: string;
  description?: string;
  time?: string;
  prix?: number;
  etat?: any;
  isEdit: boolean = false;
  idToUpdate?: number;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes : any = [7, 14, 28, 56];


  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file?: File; // Variable to store file
  image?: any;
  convertData: any;
  ngOnInit(): void {

    this.loadBurgers();

  }

  addBurger() {

      if (this.nom != "" && this.nom != undefined && this.description != "" && this.description != undefined && this.prix != null && this.etat != null, this.time != undefined, this.time != "") {

        let burger: any= {
          "time": this.time,
          "name": this.nom,
          "price": this.prix,
          "description": this.description,
          "status": this.etat,
          "image": "static/assets/food/3.JPG"
        }
        //console.log(burger);
        this.burgerService.addBurger(burger).subscribe(
          data => {
            this.loadBurgers();
            this.toats.success({detail: 'Burgerajouter',summary:'Vous venez d\'ajouter '+data.name+' a la liste',duration:5000});
            this.restForm();
          }
        )
      }
  }
  deleteBurger(burger:Burgers){
    this.burgerService.deleteBurger(burger).subscribe(
      data => {
        this.loadBurgers();
        this.toats.success({detail: 'Burger supprimé',summary:'Vous venez de supprimer '+burger.name+' de la liste',duration:5000});
      }
    )
  }
  updateBurger(){

    if (this.nom != "" && this.nom != undefined && this.description != "" && this.description != undefined && this.prix != null && this.etat != null, this.time != undefined, this.time != "") {
      let burger: any= {
        "id": this.idToUpdate,
        "time": this.time,
        "name": this.nom,
        "price": this.prix,
        "description": this.description,
        "status": this.etat,
      }
      this.burgerService.updateBurger(burger).subscribe(
        data => {
          this.loadBurgers();
          this.toats.success({detail: 'Burger modifié',summary:'Vous venez de modifier '+data.name+' dans la liste',duration:5000});
          this.restForm();
        }
      )
    }


  }
  editBurger(burger:Burgers){
    this.idToUpdate = burger.id;
    this.nom = burger.name;
    this.description = burger.description;
    this.prix = burger.price;
    this.etat = burger.status;
    this.isEdit = true;
    this.idToUpdate = burger.id;
    this.time = burger.cookingTime;
  }
  loadBurgers() {
    this.burgerService.getBurgers().subscribe(
      data => {
        this.burgers = data;
      }
    )
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


  onSubmit(){}

  restForm() {
    this.nom = "";
    this.description = "";
    this.prix = undefined;
    this.etat = null;
    this.isEdit = false;
    this.idToUpdate = undefined;
    this.time = undefined;
  }

  sendImageToServer(file:any) : void {


    this.loading = !this.loading;

       /* this.fileUploadService.upload(this.image).subscribe(
          (data: any) => {

            this.shortLink = data;


          }
        );*/
    }

    onChangeFile(event: any) {

      this.image = event.target.files[0];
      console.log(this.image);
      console.log(this.sendImageToServer(this.image));


    }


    onTableDataChange (event: any) {
      this.page = event;
      this.loadBurgers();

    }

    onTableSizeChange ( event : any ) : void {
      this.tableSize = event.target.value ;
      this.page = 1 ;
      this.loadBurgers();
    }

}
