import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewfilenumberServiceService {
  readonly rootUrl = environment.baseUrl + 'file';
  constructor(private http:HttpClient) { }

  GetFileNumber() {
    return this.http.get(`${this.rootUrl}/files`);
  }

  PostFileNumber(formData){
    return this.http.post(`${this.rootUrl}/files`,formData);
  }

  DeleteFile(Id : any){
    return this.http.delete(`${this.rootUrl}/files/`+Id);
  }
}
