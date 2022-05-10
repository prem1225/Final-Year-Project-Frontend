import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  username:any;
  subject:any;
  mail:any;

  constructor(private userService:UserService,private router:Router, private snackBar:MatSnackBar) {}

  ngOnInit(): void {}


  sendInfo(){
    this.userService.sendInfo(this.username,this.subject,this.mail).subscribe(
      (res:any)=>{
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['success-snackBar'],
        });
      },
      err =>{
    console.log("i am from error");
      }
    );
    }
}
  


