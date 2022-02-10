import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GeneraterComponent } from './components/generater/generater.component';
import { PublishComponent } from './components/publish/publish.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppGuardGuard } from './app-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/generater', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'generater', component: GeneraterComponent },
  { path: 'publish', component: PublishComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
