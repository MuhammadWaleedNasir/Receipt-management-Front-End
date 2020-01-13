import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HouseaddressService {
  readonly rootUrl = 'https://localhost:44355/api/file';
  constructor(private http: HttpClient) { }

  GetHouseNo(id : any) {
    let url = id == undefined ? `${this.rootUrl}/houseno` : `${this.rootUrl}/houseno/${id}`
    return this.http.get(url);
  }

  PostHouseNo(formData) {
    return this.http.post(`${this.rootUrl}/houseno`, formData);
  }

  UpdateHouseNo(formData) {
    return this.http.put(`${this.rootUrl}/houseno`, formData);
  }

}
