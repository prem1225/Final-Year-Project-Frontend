import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-push-message',
  templateUrl: './push-message.component.html',
  styleUrls: ['./push-message.component.css']
})
export class PushMessageComponent {



  msgInput:any;
  constructor(private userService:UserService, private router:Router, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    console.log("Hellom from push msg");
  }
PushMessage(){
this.userService.senddashboardMessage(this.msgInput)
.subscribe(
  res=>{
    this.snackBar.open(res.message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['success-snackBar'],
    });
    
    
  },
  err=>{

  }
);
}
}
