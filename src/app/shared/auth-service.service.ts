import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  readonly rootUrl = environment.baseUrl + 'Auth';
  constructor(private http:HttpClient) { }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    var ret = this.loggedIn.asObservable(); // {2}
    return ret;
  }

  isLoggedInActive(status: boolean) {
    this.loggedIn.next(status);
  }

  get isNavActive(){
    var ret = this.loggedIn.next(true);
    return ret;
  }

  getAuthToken(formData): Observable<any> {
    debugger;
    var response = this.http.post(`${this.rootUrl}/token`,formData);
    debugger;
    if(response){
    
      return response;
    }
  }
}
