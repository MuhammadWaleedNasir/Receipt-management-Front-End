import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../shared/auth-service.service';
import { ContentNavComponent } from '../content-nav/content-nav.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: []

})
export class SidenavComponent implements OnInit {

  didVote: boolean = false;

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  emitterPaerntFunc($event: boolean) {
    this.didVote = !this.didVote;
  }
}
