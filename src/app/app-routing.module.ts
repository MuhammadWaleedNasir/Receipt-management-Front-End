import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeroleComponent } from './employeerole/employeerole.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NewfilenumberComponent } from './newfilenumber/newfilenumber.component';
import { NewMessrsComponent } from './new-messrs/new-messrs.component';
import { GenerateReceiptComponent } from './generate-receipt/generate-receipt.component';
import { SectorsComponent } from './sectors/sectors.component';
import { HouseAddressComponent  } from './house-address/house-address.component';
import { EditReceiptComponent } from './edit-receipt/edit-receipt.component';
import { RegisterMessrComponent } from './register-messr/register-messr.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: 'roles', component: EmployeeroleComponent },
  { path: 'employee',component: CreateEmployeeComponent},
  { path: 'employee/:id',component: CreateEmployeeComponent},
  { path: 'file',component: NewfilenumberComponent},
  { path: 'messr',component: NewMessrsComponent},
  { path: 'messr/:id',component: NewMessrsComponent},
  { path: 'receipt',component: GenerateReceiptComponent},
  { path: 'sector',component: SectorsComponent},
  { path: 'sector/:id',component: SectorsComponent},
  { path: 'houseAddress',component: HouseAddressComponent},
  { path: 'houseAddress/:id',component: HouseAddressComponent},
  { path: 'edit',component:EditReceiptComponent},
  { path: 'registermessr',component: RegisterMessrComponent},
  { path: 'registermessr/:id',component: RegisterMessrComponent},
  { path: 'register',component:RegisterComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
