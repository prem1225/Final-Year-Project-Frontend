import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-show-patient-file',
  templateUrl: './show-patient-file.component.html',
  styleUrls: ['./show-patient-file.component.css']
})
export class ShowPatientFileComponent implements OnInit {

  showPatientDetail:any;
  patientRepoetDetails:any;
  showHotelImage:boolean=false;
  fileDirectory:any;
  retrievedImage:any;
  collectionPatientFile:any;
  constructor(private userService:UserService, private activatedRouter:ActivatedRoute) { }

username:any;
value:any;

  ngOnInit(): void {
    this.username=this.activatedRouter.snapshot.paramMap.get("id");
      this.userService.getPatientsFile(this.username).subscribe(
        res=>{
          console.log(res);
          this.patientRepoetDetails=res;
          if(res.length == 0){
            this.showHotelImage = false;
          }else{
    
          for(let i =0; i< res.length; i++){
            this.fileDirectory = res[i].fileDirectory;
            if(this.fileDirectory!=null){
            this.userService.LoadPatientPicture(this.fileDirectory).subscribe(
             (res:Blob)=>{
                console.log(res);
              let reader=new FileReader();
              reader.addEventListener("load",()=>{
                this.retrievedImage=reader.result;
                this.collectionPatientFile[i] = this.retrievedImage;
                // this.showHotelImage=true;
              },
              false);
              if(res){
                reader.readAsDataURL(res);
              }
              },
              err=>{
                console.log(err);
              }
            );
              }
          }
        }
       
        },
        err=>{
          this.retrievedImage = null;
          console.log(err);
          this.showHotelImage=false;
        }
      
      );

  }


}
