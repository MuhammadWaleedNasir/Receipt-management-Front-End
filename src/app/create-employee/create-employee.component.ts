import { Component, OnInit } from '@angular/core';
import { EmployeeroleServiceService } from 'src/app/shared/employeerole-service.service'
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: []
})
export class CreateEmployeeComponent implements OnInit {
  Form : FormGroup;
  submitted:boolean = false;
  RoleList : any = [];
  EmployeeList : any = [];
  paramId : number;
  btnText: string;

  constructor(private service: EmployeeroleServiceService,
              private fb:FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              public router: Router) { }

  get f() { return this.Form.controls; }
  
  ngOnInit() {
    this.initialiseInvites();

    this.route.params.subscribe(queryParams=>{
      this.StartMethod();
    });
    
  }

  initialiseInvites(){
    this.Form = this.fb.group({
      EmployeeId : [''],
      FullName : ['', Validators.required],
      UserName : ['',Validators.required],
      Password : ['',Validators.required],
      PhoneNo : ['',Validators.required],
      RoleID : ['',Validators.required]
    });
  }

  StartMethod()
  {
    this.GetRole();
    this.GetEmployee();
    this.paramId = this.route.snapshot.params.id;
    if(this.paramId == undefined)
    {        
      this.btnText = "Submit";
    }
    else{
      this.btnText = "Update";
    }
  }

  GetRole() {
    this.service.GetRoles().subscribe(
      result => {
        this.RoleList = result;
      },
      error => {
        this.toastr.error('Failed to load roles','Employee');
      });
  }

  GetEmployee(){
    this.service.GetEmployee().subscribe(
      result => {
        this.EmployeeList = result;
        if(this.paramId)
        {    
          let filtered = this.EmployeeList.find((x: any) => x.EmployeeId == this.paramId);
          if (filtered) {
            this.Form = this.fb.group({
              EmployeeId: [filtered.EmployeeId],
              FullName : [filtered.FullName],
              UserName : [filtered.Username],
              Password : [filtered.Password],
              PhoneNo : [filtered.PhoneNo],
              RoleID : [filtered.RoleId]
            });
          }  
        }
      },
      error => {
        this.toastr.error('Failed to load employees','Employee');
      });
  }

  onSubmit() {
    if(this.Form.invalid){
      this.submitted = true;
      return ;
    }
    if(this.paramId == undefined){
      this.service.PostEmployee(this.Form.value).subscribe(
        res => {
          if(res == 0){
            this.toastr.warning('Employee already exists','Employee');
          }
          else{
            this.toastr.success('Employee created successfully','Employee');
            this.initialiseInvites();
            this.GetEmployee();
          }        
        },
        err => { 
          this.toastr.error('failed to create an employee','Employee');
        }
      );
    }
    else{
      this.service.UpdateEmployee(this.Form.value).subscribe(
        res => {
          if(res == 0)
          {
            this.toastr.warning('Employee already exists', 'Employee');
          }
          else
          {
            this.toastr.success('Employee Updated successfully', 'Employee');
            this.router.navigate(['/employee']);
          }          
        },
        err => {
          this.toastr.error('Failed to update employee','Employee');
        }
      );
    }
      
  }

  onDelete(Id: number) {
    if (confirm('Are you sure to delete this employee ? ')) {
      this.service.DeleteEmployee(Id).subscribe(
        res => {
          this.toastr.success('Employee deleted successfully', 'Employee');
          this.GetRole();
          this.GetEmployee();   
        },
        err => {
          this.toastr.error('Failed to delete an employee','Employee');
        });
    }
  }

}