import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-reg',
  templateUrl: './patient-reg.component.html',
  styleUrls: ['./patient-reg.component.css']
})
export class PatientRegComponent implements OnInit {

  userData:any;
  p:number = 1;
  searchResult:any;
  popoverTitle:string="Are you sure you want Confirm Appointment?";
popoverMessage:string="You can not undo this operation";
cancelClicked=false;
value:any;
valueForAllUser:any;
deleted:Boolean=false;
responseFromServer:any;
admin:Boolean=false;
hospital:Boolean=false;
role:string[]=[];
currentUser:any;
messageFromServer:any;
  constructor( private tokenService: TokenStorageService  ,private userService: UserService, private activatedRoute:ActivatedRoute, private router:Router,
  private   snackBar:MatSnackBar) { }

  ngOnInit(): void {
  
this.currentUser=this.tokenService.getUser();
this.role=this.currentUser.role;
    this.value=this.activatedRoute.snapshot.params.id;
    this.userService.reqPatients().subscribe(
      res => {
        this.userData = res;
       
        
      }, err => {
        console.log(err);
      }

    );
  }
  appointPatient(id:any){
    this.userService.appointPatient(id).subscribe(
res=>{
  this.messageFromServer=res;
  if(this.messageFromServer="sucess"){
    this.snackBar.open("The patient is appointed sucessfully!!", 'Dismiss', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['success-snackBar'],
  });
 window.location.reload();
}},
err=>{
  console.log(err);
}
    );
  }
  cancleAppointPatient(id:any){
    this.userService.cancleAppointmentPatient(id).subscribe(
res=>{
this.messageFromServer=res;
  if(this.messageFromServer="sucess"){
    this.snackBar.open("The patient is appointed Cancled", 'Dismiss', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['success-snackBar'],
  });
 window.location.reload();
 alert(res);
 window.location.reload();
}},
err=>{
  console.log(err);
}
    );
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
deletePatient(id:any){
  this.userService.deletePatient(id).subscribe(
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
