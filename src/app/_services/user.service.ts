import { Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';
import { analyzeAndValidateNgModules, identifierModuleUrl } from '@angular/compiler';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;boundary="file"'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  currentUSer:any;
  msg:any;

  constructor(public http:HttpClient,private token: TokenStorageService) { }

  ngOnInit():void{
     this.currentUSer= this.token.getUser();
   
   // this.currentUser= this.token.getToken();
   
  }


getTime():Observable<any>{

  return this.http.get(environment.apiurl+'count/time',{responseType:'json'});
}
getUsers():Observable<any>{

  return this.http.get(environment.apiurl + 'admin/users', httpOptions);
}

update(id:number):Observable<any>{
  return this.http.put(environment.apiurl + 'admin/update/'+ id, {responseType:'json'});
}
admineInfoByid(id:number):Observable<any>{
  return this.http.get(environment.apiurl+'admin/findUserInfoByid/'+id , {responseType:'json'});
}
hospitalInfoByid(id:number):Observable<any>{
  return this.http.get(environment.apiurl+'hospital/getInfo/'+id , {responseType:'json'});
}
generateOTP(username:any,email:any,Contact:any):Observable<any>{
return this.http.post(environment.apiurl+'forgetpassword/recover/'+username,{email:email,contact:Contact},{responseType:'json'});
}
validateOTP(username:any,otpnum:any):Observable<any>{
  return this.http.post(environment.apiurl+'forgetpassword/validateOTP/'+username+'?OTPnum='+otpnum,{responseType:'json'});
}
getProfilePicture(userid:any):Observable<any>{
return this.http.get(environment.apiurl+'profile/getProfilePicDetail/'+userid,{responseType:'json'})
}
downloadProfilePic(fileDirectory:any):Observable<any>{

  return this.http.get(fileDirectory,{responseType:'blob'})
}

sendInfo(username:any,sub:any,message:any):Observable<any>{

  return this.http.post(environment.apiurl+'admin/sendMail/'+username,{subject:sub,mail:message},{responseType:'json'});
}
senddashboardMessage(dashboardMessage:any):Observable<any>{
  return this.http.post(environment.apiurl+'admin/pushMessage',{message:dashboardMessage},{responseType:'json'});
}
displayMessage():Observable<any>{
  return this.http.get(environment.apiurl+'profile/getInfo',{responseType:'json'});
}
deletePost(postId:any):Observable<any>{
  return this.http.delete(environment.apiurl+'admin/deletePost/'+postId,{responseType:'json'});
}
addProfilePic(username:any,profile:FormData):Observable<any>{

  return this.http.post(environment.apiurl+'profile/upload/'+username,profile,{
    reportProgress:true,
  observe:'events'});
}
changeProfilePic(id:any,profile:FormData):Observable<any>{

  return this.http.put(environment.apiurl+'profile/updateProfilePicture/'+id,profile,{
    reportProgress:true,
  observe:'events'});
}
resetPasswordByAdmin(id:any,email:any):Observable<any>{
  return this.http.post(environment.apiurl+'admin/resetPassword/'+id,{email:email},{responseType:'json'});
}
signUp(username:any,password:any,email:any,contact:any,role:any[]){

  return this.http.post(environment.apiurl+'auth/signUp',{username:username,password:password,email:email,contact:contact,role:role},{responseType:'json'});

}
verifyMail(username:any,otpNum:any){

    return this.http.post(environment.apiurl+'auth/verifyemail/'+username+'?OTPnum='+otpNum,{responseType:'json'});
  }
  changePassword(username:any,newPassword:any,confirmPassword:any){

    return this.http.put(environment.apiurl+'forgetpassword/change/'+username,{newPassword:newPassword,confirmPassword:confirmPassword},{responseType:'json'});
  }
  deleteUser(id:any){
    return this.http.put(environment.apiurl+'admin/delete/'+id,{responseType:'json'} )
  }

  activeUsers():Observable<any>{
    return this.http.get(environment.apiurl+'admin/activeUsers',{responseType:'json'});
  }
  inactiveUsers():Observable<any>{
    return this.http.get(environment.apiurl+'admin/inactiveUsers',{responseType:'json'});
  }
  unverifiedUsers():Observable<any>{
    return this.http.get(environment.apiurl+'admin/unVerifiedeUsers',{responseType:'json'});
  }

  showComplain():Observable<any>{
    return this.http.get(environment.apiurl+'admin/getComplain',{responseType:'json'});
  }
  addComplain(Subject:any,details:any):Observable<any>{
    return this.http.post(environment.apiurl+'change/post/complain',{issueSubject:Subject,issueDetail:details},{responseType:'json'});
  }
  DeleteComplain(id:any):Observable<any>{
    return this.http.delete(environment.apiurl+'admin/deleteComplain/'+id,{responseType:'json'});
  }

  responseComplain(id:any,status:any):Observable<any>{
    return this.http.put(environment.apiurl+'admin/responseComplain/'+id,{status:status},{responseType:'json'});
  }
  sendResponseToComplain(id:any):Observable<any>{
    return this.http.post(environment.apiurl+'admin/sendResponseToComplain/'+id,{responseType:'json'});
  }
  getDetailComplain(id:any):Observable<any>{
    return this.http.get(environment.apiurl+'admin/findComplain/'+id,{responseType:'json'});
  }
  userCount():Observable<any>{
    return this.http.get(environment.apiurl+'count/users',{responseType:'json'});
  }
  getInfo(id:any):Observable<any>{
    return this.http.get(environment.apiurl+'profile/getProfilePicDetail/'+id,{responseType:'json'});
  }
  getHospitalProfile(username:any):Observable<any>{
    return this.http.get(environment.apiurl+'hospital/getInfo/'+username,{responseType:'json'});
  }
  getDoctorProfile(username:any):Observable<any>{
    return this.http.get(environment.apiurl+'doctors/getInfo/'+username,{responseType:'json'});
  }
  
  updateHospitalProfile(username:any,fullname:any,regNum:any,panNum:any,address:any,city:any,district:any,contact:any):Observable<any>{
    return this.http.put(environment.apiurl+'hospital/update/'+username,{hName:fullname,regNum:regNum,panNum:panNum,address:address,city:city,district:district,contact:contact},{responseType:'json'});
  }
  updateContact(newContact:any):Observable<any>{
    return this.http.put(environment.apiurl+'change/contact',{contact:newContact},{responseType:'json'});
  }
  updateMail( oldEmail:any, newEmail:any):Observable<any>{
    return this.http.put(environment.apiurl+'change/email',{oldEmail:oldEmail,newEmail:newEmail},{responseType:'json'});
  }
  updateMailOTP(newemail:any,otpNum:any):Observable<any>{
return this.http.put(environment.apiurl+'change/verifyemail/'+newemail+"?OTPnum="+otpNum,{responseType:'json'});
  }
    getAllDoctors():Observable<any>{
    return this.http.get(environment.apiurl+'hospital/getAllDoctor',{responseType:'json'});
  }
  getDoctorById(id:any):Observable<any>{
    return this.http.get(environment.apiurl+'patients/findDoctor/'+id,{responseType:'json'});
  }
  addDoctor(id:any):Observable<any>{

    return this.http.post(environment.apiurl+'hospital/addDoctor/'+id,{responseType:'json'} );
  }
  RemoveDoctor(id:any):Observable<any>{

    return this.http.delete(environment.apiurl+'hospital/delete/'+id,{responseType:'json'} );
  }
  UserInfo():Observable<any>{

    return this.http.get(environment.apiurl+'profile/info',{responseType:'json'} );
  }
  updateDoctorProfile(username:any,fullname:any,regNum:any,gender:any,specialist:any,contact:any):Observable<any>{
    return this.http.put(environment.apiurl+'doctors/update/'+username,{fullname:fullname,regnum:regNum,gender:gender,specialist:specialist,contact:contact},{responseType:'json'});
  }
getAllPatients():Observable<any>{
return this.http.get(environment.apiurl+'doctors/patients',{responseType:'json'});
}
deletePatient(id:any){
  return this.http.put(environment.apiurl+'doctors/closePatientFile/'+id,{responseType:'json'} )
}

activePatients():Observable<any>{
  return this.http.get(environment.apiurl+'doctors/activePatients',{responseType:'json'});
}
inactivePatients():Observable<any>{
  return this.http.get(environment.apiurl+'doctors/inactivePatients',{responseType:'json'});
}
reqPatients():Observable<any>{
  return this.http.get(environment.apiurl+'doctors/listOfPatientsToBeAppointed',{responseType:'json'});
}

appointedPatients():Observable<any>{
  return this.http.get(environment.apiurl+'doctors/listOfPatientsAppointed',{responseType:'json'});
}
clearPatientsList():Observable<any>{
  return this.http.delete(environment.apiurl+'doctors/clearList',{responseType:'json'});
}
appointPatient(id:any):Observable<any>{
  return this.http.put(environment.apiurl+'doctors/appointPatient/'+id,{responseType:'json'});
}
cancleAppointmentPatient(id:any):Observable<any>{
  return this.http.put(environment.apiurl+'doctors/canclePatientAppoint/'+id,{responseType:'json'});
}
findPatientByUsername(username:any):Observable<any>{
  return this.http.get(environment.apiurl+'doctors/searchPatient/'+username,{responseType:'json'});
}

uploadPatientReport(ptId:any,file:FormData, relatedBodyPart:any, diseaseStatus:any, description:any,treatmentIn:any):Observable<any>{
  return this.http.post(environment.apiurl+'doctors/addFile/'+ptId+"/"+relatedBodyPart+"/"+diseaseStatus+"/"+description+"/"+treatmentIn,file,
   {reportProgress:true,
    observe:'events'});
  
  
}
fillProfileHospital(id:any):Observable<any>{
  return this.http.post(environment.apiurl+'admin/sendResponseToComplain/'+id,{responseType:'json'});
}

fillProfileDoctor(id:any, fullname:any,username:any,regnum:any,contact:any,address:any,specialist:any,gender:any,email:any):Observable<any>{
  return this.http.post(environment.apiurl+'doctors/fillProfile',{ID:id,fullname:fullname,username:username,regnum:regnum,contact:contact,address:address,specialist:specialist,gender:gender,email:email},{responseType:'json'});
}

getDoctorsListByHospital(hospitalId:any):Observable<any>{
  return this.http.get(environment.apiurl + "patients/findDoctorByHospital/"+hospitalId, {responseType:"json"});
}

getPatientsFile(patientUsername:any):Observable<any>{
  return this.http.get(environment.apiurl + "profile/patientFile/"+patientUsername, {responseType:"json"});
}
LoadPatientPicture(fileDirectory:any):Observable<any>{
  return this.http.get(fileDirectory, {responseType:"blob"});
}

}

