import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gestionnaires } from 'src/app/shared/models/Gestionnaire';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'app-dashboard-pagge',
  templateUrl: './dashboard-pagge.component.html',
  styleUrls: ['./dashboard-pagge.component.css']
})
export class DashboardPaggeComponent implements OnInit {

  constructor(private route:ActivatedRoute,private authServ:AuthService,
     private  router:Router) { }
  
  public gestionnaire:Gestionnaires | null = {};
  ngOnInit(): void {
    let gestionnaire = this.authServ.getUserStorage();
    if(! gestionnaire){
      this.router.navigateByUrl("/login");
    }
    this.gestionnaire = gestionnaire;
  }

}
