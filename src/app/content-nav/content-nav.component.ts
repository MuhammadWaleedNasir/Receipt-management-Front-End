import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../shared/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-nav',
  templateUrl: './content-nav.component.html',
  styleUrls: ['./content-nav.component.css']
})
export class ContentNavComponent implements OnInit {

  constructor(private service : AuthServiceService,
              private router: Router) { }

  ngOnInit() {
    
  }

  logout(){
    localStorage.removeItem('access-token');
    this.service.isLoggedInActive(false);
    this.router.navigate(['/login']);
  }
}
