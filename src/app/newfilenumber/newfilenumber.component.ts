import { Component, OnInit } from '@angular/core';
import { NewfilenumberServiceService } from 'src/app/shared/newfilenumber-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newfilenumber',
  templateUrl: './newfilenumber.component.html',
  styleUrls: []
})
export class NewfilenumberComponent implements OnInit {
  Form : FormGroup;
  submitted : boolean = false;
  FileList : any = [];
  constructor(private service:NewfilenumberServiceService,
              private fb:FormBuilder,
              private toastr: ToastrService) { }
  
  get f() { return this.Form.controls; }

  ngOnInit() {
    this.GetFiles();

    this.Form = this.fb.group({
      FileNo : ['', Validators.required]
    });
  }
  
  GetFiles() {
    this.service.GetFileNumber().subscribe(
      result => {
        this.FileList = result;
      },
      error => {
        this.toastr.error('Failed to load file numbers','File');
      });
  }

  onSubmit() {
    if(this.Form.invalid){
      this.submitted = true;
      return ;
    }
      this.service.PostFileNumber(this.Form.value).subscribe(
        res => {    
          this.toastr.success('file created successfully','File');
          this.GetFiles();
        },
        err => { 
          this.toastr.error('Failed to create new file','File');
        }
      );
  }

  onDelete(Id: number) {
    if (confirm('Are you sure to delete this record ? ')) {
      debugger;
      this.service.DeleteFile(Id).subscribe(
        res => {
          this.GetFiles();
          this.toastr.success('File deleted successfully', 'File');
        },
        err => {
          this.toastr.error('Failed to delete file','File');
        })
    }
  }

}
