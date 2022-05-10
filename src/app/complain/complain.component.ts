import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {
details:any;
p:number = 1;
messageFromServer:any;
complainList:any;
complainDetail:any;
dcomplain:any;
scomplain:any;
mcomplain:any;
ucomplain:any;
ccomplain:any;
cid:any;
actionComplain:any;
show:Boolean=false;
popoverTitle:string="Are you sure you want to delete this complain?";
popoverMessage:string="You can not undo this operation after you confirm to delete.";
cancelClicked=false;
  constructor(private userService:UserService, router:Router,private snackBar:MatSnackBar) { }
  
  ngOnInit(): void {
    this.viewComplain();
  }

  key:string='id';
  reverse:boolean=false;
  sort(key:string){
  this.key=key;
  this.reverse= !this.reverse;
 
}
viewComplain(){
 this.userService.showComplain().subscribe(
    res=>{
    this.complainList=res;
   if(this.complainList.status!="pending"){
     this.show=true;
   }
    },
    err=>{
      console.log(err);
    });
}

findComplainById(id:any)
{
  this.userService.getDetailComplain(id).subscribe(
    res=>{
      this.complainDetail=res[0];
      this.dcomplain=this.complainDetail.dateofComplain;
     this.scomplain=this.complainDetail.issueSubject;
     this.mcomplain=this.complainDetail.issueDetail;
     this.ucomplain=this.complainDetail.user;
     this.ccomplain=this.complainDetail.status;
     this.cid=id;
    },
    err=>{
      console.log(err);
    }
  );
}
respondToComplain(){
}
complainHandler(event:any,id:any){
  this.actionComplain=event.target.value;
  this.userService.responseComplain(this.cid,this.actionComplain).subscribe(
    res=>{
      this.messageFromServer=res;
      if(this.messageFromServer="RespondedSucessfully"){
        this.snackBar.open("Complain status has been sent sucessfully", 'Dismiss', {
          duration: 1000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success-snackBar'],
      });
       
          }
          else{
            alert("Unable to change status of complain");
          }
        },
          err=>{
console.log(err);
          }
        );
      }

sendComplainResponse(id:any){
this.userService.sendResponseToComplain(id).subscribe(
  res=>{
    this.messageFromServer=res;
    if(this.messageFromServer="sucessfully"){
      this.snackBar.open("Response has been sent sucessfully", 'Dismiss', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['success-snackBar'],
    });
  }
}
  ,
  err=>{
console.log(err);
  }
);
}
deleteComplain(id:any){
  this.userService.DeleteComplain(id).subscribe(
    res=>{
      this.messageFromServer=res;
      console.log(res);
      if(this.messageFromServer="Deleted"){
        alert("The complain has been deleted Sucessfully!!");
      }
      else{
        alert("The complain is stil responded so unable to delete");
      }
    }
  );
}
}
