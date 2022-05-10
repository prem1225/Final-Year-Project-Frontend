import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit {

dashboardMsg:any;
postedDate:any;
finalmsg:any;
currentUser:any;
show:Boolean=false;
role:any;
responseFromServer:any;
popoverTitle:string="Are you sure you want to delete?";
popoverMessage:string="You can not undo this operation after you confirm to delete.";
cancelClicked=false;

  constructor(private userService:UserService, private tokenStorageService:TokenStorageService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser=this.tokenStorageService.getUser();
   this.role=this.currentUser.roles;
   if(this.role.includes="ROLE_ADMIN"){
this.show=true;
   }
   else{
     this.show=false;
   }
    this.userService.displayMessage().subscribe(
      res=>{
        console.log(res);
        this.finalmsg=res;
         this.dashboardMsg=res.message;
         this.postedDate=res.postedDate;
        console.log(res);
      },err=>{
console.log(err);
      }

    );
  }
  deletePost(id:any){
    this.userService.deletePost(id).subscribe(
      res=>{
this.responseFromServer=res.message();
if(this.responseFromServer=="The post has been delete sucessfully!!"){
window.location.reload();
console.log("Deleted");
      }
else{
console.log("Not Deleted");
}
      },
      err=>{
console.log(err);
      }
    );
  }
  
  
  }

