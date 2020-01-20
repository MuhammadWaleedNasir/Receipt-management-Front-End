import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseaddressService {
  readonly rootUrl = environment.baseUrl + 'file';
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
