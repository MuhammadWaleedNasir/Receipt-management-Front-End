import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateReceiptService } from '../shared/generate-receipt.service';
import { HouseaddressService } from '../shared/houseaddress.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorsService } from '../shared/sectors.service';

@Component({
  selector: 'app-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: []
})
export class EditReceiptComponent implements OnInit {
  FileList: any = [];
  MessrsList: any = [];
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
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) { }

    get f() { return this.Form.controls; }

  ngOnInit() {
    this.initialiseInvites();
    this.GetSectors();
  }

  initialiseInvites() {
    this.Form = this.fb.group({
      SectorID: ['', Validators.required],
      HouseID: [null, Validators.required],
      Balance: [null],
      Amount: [null,Validators.required],
      PaymentDate: [new Date(), Validators.required]
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
      this.houseService.GetHouseNo(Id).subscribe(
        result => {
          this.HouseList = result;
        },
        error => {
          this.toastr.error('Failed to load House Addresses', 'Receipt');
        });
  }

  GetReceiptList(Id?: number){
    if(Id == undefined){
      this.toastr.warning('Please select House No.', 'Receipt');
      return;
    }
    this.receiptService.GetReceipt(Id).subscribe(
      res => {
        if(res == null){
          this.toastr.error('No result found !', 'Receipt');
        }
        else{
          debugger;
          this.ReceiptList = res;
          let length = this.ReceiptList.length;
          let count = length - 1;
          let newList = this.ReceiptList[count];
          this.Form.patchValue({
            Balance: newList.Balance
          });
        }      
      },
      err => {
        this.toastr.error('Failed to load Receipt Details', 'Receipt');
      }
    );
  }

  onSubmit(){
    if (this.Form.invalid) {
      this.submitted = true;
      return;
    }
    if(this.Form.get('PaymentDate').value != null){
      var dateVall = this.Form.get('PaymentDate').value;
      var newDatee = dateVall.getDate() +'/' + (dateVall.getMonth()+1) + '/'+dateVall.getFullYear();
      this.Form.get('PaymentDate').setValue(newDatee);
    }
    var balance = parseInt(this.Form.get('Balance').value);
    var newPayment = parseInt(this.Form.get('Amount').value);
    if (newPayment > balance) {
      this.toastr.warning('New Payment can not be greater than Balance', 'Receipt');
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
