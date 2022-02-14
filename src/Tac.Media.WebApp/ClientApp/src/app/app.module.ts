import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';

import { ApiClientService } from "./services/client/api-client.service";
import { LoginComponent } from './components/login/login.component';
import { GeneraterComponent } from './components/generater/generater.component';
import { PublishComponent } from './components/publish/publish.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FormResultComponent } from './components/generater/components/form-result/form-result.component';
import { FormAnnouncementComponent } from './components/generater/components/form-announcement/form-announcement.component';
import { CanvasEngineComponent } from './components/generater/components/canvas-engine/canvas-engine.component';
import { CanvasAdvancedComponent } from './components/generater/components/canvas-engine/canvas.component';
import { DialogDownloadComponent } from "./components/generater/components/dialog-download/dialog-download.component";


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GeneraterComponent,
    PublishComponent,
    SettingsComponent,
    FormResultComponent,
    FormAnnouncementComponent,
    CanvasEngineComponent,
    CanvasAdvancedComponent,
    DialogDownloadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    CookieService,
    ApiClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
