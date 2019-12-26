import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmployeeroleServiceService {
  readonly rootUrl = 'http://localhost:56315/api/employee';
  constructor(private http:HttpClient) { }

  GetRoles() {
    return this.http.get(`${this.rootUrl}/roles`);
  }
  
  PostRole(formData){
    return this.http.post(`${this.rootUrl}/roles`,formData);
  }

  DeleteRole(Id : any){
    return this.http.delete(`${this.rootUrl}/roles/`+Id);
  }

  GetEmployee(){
    return this.http.get(`${this.rootUrl}/employee`);
  }

  PostEmployee(formData){
    return this.http.post(`${this.rootUrl}/employee`,formData);
  }

  UpdateEmployee(formData){
    return this.http.put(`${this.rootUrl}/employee`,formData);
  }

  DeleteEmployee(Id : any){
    return this.http.delete(`${this.rootUrl}/employee/`+Id);
  }
}
