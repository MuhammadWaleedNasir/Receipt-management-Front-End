import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {
  readonly rootUrl = 'https://localhost:44355/api/file';
  // https://localhost:44355/swagger/index.html
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
