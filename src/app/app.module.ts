import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule,Validators } from '@angular/forms'
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule, IConfig } from 'ngx-mask';
//import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerateReceiptComponent } from './generate-receipt/generate-receipt.component';
import { EmployeeroleComponent } from './employeerole/employeerole.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ContentNavComponent } from './content-nav/content-nav.component';
import { ContentComponent } from './content/content.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NewfilenumberComponent } from './newfilenumber/newfilenumber.component';
import { NewMessrsComponent } from './new-messrs/new-messrs.component';
import { SectorsComponent } from './sectors/sectors.component';
import { HouseAddressComponent } from './house-address/house-address.component';
import { SectorsService } from './shared/sectors.service';
import { NewMessrsServiceService } from './shared/new-messrs-service.service';
import { EmployeeroleServiceService } from './shared/employeerole-service.service';
import { NewfilenumberServiceService } from './shared/newfilenumber-service.service';
import { HouseaddressService } from './shared/houseaddress.service'
import { GenerateReceiptService } from './shared/generate-receipt.service';
import { EditReceiptComponent } from './edit-receipt/edit-receipt.component';
import { RegisterComponent } from './register/register.component';
import { RegisterMessrComponent } from './register-messr/register-messr.component';

// export const options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    GenerateReceiptComponent,
    EmployeeroleComponent,
    SidenavComponent,
    ContentNavComponent,
    ContentComponent,
    CreateEmployeeComponent,
    NewfilenumberComponent,
    NewMessrsComponent,
    SectorsComponent,
    HouseAddressComponent,
    EditReceiptComponent,
    RegisterComponent,
    RegisterMessrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [SectorsService,
              NewMessrsServiceService,
              EmployeeroleServiceService,
              NewfilenumberServiceService,
              HouseaddressService,
              GenerateReceiptService],
              
  bootstrap: [AppComponent]
})
export class AppModule { }
