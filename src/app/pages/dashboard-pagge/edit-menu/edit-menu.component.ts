import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Burgers } from 'src/app/shared/models/Burgers';
import { Complements } from 'src/app/shared/models/Complements';
import { Menus } from 'src/app/shared/models/Menu';
import { BurgerService } from 'src/app/shared/services/burger/burger.service';
import { ComplementServiceService } from 'src/app/shared/services/complement-service/complement-service.service';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute, private menuService:MenuService,private burgerService: BurgerService,private complementService: ComplementServiceService,private toats: NgToastService) { }
  menu : Menus = {
    name: '',
    code: '',
    status: false,
    price: 0,
    cookingTime: '',
    burger: undefined,
    complements: []
  };
  burgers : Burgers[] = [];
  complements : Complements[] = [];
  nom?: string;
  prix?: number = 0;
  time?: string;
  etat?: string;
  burger?: Burgers;
  description?: string;
  complementsSelect?: Complements[];
  ngOnInit(): any {
      let id=this.route.snapshot.params["id"];

      this.burgerService.getBurgers().subscribe(data => {
        this.burgers = data;
      });
      this.complementService.getComplements().subscribe(data => {
        this.complements = data;

      });
      this.menuService.getMenuById(id).subscribe(
        (data)=>{



          if(data.name == "gatoError"){
             this.router.navigateByUrl(`/menus`);
          }
          let menu=data;
          this.menu=menu;
          this.nom = menu.name;
          this.prix = menu.price;
          this.time = menu.cookingTime;
          this.burger = menu.burger;
          this.complementsSelect = menu.complements;
          this.description = menu.description;

        }
      )


      console.log(id);

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

  editMenu(){

  }

}
