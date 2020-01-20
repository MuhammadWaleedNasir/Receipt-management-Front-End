import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthServiceService } from '../shared/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-content-nav',
  templateUrl: './content-nav.component.html',
  styleUrls: []
})
export class ContentNavComponent implements OnInit {

  @Output() paerntFunc: EventEmitter<boolean> = new EventEmitter<boolean>();

  didVote: boolean = false;

  constructor(private service: AuthServiceService,
    private router: Router) { }

  ngOnInit() {

  }

  logout() {
    localStorage.removeItem('access-token');
    this.service.isLoggedInActive(false);
    this.router.navigate(['/login']);
  }

  vote() {
    this.didVote = !this.didVote;
    this.paerntFunc.emit(this.didVote);
  }
}
