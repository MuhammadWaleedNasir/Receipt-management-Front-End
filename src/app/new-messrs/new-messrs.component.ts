import { Component, OnInit } from '@angular/core';
import { NewMessrsServiceService } from 'src/app/shared/new-messrs-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-messrs',
  templateUrl: './new-messrs.component.html',
  styleUrls: []
})

export class NewMessrsComponent implements OnInit {
  Form : FormGroup;
  submitted : boolean = false;
  MessrList : any = [];
  urlId : string;
  btnText: string;
  constructor(private service : NewMessrsServiceService,
              private fb:FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) { }

  get f() { return this.Form.controls; }
  
  ngOnInit() {
    this.initialiseInvites();

    this.route.params.subscribe(queryParams=>{
      this.StartMethod();
    });
  }

  initialiseInvites(){
    this.Form = this.fb.group({
      Id : [null],
      Name : ['', Validators.required],
      PhoneNo : ['',Validators.required]
    });   
  }

  StartMethod()
  {
    this.GetMessrs();
    this.urlId = this.route.snapshot.params.id;
    if(this.urlId == undefined)
    {        
      this.btnText = "Submit";
    }
    else{
      this.btnText = "Update";
    }
  }

  GetMessrs(){
    this.service.GetMessrs().subscribe(
      res => {
        if(res == null){
          this.toastr.warning('No messr found','Messr');
        }
        else{
          this.MessrList = res;
          if(this.urlId){  
            let filtered = this.MessrList.find((x: any) => x.Id == this.urlId);
            if (filtered) {
              this.Form = this.fb.group({
                Id : [filtered.Id],
                Name : [filtered.Name],
                PhoneNo : [filtered.PhoneNo]
              });
            }
          }
        }
      },
      err => {
        this.toastr.error('Failed to load messrs','Error');
      }
    );
  }

  onSubmit() {
    if(this.Form.invalid){
      this.submitted = true;
      return ;
    }
    if(this.urlId == undefined){  
      this.service.postMessr(this.Form.value).subscribe(
        res => {
          if(res == 0){
            this.toastr.warning('Messr already exists','Warning');
          }
          else{
            this.toastr.success('Messr registered successfully','Success');
            this.initialiseInvites();
            this.GetMessrs();
          }
        },
        err => { 
          this.toastr.error('Failed to register messr','Error');
        }
      );
    }
    else{
      this.service.UpdateMessr(this.Form.value).subscribe(
        res => {
          if(res == 0){
            this.toastr.warning('Messr already exists','Warning');
          }
          else{
            this.toastr.success('Messr updated successfully','Success');
            this.router.navigate(['/messr']);
          }
        },
        err => {
          this.toastr.error('Failed to update messr','Error');
        }
      );
    }
  }

  onDelete(Id: number) {
    if (confirm('Are you sure to delete this record ? ')) {
      this.service.DeleteMessr(Id).subscribe(
        res => {
          this.GetMessrs();
          this.toastr.success('Deleted successfully', 'Messr');
        },
        err => {
          this.toastr.error('Failed to delete Messr','Messr');
        })
    }
  }

}
