import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneraterRoutingModule } from "./generater-routing.module";

import { MatNativeDateModule } from '@angular/material/core';
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
import { MatMenuModule } from '@angular/material/menu';

import { GeneraterComponent } from "./components/generater/generater.component";
import { FormResultComponent } from './components/generater/components/form-result/form-result.component';
import { FormAnnouncementComponent } from './components/generater/components/form-announcement/form-announcement.component';
import { CanvasEngineComponent } from './components/generater/components/canvas-engine/canvas-engine.component';
import { CanvasAdvancedComponent } from './components/generater/components/canvas-engine/canvas.component';
import { DialogDownloadComponent } from "./components/generater/components/dialog-download/dialog-download.component";


@NgModule({
  declarations: [
    FormResultComponent,
    FormAnnouncementComponent,
    CanvasEngineComponent,
    CanvasAdvancedComponent,
    DialogDownloadComponent,
    GeneraterComponent
  ],
  imports: [
    CommonModule,
    GeneraterRoutingModule,
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
    MatDialogModule,
    MatNativeDateModule,
    MatMenuModule
  ]
})
export class GeneraterModule { }
