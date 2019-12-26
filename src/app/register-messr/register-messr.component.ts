import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerateReceiptService } from 'src/app/shared/generate-receipt.service';

@Component({
  selector: 'app-register-messr',
  templateUrl: './register-messr.component.html',
  styleUrls: []
})
export class RegisterMessrComponent implements OnInit {
  Form : FormGroup;
  urlId : string;
  btnText: string;
  submitted : boolean = false;
  RegisterMessrList : any = [];

  constructor(private receiptService : GenerateReceiptService,
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
    this.GetRegisterMessrs();
    this.urlId = this.route.snapshot.params.id;
    if(this.urlId == undefined)
    {        
      this.btnText = "Submit";
    }
    else{
      this.btnText = "Update";
    }
  }

  GetRegisterMessrs(){
    this.receiptService.GetRegisterMessr().subscribe(
      res => {
        if(res == null){
          this.toastr.warning('No register messr found','Warning');
        }
        else{
          this.RegisterMessrList = res;
          if(this.urlId){  
            let filtered = this.RegisterMessrList.find((x: any) => x.Id == this.urlId);
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
        this.toastr.error('Failed to load register messrs','Error');
      }
    );
  }

  onSubmit(){
    if(this.Form.invalid){
      this.submitted = true;
      return ;
    }
    if(this.urlId == undefined){
      debugger;  
      this.receiptService.PostRegisterMessr(this.Form.value).subscribe(
        res => {
          if(res == 0){
            debugger;
            this.toastr.warning('Register Messr already exists','Warning');
          }
          else{
            this.toastr.success('Register Messr registered successfully','Success');
            this.initialiseInvites();
          }
        },
        err => { 
          debugger;
          this.toastr.error('Failed to create register messr','Error');
        }
      );
    }
    else{
      debugger;
      this.receiptService.UpdateRegisterMessr(this.Form.value).subscribe(
        res => {
          if(res == 0){
            this.toastr.warning('Register Messr already exists','Warning');
          }
          else{
            this.toastr.success('Register Messr updated successfully','Success');
            this.router.navigate(['/registermessr']);
          }
        },
        err => {
          this.toastr.error('Failed to update register messr','Error');
        }
      );
    }
  }

  onDelete(Id: number) {
    if (confirm('Are you sure to delete this record ? ')) {
      this.receiptService.DeleteRegisterMessr(Id).subscribe(
        res => {
          this.GetRegisterMessrs();
          this.toastr.success('Deleted successfully', 'Success');
        },
        err => {
          this.toastr.error('Failed to delete Register Messr','Error');
        })
    }
  }

}
