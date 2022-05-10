import {​​​​​​​​ Component, OnInit }​​​​​​​​ from'@angular/core';
import {​​​​​​​​ Router }​​​​​​​​ from'@angular/router';

import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';

 
@Component({​​​​​​​​
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 
}​​​​​​​​)
export class AppComponent implements OnInit {​​​​​​​​
private roles:string[]=[];
  isLoggedIn =false;
  showAdminBoard =false;
  showHospital = false;
  showDoctor = false;
 
 
  username:any;
  user:any;
role:string[]=[];
adminInfo:any;
admin:boolean=false;
profilePicLink:any;
retriveImage:any;
daysArray:any[]=['Sunday','Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'];
private date=new Date();
hour:any;
hourFinal:any;
 minutes:any;
 seconds:any;
 ampm:any;
 day:any;
 status:any;

popoverTitle:string="Are you sure you want to delete?";
popoverMessage:string="You can not undo this operation after you confirm to delete.";
cancelClicked=false;

constructor(private tokenStorageService:TokenStorageService, private userService:UserService,private router:Router) {​​​​​​​​ }​​​​​​​​
 
ngOnInit():void {​​​​​​​​

  
if(this.tokenStorageService.getToken()!=null){​​​​​​​​
this.isLoggedIn=true;
   }​​​​​​​​

 
if (this.isLoggedIn==true) {​​​​​​​​
this.user=this.tokenStorageService.getUser();


 
this.roles=this.user.roles;


if(this.roles.includes('ROLE_ADMIN')){​​​​​​​​
this.showAdminBoard=true;
this.showHospital = false;
this.showDoctor=false;
this.getProfileInfo();
      }​​​​​​​​
      else if(this.roles.includes('ROLE_HOSPITAL')){
        this.showHospital = true;
        this.showAdminBoard = false;
        this.showDoctor=false;
        this.getProfileInfo();
      }
      else if(this.roles.includes('ROLE_DOCTOR')){
        this.showHospital = false;
        this.showAdminBoard = false;
        this.showDoctor=true;
        this.getProfileInfo();
      }
this.username=this.user.username;
    }​​​​​​​​else{​​​​​​​​
this.router.navigate(['/login']);
    }​​​​​​​​
    
    setInterval(()=>{
      const date=new Date();
      this.updateDate(date);
    }, 1000);
  }​​​​​​​​
 
private updateDate(date:Date){

const hour=date.getHours();
 this.hour=hour;
this.ampm=this.hour>12? 'PM':'AM';
this.hour=this.hour % 12;
this.hour= this.hour<10?'0'+this.hour:this.hour;
this.hour=this.hour ? this.hour:12;
const minutes=date.getMinutes();
this.minutes=minutes<10? '0'+ minutes:minutes.toString();
const seconds=date.getSeconds();
this.seconds=seconds<10?'0'+seconds:seconds.toString();
}

logOut():void {​​​​​​​​
this.tokenStorageService.signOut();
this.router.navigate(['/login']);
//window.location.reload();


  }​​​​​​​​

  
getProfileInfo(){

  this.userService.getProfilePicture(this.user.id).subscribe(
   res =>{
     console.log(res);
     this.profilePicLink=res.fileDirectory;
     this.userService.downloadProfilePic(this.profilePicLink).subscribe(
       res =>{
        this.createImageFromBLOB(res);
       },
       err =>{
console.log(err);
       }
     )
   },
   err=>{
     console.log(err);
   }

  )
}
createImageFromBLOB(image:any){
  let reader=new FileReader();
  reader.addEventListener("load",()=>{
this.retriveImage=reader.result;
  },false);
  if(image){
    reader.readAsDataURL(image);
  }
}
 

}​​​​​​​​

