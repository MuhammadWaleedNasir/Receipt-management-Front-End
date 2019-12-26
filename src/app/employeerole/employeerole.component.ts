import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { EmployeeroleServiceService } from 'src/app/shared/employeerole-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employeerole',
  templateUrl: './employeerole.component.html',
  styleUrls: []
})
export class EmployeeroleComponent implements OnInit {
  Form : FormGroup;
  submitted:boolean = false;
  RoleList : any = [];
  constructor(private service:EmployeeroleServiceService,
              private fb:FormBuilder,
              private toastr: ToastrService) { }

  get f() { return this.Form.controls; }

  ngOnInit() {
    this.GetRoles();

    this.Form = this.fb.group({
      Role : ['', Validators.required]
    });
  }

  GetRoles(){
    this.service.GetRoles().subscribe(
      result => {
        this.RoleList = result;
      },
      error => {
        this.toastr.error('Failed to load employee roles','Employee Role');
      });
  }

  onSubmit() {
    if(this.Form.invalid){
      this.submitted = true;
      return ;
    }
    this.service.PostRole(this.Form.value).subscribe(
      res => {
        if(res == 0){
          this.toastr.warning('Employee role already exists','Employee Role');
        }
        else{
          this.toastr.success('Employee role created successfully','Employee Role');
          this.GetRoles();
        }   
      },
      err => {
          this.toastr.error('Failed to create new employee role','Employee Role');
      }
    );
  }

  onDelete(Id: number) {
    if (confirm('Are you sure to delete this record ? ')) {
      this.service.DeleteRole(Id).subscribe(
        res => {
          this.toastr.success('Role deleted successfully', 'Roles');
          this.GetRoles();     
        },
        err => {
          this.toastr.error('Failed to delete role','Roles');
        })
    }
  }

}
