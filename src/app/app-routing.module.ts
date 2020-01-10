import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeroleComponent } from './employeerole/employeerole.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NewfilenumberComponent } from './newfilenumber/newfilenumber.component';
import { NewMessrsComponent } from './new-messrs/new-messrs.component';
import { GenerateReceiptComponent } from './generate-receipt/generate-receipt.component';
import { SectorsComponent } from './sectors/sectors.component';
import { HouseAddressComponent } from './house-address/house-address.component';
import { EditReceiptComponent } from './edit-receipt/edit-receipt.component';
import { RegisterMessrComponent } from './register-messr/register-messr.component';
import { RegisterComponent } from './register/register.component';
import { DiarynoComponent } from './diaryno/diaryno.component';
import { DispatchnoComponent } from './dispatchno/dispatchno.component';
import { ViewcaseComponent } from './viewcase/viewcase.component';
import { StampdutyComponent } from './stampduty/stampduty.component';
import { ChallanComponent } from './challan/challan.component';
import { FileexpenditureComponent } from './fileexpenditure/fileexpenditure.component';
import { TotalexpendituresComponent } from './totalexpenditures/totalexpenditures.component';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthGuard } from './shared/security/auth.guard';


const routes: Routes = [
  { path: 'roles', component: EmployeeroleComponent ,canActivate:[AuthGuard]},
  { path: 'employee', component: CreateEmployeeComponent ,canActivate:[AuthGuard]},
  { path: 'employee/:id', component: CreateEmployeeComponent, canActivate:[AuthGuard]},
  { path: 'file', component: NewfilenumberComponent, canActivate:[AuthGuard]},
  { path: 'messr', component: NewMessrsComponent, canActivate:[AuthGuard]},
  { path: 'messr/:id', component: NewMessrsComponent, canActivate:[AuthGuard]},
  { path: 'receipt', component: GenerateReceiptComponent, canActivate:[AuthGuard]},
  { path: 'sector', component: SectorsComponent, canActivate:[AuthGuard]},
  { path: 'sector/:id', component: SectorsComponent, canActivate:[AuthGuard]},
  { path: 'houseAddress', component: HouseAddressComponent, canActivate:[AuthGuard]},
  { path: 'houseAddress/:id', component: HouseAddressComponent, canActivate:[AuthGuard]},
  { path: 'edit', component:EditReceiptComponent, canActivate:[AuthGuard]},
  { path: 'registermessr', component: RegisterMessrComponent, canActivate:[AuthGuard]},
  { path: 'registermessr/:id', component: RegisterMessrComponent, canActivate:[AuthGuard]},
  { path: 'register', component:RegisterComponent, canActivate:[AuthGuard]},
  { path: 'diary', component:DiarynoComponent, canActivate:[AuthGuard]},
  { path: 'dispatch', component:DispatchnoComponent, canActivate:[AuthGuard]},
  { path: 'viewcase', component:ViewcaseComponent, canActivate:[AuthGuard]},
  { path: 'stampduty', component:StampdutyComponent, canActivate:[AuthGuard]},
  { path: 'challan', component:ChallanComponent, canActivate:[AuthGuard]},
  { path: 'fileexpenditure', component:FileexpenditureComponent, canActivate:[AuthGuard]},
  { path: 'totalexpenditure', component: TotalexpendituresComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
