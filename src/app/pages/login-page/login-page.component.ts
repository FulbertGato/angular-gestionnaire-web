import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gestionnaires } from 'src/app/shared/models/Gestionnaire';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  model:Gestionnaires={
    "email": "",
    "password": "",
  }
  page:string="";
  constructor(private route:ActivatedRoute, private authServ:AuthService,private  router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>this.page=params["page"]);
  }

  onFormSubmit(){
    this.authServ.getUserLoginAndPassword(this.model).subscribe(users=>{
      if(users){

          console.log(users);

          this.router.navigateByUrl("/dashboard");

      }

    })

  }

}
