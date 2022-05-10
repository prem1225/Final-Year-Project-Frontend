import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

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
doctorsList:any;
drsid:any[]=[];
noOfDoctor:any=0;
fullname:any;
doctorsWorking:any[]=[];
drId:any;
doctorId:any;
msg:any;
doctoridp:any;
constructor( private tokenService: TokenStorageService  ,private userService: UserService, private activatedRoute:ActivatedRoute, private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  
this.currentUser=this.tokenService.getUser();
this.role=this.currentUser.role;
    this.value=this.activatedRoute.snapshot.params.id;
    this.getWorkingDoctorList();

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
    this.getWorkingDoctorList();
  }
  else{
this.doctorsWorking=this.doctorsWorking.filter((res:any)=>
  {
    console.log(res);
    if(res.username.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase())){
      return res.username.toLocaleLowerCase().match(this.searchResult.toLocaleLowerCase());
    }
    if(res.specialist==(this.searchResult)){
      return res.specialist==(this.searchResult);
    }
    
  }
  
  );

  }
}
RemoveDoctor(id:any){
  this.userService.RemoveDoctor(id).subscribe(
    res=> {
      this.responseFromServer=res;
      if(this.responseFromServer="Deleted"){  
      alert("The user is deleted");
     this.router.navigate(['/doctor'])
      }
      else{
        alert("Not Deleted");
      }
    });
  }
  addDoctor(){
    this.userService.addDoctor(this.doctorId).subscribe(
      res=>{
        console.log(res);
        if(res.message=="DoctorAdded"){
          this.msg="The doctor has been added sucessfully";
        this.snackBar.open(this.msg, 'Dismiss', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success-snackBar'],
        });
        window.location.reload();
      }
      },
      err=>{
console.log(err);
      }
    );

  }
  updateClicked(id:number){
    console.log(id);
  }

  getWorkingDoctorList(){
    this.userService.getDoctorsListByHospital(this.currentUser.id).subscribe(
      res=>{
        this.doctorsWorking = res;
      //   this.doctorsList=res;
      //   console.log(res);
      //  for (let index = 0; index < this.doctorsList.length; index++) {
      //    this.drsid = this.doctorsList[index];
      
      //   this.userService.getDoctorById(this.drsid).subscribe(
      //     (doctorDetail:any)=>{
      //       this.doctorsWorking[index] = doctorDetail;
      //       this.doctoridp=this.doctorsWorking[index].id;
      //       console.log(doctorDetail);
   
      //     },err=>{
      //           console.log(err);
      //     });
        
      //   }
      },err=>{
            console.log(err);
      }
    );
  }
}
