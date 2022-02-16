import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GeneraterComponent } from './components/generater/generater.component';
import { PublishComponent } from './components/publish/publish.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthenticationGuad } from './authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: '/generater', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'generater', component: GeneraterComponent, canActivate: [AuthenticationGuad] },
  { path: 'publisher', component: PublishComponent, canActivate: [AuthenticationGuad] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthenticationGuad] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
