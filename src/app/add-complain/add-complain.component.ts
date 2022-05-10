import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-add-complain',
  templateUrl: './add-complain.component.html',
  styleUrls: ['./add-complain.component.css']
})
export class AddComplainComponent implements OnInit {

  id:any;
subject:any;
details:any;
p:number = 1;
messageFromServer:any;
complainInfo:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  addComplain(){
  
  this.userService.addComplain(this.subject,this.details).subscribe(
    res=>{
      // console.log(res);
      this.messageFromServer=res.message;
      if(this.messageFromServer=="Sucess"){
        alert("Complain has been submitted");
        window.location.reload();
      }
      else{
        console.log("Error");
      }
    },
    err=>{
      alert(err);
    }
  );
  }
}
