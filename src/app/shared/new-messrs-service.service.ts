import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewMessrsServiceService {
  readonly rootUrl = 'http://localhost:56315/api/receipt';
  constructor(private http:HttpClient) { }

  GetMessrs () {
    return this.http.get(`${this.rootUrl}/messr`);
  }
  
  postMessr(formData){
    return this.http.post(`${this.rootUrl}/messr`,formData);
  }

  UpdateMessr(formData){
    return this.http.put(`${this.rootUrl}/messr`,formData);
  }

  DeleteMessr(Id : any){
    return this.http.delete(`${this.rootUrl}/messr/`+Id);
  }
}
