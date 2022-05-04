import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gestionnaires } from 'src/app/shared/models/Gestionnaire';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  gestionnaire:Gestionnaires | null = {};
  constructor(private route:ActivatedRoute,private authServ:AuthService,
    private  router:Router) { }

  ngOnInit(): void {
    let gestionnaire = this.authServ.getUserStorage();
    if(! gestionnaire){
      this.router.navigateByUrl("/login");
    }
    this.gestionnaire = gestionnaire;
  }

  signOut(){
    this.authServ.logout();
    this.router.navigateByUrl("/login");
  }


}
