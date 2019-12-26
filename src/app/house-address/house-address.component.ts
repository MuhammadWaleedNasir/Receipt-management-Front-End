import { Component, OnInit } from '@angular/core';
import { SectorsService } from '../shared/sectors.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseaddressService } from '../shared/houseaddress.service';

@Component({
  selector: 'app-house-address',
  templateUrl: './house-address.component.html',
  styleUrls: []
})
export class HouseAddressComponent implements OnInit {
  Form: FormGroup;
  SectorList: any = [];
  HouseList : any = [];
  submitted: boolean = false;
  urlId : string;
  Id : number;
  btnText: string;
  
  constructor(private service: SectorsService,
              private houseservice : HouseaddressService, 
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

  initialiseInvites() {
    this.Form = this.fb.group({
      HouseId : [0],
      HouseNo: ['',Validators.required],
      SectorID : ['',Validators.required]
    });
  }

  StartMethod()
  {
    this.GetSectors();
    this.GetHouseList();
    this.urlId = this.route.snapshot.params.id;
    if(this.urlId == undefined)
    {        
      this.btnText = "Submit";
    }
    else{
      this.btnText = "Update";
    }
  }

  GetSectors() {
    this.service.GetSectors().subscribe(
      result => {
        this.SectorList = result;
      },
      error => {
        this.toastr.error('Failed to load Sectors','House Address');
      });
  }

  GetHouseList(Id? : number) {
    this.houseservice.GetHouseNo(Id).subscribe(
      result => {
        this.HouseList = result;
        if(this.urlId)
        {
          let filtered = this.HouseList.find((x: any) => x.HouseId == this.urlId);
          if (filtered) {
            this.Form = this.fb.group({
              HouseId: [filtered.HouseId],
              HouseNo: [filtered.HouseNo],
              SectorID : [filtered.SectorID]
            });
          }  
        }
      },
      error => {
        this.toastr.error('Failed to load House Addresses','House Address');
      });      
  }

  onSubmit() {
    if (this.Form.invalid) {
      this.submitted = true;
      return;
    }
    if(this.urlId == undefined)
    {
      this.houseservice.PostHouseNo(this.Form.value).subscribe(
        res => {
          if(res == 0)
          {
            this.toastr.warning('House No already exists', 'House Address');
          }
          else
          {
            this.toastr.success('House No Added successfully', 'House Address');
            this.initialiseInvites();
            this.GetHouseList();
          }
        },
        err => {
          this.toastr.error('Failed to create new House No','House Address');
        }
      );
    }
    else{
      this.houseservice.UpdateHouseNo(this.Form.value).subscribe(
        res => {
          if(res == 0)
          {
            this.toastr.warning('House No already exists', 'House Address');
          }
          else
          {
            this.toastr.success('House No Updated successfully', 'House Address');
            this.router.navigate(['/houseAddress']);
          }          
        },
        err => {
          this.toastr.error('Failed to update House No','House Address');
        }
      );
    }
  }

}
