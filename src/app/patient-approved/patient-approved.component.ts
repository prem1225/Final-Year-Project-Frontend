import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-patient-approved',
  templateUrl: './patient-approved.component.html',
  styleUrls: ['./patient-approved.component.css']
})
export class PatientApprovedComponent implements OnInit {

  userData:any;
  p:number = 1;
  searchResult:any;
  popoverTitle:string="Are you sure you want to clean list??";
popoverMessage:string="You can not undo this operation.";
cancelClicked=false;
value:any;
valueForAllUser:any;
deleted:Boolean=false;
responseFromServer:any;
admin:Boolean=false;
hospital:Boolean=false;
role:string[]=[];
currentUser:any;
btn_hide:Boolean=false;
  constructor( private tokenService: TokenStorageService  ,private userService: UserService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  
this.currentUser=this.tokenService.getUser();
this.role=this.currentUser.role;
    this.value=this.activatedRoute.snapshot.params.id;
    this.appointedPatient()
  }
  
  appointedPatient(){
    this.userService.appointedPatients().subscribe(
      res => {
        if(res==""){
         this.btn_hide=true;
        }
        else{
          this.btn_hide=false;
        }
        this.userData = res;
       
        
      }, err => {
        console.log(err);
      }

    );
  }



  updateClicked(id:number){
    console.log(id);
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
clearPatientList(){
  this.userService.clearPatientsList().subscribe(
    res=> {
      this.responseFromServer=res;
       
      alert(res);
     this.router.navigate(['/patients'])
      },
    err=>{
      console.log(err);
    }
  );
  
}

ActivePatients(){

  this.userService.activePatients().subscribe(
    res=>{
      this.userData=res;

    },
    err=>{


    }
  );

}
InactivePatients(){
this.deleted=true;
  this.userService.inactivePatients().subscribe(
    res=>{
      this.userData=res;


    },
    err=>{


    }
  );

}

}

