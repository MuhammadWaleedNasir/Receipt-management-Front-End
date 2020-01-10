import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from './../shared/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Form : FormGroup;
  submitted:boolean = false;

  constructor(private service : AuthServiceService,
              private fb:FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute, 
              private router: Router) { }

  get f() { return this.Form.controls; }

  ngOnInit() {
    this.initialiseInvites();
  }

  refresh(url: string, reload?: boolean): void {
    setTimeout(() => {
      this.router.navigateByUrl(url, { skipLocationChange: false })
        .then(() => {
          if (reload) location.reload();
          // this.router.navigate([decodeURI(this._location.path())]);
        });
    }, 1500);
  }

  initialiseInvites(){
    this.Form = this.fb.group({
      userName : ['',Validators.required],
      password : ['',Validators.required]
    });
  }

  onSubmit() {
    if(this.Form.invalid){
      this.submitted = true;
      return ;
    }

    this.service.getAuthToken(this.Form.value)
    .subscribe((response: any) => {
      if (response && response.token) {
        this.service.isLoggedInActive(true);
        localStorage.setItem('access-token', JSON.stringify(response.token));
        //this.service.isNavActive;
        // this.router.navigate(['/receipt']);
        this.refresh('/receipt', true);
      }
      else{
        this.toastr.warning('Username or password is incorrect','Error');
      }
    }, (err) => {
      this.service.isLoggedInActive(false);

      alert('Error'+err);
    });
  }

}
