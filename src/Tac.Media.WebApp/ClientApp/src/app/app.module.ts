import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { AnnouncementFormComponent } from './draw-banner/announcement-form.component';
import { ResultFormComponent } from './draw-banner/result-form.component';
import { DrawBannerComponent } from './draw-banner/draw-banner.component';
import { PreviewComponent } from './preview/preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AnnouncementFormComponent,
    ResultFormComponent,
    CanvasComponent,
    AppComponent,
    DrawBannerComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: DrawBannerComponent, pathMatch: 'full' },
      { path: 'preview', component: PreviewComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
