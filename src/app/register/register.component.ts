import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateReceiptService } from '../shared/generate-receipt.service';
import { HouseaddressService } from '../shared/houseaddress.service';
import { ToastrService } from 'ngx-toastr';
import { SectorsService } from '../shared/sectors.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {
  FileList : any = [];
  MessrsList: any = [];
  SectorList: any = [];
  HouseList: any = [];
  HouseListOrignal: any = [];
  ReceiptList : any = [];
  RegisterMessrList : any = [];

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
    this.GetRegisterMessrsList();
  }

  initialiseInvites() {
    this.Form = this.fb.group({
      SectorID: ['', Validators.required],
      HouseID : [null, Validators.required],
      RegisterAmount: [null,Validators.required],
      RegisterDate  : [new Date(), Validators.required],
      RegisterMessrsID: [null],
    });
  }

  GetSectors() {
    this.sectorService.GetSectors().subscribe(
      res => {
        this.SectorList = res;
      },
      err => {
        this.toastr.error('Failed to load Sectors', 'Register');
      });
  }

  GetHouseList(Id?: number) {
    this.houseService.GetHouseNo(Id).subscribe(
      result => {
        this.HouseList = result;
      },
      error => {
        this.toastr.error('Failed to load House Addresses', 'Receipt');
      });
}

  GetReceiptList(Id?: number) {
    this.receiptService.GetReceipt(Id).subscribe(
      res => {
        this.ReceiptList = res;
      },
      err => {
        this.toastr.error('Failed to load House Addresses', 'Register');
      });
  }

  GetRegisterMessrsList() {
    this.receiptService.GetRegisterMessr().subscribe(
      res => {
        debugger;
        this.RegisterMessrList = res;
      },
      err => {
        this.toastr.error('Failed to load Sectors', 'Register');
      });
  }

  onSubmit(){
    if (this.Form.invalid) {
      this.submitted = true;
      return;
    }
    if(this.Form.get('RegisterDate').value != null){
      var dateVall = this.Form.get('RegisterDate').value;
      var newDatee = dateVall.getDate() +'/' + (dateVall.getMonth()+1) + '/'+ dateVall.getFullYear();
      this.Form.get('RegisterDate').setValue(newDatee);
    }
    var registerAmount = parseInt(this.Form.get('RegisterAmount').value);
    if (registerAmount <= 0) {
      this.toastr.warning('Amount must be greater than 0', 'Receipt');
      return;
    }
    this.receiptService.UpdateReceipt(this.Form.value).subscribe(
      res => {
        if (res == 0) {
          // this.toastr.warning('Serial N.o already exists', 'Receipt');
        }
        else {
          this.toastr.success('Receipt updated successfully', 'Receipt');
          this.GetReceiptList(this.Form.get('HouseID').value);
          this.Form.reset();
        }
      },
      err => {
        this.toastr.error('Failed to generate new receipt', 'Receipt');
      }
    );
  }

}
