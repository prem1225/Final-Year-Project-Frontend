import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  userData: any;
  ptData:any;
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
username:any;
role:string[]=[];
currentUser:any;
fullname:any;
email:any;
contact:any;
address:any;
age:any;
bloodG:any;
gender:any;
ptUsername:any;
profilePicLink:any;
retriveImage:any;
hasProfileImage:any;
selectedFile:any;
isSelectedFile:any;
deathDeclaredBy:any;
death:Boolean=false;
ptId:any;
diseaseStatus:any;
relatedBodyPart:any;
treatmentIn:any;
fileUploadedByDr:any;
description:any;
  constructor( private tokenService: TokenStorageService  ,private userService: UserService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  
this.currentUser=this.tokenService.getUser();
this.role=this.currentUser.role;
    this.value=this.activatedRoute.snapshot.params.id;
   
    if(this.value=="all-user"){
    this.userService.getAllPatients().subscribe(
      res => {
        this.userData = res;  
      }, err => {
        console.log(err);
      }

    );
  }

  else if(this.value=="active-patients"){
    this.ActivePatients();
  }
  else if(this.value=="inactive-patients"){
    this.InactivePatients();
 
  }else{
       this.userService.getAllPatients().subscribe(
      res => {
        
        this.userData = res;
        
      }, err => {
        console.log(err);
      }
    
      );
  }
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
deletePatient(id:any){
  this.userService.deletePatient(id).subscribe(
    res=> {
      this.responseFromServer=res;
      this.ngOnInit();
       
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
console.log(err);

    }
  );

}
findPatientByUsername(username:any){

  this.userService.findPatientByUsername(username).subscribe(
    res=>{
      console.log(res);
      if(res.active==false){
        this.death=true;
      }
      this.ptData=res;
      this.fullname=this.ptData.fullname;
      this.ptUsername=this.ptData.username;
      this.email=this.ptData.email;
      this.contact=this.ptData.contact;
      this.address=this.ptData.address;
      this.age=this.ptData.age;
      this.bloodG=this.ptData.bloodG;
      this.gender=this.ptData.gender;
      this.deathDeclaredBy=this.ptData.deathDeclaredBy;
      this.ptId=this.ptData.id;
      this.getPatientProfileInfo(this.ptId);
    }
  ,
  err=>{
console.log(err);
  });
}

getPatientProfileInfo(ptId:any){
  this.userService.getProfilePicture(ptId).subscribe(
   res =>{
     console.log(res);
     this.profilePicLink=res.fileDirectory;
     if(this.profilePicLink==null){
       this.hasProfileImage = false;
     }else{
      this.userService.downloadProfilePic(this.profilePicLink).subscribe(
        res =>{
          this.hasProfileImage = true;
         this.createImageFromBLOB(res);
        },
        err =>{
        console.log(err);
        }
      );
     }
    
   },
   err=>{
     this.profilePicLink = null;
     this.hasProfileImage = false;
     console.log(err);
   }

  );
}
selectFileHandler(event:any){
  this.selectedFile=event.target.files[0];
  this.isSelectedFile=true;
}
createImageFromBLOB(image:Blob){
  let reader=new FileReader();
  reader.addEventListener("load",()=>{
this.retriveImage=reader.result;
this.hasProfileImage = true;
  },false);
  if(image){
    reader.readAsDataURL(image);
  }
}

onSubmit(){
  
}


uploadPatientFile(ptId:any){
  const uploadProfileImage:FormData = new FormData();

  
  uploadProfileImage.append('file',this.selectedFile, this.selectedFile.name);

this.userService.uploadPatientReport(ptId,uploadProfileImage, this.relatedBodyPart, this.diseaseStatus, this.description, this.treatmentIn).subscribe(
  res=>
  {
console.log(res);
  },
  err=>{

  })
}
refresh(){
window.location.reload();
}


}
