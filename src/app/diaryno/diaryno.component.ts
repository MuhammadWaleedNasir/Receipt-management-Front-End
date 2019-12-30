import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateReceiptService } from '../shared/generate-receipt.service';
import { HouseaddressService } from '../shared/houseaddress.service';
import { ToastrService } from 'ngx-toastr';
import { SectorsService } from '../shared/sectors.service';

@Component({
  selector: 'app-diaryno',
  templateUrl: './diaryno.component.html',
  styleUrls: []
})
export class DiarynoComponent implements OnInit {
  FileList : any = [];
  SectorList: any = [];
  HouseList: any = [];
  HouseListOrignal: any = [];
  ReceiptList : any = [];

  Form: FormGroup;
  submitted: boolean = false;

  constructor(private receiptService: GenerateReceiptService,
              private houseService: HouseaddressService,
              private sectorService: SectorsService,
              private fb: FormBuilder,
              private toastr: ToastrService) { }

  get f() { return this.Form.controls; }

  ngOnInit() {
    this.initialiseInvites();

    this.GetSectors();
  }

  initialiseInvites() {
    this.Form = this.fb.group({
      SectorID: ['', Validators.required],
      HouseID : [null, Validators.required],
      DiaryNo : [null,Validators.required],
      DiaryDate: [new Date(), Validators.required],
    });
  }

  GetSectors() {
    this.sectorService.GetSectors().subscribe(
      res => {
        this.SectorList = res;
      },
      err => {
        this.toastr.error('Failed to load Sectors', 'Error');
      });
  }

  GetHouseList(Id?: number) {
    this.houseService.GetHouseNo(Id).subscribe(
      result => {
        this.HouseList = result;
      },
      error => {
        this.toastr.error('Failed to load House Addresses', 'Error');
      });
  }

  GetReceiptList(Id?: number) {
    this.receiptService.GetReceipt(Id).subscribe(
      res => {
        this.ReceiptList = res;
      },
      err => {
        this.toastr.error('Failed to load Receipt', 'Error');
      });
  }

  onSubmit(){
    if (this.Form.invalid) {
      this.submitted = true;
      return;
    }
    if(this.Form.get('DiaryDate').value != null){
      var dateVall = this.Form.get('DiaryDate').value;
      var newDatee = dateVall.getDate() +'/' + (dateVall.getMonth()+1) + '/'+ dateVall.getFullYear();
      this.Form.get('DiaryDate').setValue(newDatee);
    }
    // var registerAmount = parseInt(this.Form.get('RegisterAmount').value);
    // if (registerAmount <= 0) {
    //   this.toastr.warning('Amount must be greater than 0', 'Receipt');
    //   return;
    // }
    this.receiptService.UpdateReceipt(this.Form.value).subscribe(
      res => {
        if (res == 0) {
          // this.toastr.warning('Serial N.o already exists', 'Receipt');
        }
        else {
          this.toastr.success('Successfully added Diary N.o to receipt', 'Success');
          this.GetReceiptList(this.Form.get('HouseID').value);
          this.Form.reset();          
        }
      },
      err => {
        this.toastr.error('Failed to generate new receipt', 'Error');
      }
    );
  }

}
