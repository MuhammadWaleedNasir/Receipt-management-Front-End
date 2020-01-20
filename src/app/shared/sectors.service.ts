import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  readonly rootUrl = environment.baseUrl + 'file';

  constructor(private http:HttpClient) { }

  GetSectors () {
    return this.http.get(`${this.rootUrl}/sectors`);
  }

  PostSector(formData){
    return this.http.post(`${this.rootUrl}/sectors`,formData);
  }

  UpdateSector(formData){
    return this.http.put(`${this.rootUrl}/sectors`,formData);
  }

  DeleteSector(Id : any){
    return this.http.delete(`${this.rootUrl}/sectors/`+Id);
  }
}
