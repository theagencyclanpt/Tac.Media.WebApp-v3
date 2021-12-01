import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'tac-result-form',
  templateUrl: "./result-form.component.html",
  styleUrls: ["./result-form.component.css"]
})
export class ResultFormComponent implements OnInit {

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
      campeonato: new FormControl(''),
      ligalogo: new FormControl(''),
      team2logo: new FormControl(''),
      team1logo: new FormControl(''),
      team1Score: new FormControl(''),
      team2Score: new FormControl(''),
    });

    this.onChanges();
  }

  onChanges(): void {
    this.form.get('campeonato').valueChanges.subscribe(val => {
      this.OnChangeForm.emit({ key: "campeonato", value: val });
    });

    this.form.get('team1Score').valueChanges.subscribe(val => {
      this.OnChangeForm.emit({ key: "score", value: this.getScore() });
    });

    this.form.get('team2Score').valueChanges.subscribe(val => {
      this.OnChangeForm.emit({ key: "score", value: this.getScore() });
    });
  }

  private getScore() {
    let team1Score = this.form.getRawValue()['team1Score'] as number;
    team1Score = team1Score ? team1Score : 0;
    let team2Score = this.form.getRawValue()['team2Score'] as number;
    team2Score = team2Score ? team2Score : 0;

    return team1Score + "-" + team2Score;
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

  onClickResultState(key: string) {
    switch (key) {
      case "victory":
        this.LoadOverwrite.emit({ id: "ChangeLayer3ToVictoryLabel" })
        break;
      case "defeat":
        this.LoadOverwrite.emit({ id: "ChangeLayer3ToDefeatLabel" })
        break;
      default:
        break;
    }
  }
}
