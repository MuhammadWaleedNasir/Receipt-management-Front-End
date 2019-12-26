import { Component, OnInit } from '@angular/core';
import { SectorsService } from 'src/app/shared/sectors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: []
})

export class SectorsComponent implements OnInit {
  Form: FormGroup;
  SectorList: any = [];
  submitted: boolean = false;
  Id: number;
  urlId : string;
  btnText: string;

  constructor(private service: SectorsService, 
              private fb: FormBuilder, 
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

  StartMethod()
  {
    this.urlId = this.route.snapshot.params.id;
    this.GetSectors();
    if(this.urlId == undefined)
    {        
      this.btnText = "Submit";
    }
    else{
      this.btnText = "Update";
    }
  }

  initialiseInvites() {
    this.Form = this.fb.group({
      Id : [0],
      SectorNo: ['',Validators.required]
    });
  }

  GetSectors() {
    this.service.GetSectors().subscribe(
      result => {
        this.SectorList = result;
        if(this.urlId)
        {    
          let filtered = this.SectorList.find((x: any) => x.Value === this.urlId);
          if (filtered) {
            this.Form = this.fb.group({
              Id: [filtered.Value],
              SectorNo: [filtered.Text]
            });
          }  
        }
      },
      error => {
        this.toastr.error('Failed to load Sectors','Sector');
      });
  }

  onSubmit() {
    if (this.Form.invalid) {
      this.submitted = true;
      return;
    }
    if(this.urlId == undefined)
    {
      this.service.PostSector(this.Form.value).subscribe(
        res => {
          if(res == 0)
          {
            this.toastr.warning('Sector already exists', 'Sector');
          }
          else
          {
            this.toastr.success('Sector Added successfully', 'Sector');
            this.initialiseInvites();
          }
        },
        err => {
          this.toastr.error('Failed to create new sector','Sector');
        }
      );
    }
    else{
      this.service.UpdateSector(this.Form.value).subscribe(
        res => {
          if(res == 0)
          {
            this.toastr.warning('Sector already exists', 'Sector');
          }
          else
          {
            this.toastr.success('Sector Updated successfully', 'Sector');
            this.router.navigate(['/sector']);
          }          
        },
        err => {
          this.toastr.error('Failed to update sector','Sector');
        }
      );
    }
  }

  onDelete(Id: number) {
    if (confirm('Are you sure to delete this record ? ')) {
      this.service.DeleteSector(Id).subscribe(
        res => {
          this.GetSectors();
          this.toastr.warning('Deleted Successfully', 'Sector');
        },
        err => {
          this.toastr.error('Failed to delete sector','Sector');
        })
    }
  }
  
}
