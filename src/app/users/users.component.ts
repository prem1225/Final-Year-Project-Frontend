import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userData: any;
  p:number = 1;
  searchResult:any;
  popoverTitle:string="Are you sure you want to delete?";
popoverMessage:string="You can not undo this operation after you confirm to delete.";
cancelClicked=false;
value:any;
valueForAllUser:any;
deleted:Boolean=false;
responseFromServer:any;
admin:Boolean=false;
hospital:Boolean=false;
role:string[]=[];
currentUser:any;
  constructor( private tokenService: TokenStorageService  ,private userService: UserService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  
this.currentUser=this.tokenService.getUser();
this.role=this.currentUser.role;
    this.value=this.activatedRoute.snapshot.params.id;
   
    if(this.value=="all-user"){
    this.userService.getUsers().subscribe(
      res => {
        
        this.userData = res;
        console.log(this.userData);
        
      }, err => {
        console.log(err);
      }

    );
  }

  else if(this.value=="active-user"){
    this.ActiveUSers();
  }
  else if(this.value=="inactive-user"){
    this.InactiveUSers();
  }
  else if(this.value=="unverified-user"){
this.unverifiedUSers();
  }else{
       this.userService.getUsers().subscribe(
      res => {
        
        this.userData = res;
        
      }, err => {
        console.log(err);
      }
    
      );
  }
  }


  

  update(id:number){
    this.userService.update(id).subscribe(
      res =>{
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
  }
  key:string='id';
  reverse:boolean=false;
  sort(key:string){
  this.key=key;
  this.reverse= !this.reverse;
  }
search(){

  if(this.searchResult==""){
    this.ngOnInit();
  }
  else{
this.userData=this.userData.filter((res:any)=>
  {
    console.log(res);
    if(res.username.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
      return res.username.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
    }
    if(res.userID==(this.searchResult)){
      return res.userID==(this.searchResult);
    }
    if(res.email.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
      return res.email.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
    }
    if(res.contact==(this.searchResult)){
      return res.contact==(this.searchResult);
    }
  }
  
  );

  }
}
deleteUser(id:any){
  this.userService.deleteUser(id).subscribe(
    res=> {
      this.responseFromServer=res;
      if(this.responseFromServer="Deleted"){  
      alert("The user is deleted");
     this.router.navigate(['/user'])
      }
      else{
        alert("Not Deleted");
      }

    },
    err=>{
      console.log(err);
    }
  );
  
}

ActiveUSers(){

  this.userService.activeUsers().subscribe(
    res=>{
      this.userData=res;
console.log(res);

    },
    err=>{


    }
  );

}
InactiveUSers(){
this.deleted=true;
  this.userService.inactiveUsers().subscribe(
    res=>{
      this.userData=res;
console.log(res);

    },
    err=>{


    }
  );

}
unverifiedUSers(){

  this.userService.unverifiedUsers().subscribe(
    res=>{
      this.userData=res;
console.log(res);

    },
    err=>{


    }
  );


  }
}
