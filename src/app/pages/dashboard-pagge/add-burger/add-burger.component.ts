import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Burgers } from 'src/app/shared/models/Burgers';
import { Complements } from 'src/app/shared/models/Complements';
import { BurgerService } from 'src/app/shared/services/burger/burger.service';
import { ComplementServiceService } from 'src/app/shared/services/complement-service/complement-service.service';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';

@Component({
  selector: 'app-add-burger',
  templateUrl: './add-burger.component.html',
  styleUrls: ['./add-burger.component.css']
})
export class AddBurgerComponent implements OnInit {

  constructor(private burgerService: BurgerService,private complementService: ComplementServiceService,private toats: NgToastService,private menuService:MenuService) { }
  burgers : Burgers[] = [];
  complements : Complements[] = [];
  nom?: string;
  prix?: number = 0;
  time?: string;
  etat?: string;
  burger?: Burgers;
  description?: string;
  complementsSelect?: Complements[];


  ngOnInit(): void {

    this.burgerService.getBurgers().subscribe(data => {
      this.burgers = data;

    });
    this.complementService.getComplements().subscribe(data => {
      this.complements = data;

    });
}

onSelectEtat($event: any) {
  let etat = $event.target.value;
  this.etat = etat;
  //console.log(this.etat);
}



clickedOptionComplement(){
  console.log(this.complementsSelect)
  this.getPriceMenu()
}

clickedOptionBurger(){
  console.log(this.burger)

  this.getPriceMenu()
}


getPriceMenu(){

  let price = 0;
  if(this.complementsSelect){
    this.complementsSelect.forEach(complement => {
      price += complement.price;
    });
  }
  let priceBurger = this.burger?.price;
  let toto:any =  priceBurger;
  this.prix = price + toto;
  this.time = this.burger?.cookingTime;
  console.log(this.prix);



}

addMenu(){

  if (this.nom != "" && this.nom != undefined && this.prix != null && this.etat != null, this.time != undefined, this.time != "") {
    let complementsId: any[] = [];
    if(this.complementsSelect){
      this.complementsSelect.forEach(complement => {
        complementsId.push(complement.id);
      });
    let menu: any= {
        "name": this.nom,
        "description" : this?.description,
        "status" : true,
        "burgerId" : this.burger?.id,
        "complementsId": complementsId,
        "image": "static/assets/food/5.JPG",
    }
    this.menuService.createMenu(menu).subscribe(
      data => {
        this.toats.success({detail: 'Menu ajouté',summary:'Vous venez de rajouter '+data.name+' dans la liste',duration:5000});
        this.restForm()

}
    )
  }



}
}

restForm() {
  this.nom= "";
  this.prix = undefined;
  this.time="";
  this.burger = undefined;
  this.description = "";
  this.complementsSelect  = undefined;
}

}
