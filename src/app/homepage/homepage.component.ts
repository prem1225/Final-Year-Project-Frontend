import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  userNum:any;
  constructor(private route:Router, private userService:UserService) { }

  ngOnInit(): void {
  }
  
  userCount(){
    this.userService.userCount().subscribe(
      res=>{
        this.userNum=res;
        console.log(this.userNum);
      },
      err=>{
        console.log(err);
      }
    );
  }
  }

