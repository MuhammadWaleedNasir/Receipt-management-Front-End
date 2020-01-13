import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateReceiptService {
  readonly rootUrl = 'https://localhost:44355/api/receipt';
  
  constructor(private http : HttpClient) { }

  GetReceipt(id){
    return this.http.get(`${this.rootUrl}/receipt/`+id);
  }

  PostReceipt(formData){
    return this.http.post(`${this.rootUrl}/receipt`,formData);
  }

  UpdateReceipt(formData){
    return this.http.put(`${this.rootUrl}/receipt`,formData);
  }

  GetRegisterMessr(){
    return this.http.get(`${this.rootUrl}/registermessr`);
  }

  PostRegisterMessr(formData){
    return this.http.post(`${this.rootUrl}/registermessr`,formData);
  }

  UpdateRegisterMessr(formData){
    return this.http.put(`${this.rootUrl}/registermessr`,formData);
  }

  DeleteRegisterMessr(id){
    return this.http.delete(`${this.rootUrl}/registermessr/`+id);
  }
}
