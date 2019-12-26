import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateReceiptService } from '../shared/generate-receipt.service';
import { NewMessrsServiceService } from '../shared/new-messrs-service.service';
import { NewfilenumberServiceService } from '../shared/newfilenumber-service.service';
import { HouseaddressService } from '../shared/houseaddress.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorsService } from '../shared/sectors.service';

@Component({
  selector: 'app-generate-receipt',
  templateUrl: './generate-receipt.component.html',
  styleUrls: []
})
export class GenerateReceiptComponent implements OnInit {
  FileList: any = [];
  MessrsList: any = [];
  SectorList: any = [];
  HouseList: any = [];
  HouseListOrignal: any = [];

  Form: FormGroup;
  submitted: boolean = false;

  constructor(private service: GenerateReceiptService,
              private messrService: NewMessrsServiceService,
              private fileService: NewfilenumberServiceService,
              private houseService: HouseaddressService,
              private sectorService: SectorsService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) { }

  get f() { return this.Form.controls; }

  ngOnInit() {
    this.initialiseInvites();
    this.StartMethod();

  }

  initialiseInvites() {
     
    this.Form = this.fb.group({
      SNo: ['', Validators.required],
      FileID: ['', Validators.required],
      SectorID: ['', Validators.required],
      HouseID: [null, Validators.required],
      MessrsID: [null, Validators.required],
      Description: ['', Validators.required],
      ReceiptDate: [new Date(), Validators.required],
      CaseTotalCost: [null, Validators.required],
      Amount: [null],
      PaymentDate: [new Date().toString(), Validators.required]
    });
  }


  StartMethod() {
    this.GetFileNo();
    this.GetSectors();
    this.GetHouseList();
    this.GetMessrs();
  }

  GetFileNo() {
    this.fileService.GetFileNumber().subscribe(
      result => {
        this.FileList = result;
      },
      error => {
        this.toastr.error('Failed to load file numbers', 'Receipt');
      });
  }

  GetSectors() {
    this.sectorService.GetSectors().subscribe(
      result => {
        this.SectorList = result;
      },
      error => {
        this.toastr.error('Failed to load Sectors', 'Receipt');
      });
  }

  GetHouseList(Id?: number) {
    if (Id == undefined) {
      this.houseService.GetHouseNo(Id).subscribe(
        result => {
          this.HouseListOrignal = result;
        },
        error => {
          this.toastr.error('Failed to load House Addresses', 'Receipt');
        });
    }
    else {
      let filtered = this.HouseListOrignal.filter((x: any) => x.SectorID == Id);
      (filtered.length > 0) ? this.HouseList = filtered : this.HouseList = [];
    }

  }

  GetMessrs() {
    this.messrService.GetMessrs().subscribe(
      result => {
        this.MessrsList = result;
      },
      error => {
        this.toastr.error('Failed to load messrs', 'Receipt');
      });
  }

  onSubmit() {
    if (this.Form.invalid) {
      this.submitted = true;
      return;
    }

    if(this.Form.get('ReceiptDate').value != null){
      var dateVall = this.Form.get('ReceiptDate').value;
      var newDatee = dateVall.getDate() +'/' + (dateVall.getMonth()+1) + '/'+dateVall.getFullYear();
      this.Form.get('ReceiptDate').setValue(newDatee);
    }
    var advance = parseInt(this.Form.get('Amount').value);
    var totalAmount = parseInt(this.Form.get('CaseTotalCost').value);
    if (advance > totalAmount) {
      this.toastr.warning('Advance can not be greater than total amount', 'Receipt');
      return;
    }
    this.service.PostReceipt(this.Form.value).subscribe(
      res => {
        if (res == 0) {
          this.toastr.warning('Serial N.o already exists', 'Receipt');
        }
        else {
          this.toastr.success('Receipt generated successfully', 'Receipt');
          debugger;
          // this.router.navigate(['/receipt']);
          this.Form.reset();
          this.initialiseInvites();
          this.StartMethod();
        }
      },
      err => {
        this.toastr.error('Failed to generate new receipt', 'Receipt');
      }
    );

    // this.houseservice.UpdateHouseNo(this.Form.value).subscribe(
    //   res => {
    //     if(res == 0)
    //     {
    //       this.toastr.warning('House No already exists', 'House Address');
    //     }
    //     else
    //     {
    //       this.toastr.success('House No Updated successfully', 'House Address');
    //       this.router.navigate(['/houseAddress']);
    //     }          
    //   },
    //   err => {
    //     this.toastr.error('Failed to update House No','House Address');
    //   }
    // );

  }

}
