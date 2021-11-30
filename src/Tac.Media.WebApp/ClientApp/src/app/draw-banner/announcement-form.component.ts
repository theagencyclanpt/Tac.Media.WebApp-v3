import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'tac-announcement-form',
  templateUrl: "./announcement-form.component.html",
  styleUrls: ["./announcement-form.component.css"]
})
export class AnnouncementFormComponent implements OnInit {

  @Output("onChangeForm")
  OnChangeForm = new EventEmitter<any>();

  @Output("loadOverwrite")
  LoadOverwrite = new EventEmitter<any>();

  @Output("unloadOverwrite")
  UnloadOverwrite = new EventEmitter<any>();

  @ViewChild('logoImage', { static: true })
  uploadLogoImage: ElementRef<HTMLInputElement>;

  @ViewChild('logoTeam2', { static: true })
  uploadLogoTeam2: ElementRef<HTMLInputElement>;

  @ViewChild('logoTeam1', { static: true })
  uploadLogoTeam1: ElementRef<HTMLInputElement>;

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      hora: new FormControl(''),
      data: new FormControl(''),
      campeonato: new FormControl(''),
      ligalogo: new FormControl(''),
      team2logo: new FormControl(''),
      team1logo: new FormControl(''),
    });

    this.onChanges();
  }

  onChanges(): void {
    this.form.get('campeonato').valueChanges.subscribe(val => {
      this.OnChangeForm.emit({ key: "campeonato", value: val });
      if (val) {
        this.LoadOverwrite.emit({ id: "ChangeToLayoutWithText" })
      } else {
        this.UnloadOverwrite.emit({ id: "ChangeToLayoutWithText" });
      }
    });

    this.form.get('hora').valueChanges.subscribe((val: string) => {
      this.OnChangeForm.emit({ key: "hora", value: val.replace(":", "H") });
    });

    this.form.get('data').valueChanges.subscribe((val: string) => {

      const date = new Date(val);
      const month = date.getUTCMonth() + 1;

      this.OnChangeForm.emit({ key: "data", value: date.getUTCDate() + "/" + month });
    });
  }

  onFileChange(event, key) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.OnChangeForm.emit({ key: key, value: reader.result as string });
      };
    }
  }

  onClickHandler(key, removed) {
    if (removed) {
      this.form.get(key).setValue(null);
      this.OnChangeForm.emit({ key: key, value: null });
      return;
    }

    switch (key) {
      case "ligalogo":
        this.uploadLogoImage.nativeElement.click();
        break;
      case "team1logo":
        this.uploadLogoTeam1.nativeElement.click();
        break;
      case "team2logo":
        this.uploadLogoTeam2.nativeElement.click();
        break;

      default:
        console.warn("Invalid type");
    }
  }
}
