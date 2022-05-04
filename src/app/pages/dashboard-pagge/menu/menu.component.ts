import { Component, OnInit } from '@angular/core';
import { Menus } from 'src/app/shared/models/Menu';
import { MenuService } from 'src/app/shared/services/menu-service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private menuService:MenuService) { }

  menus: Menus[] = [];
  ngOnInit(): void {

    this.menuService.getMenus().subscribe(data => {
      this.menus = data;
    });
  }

}
