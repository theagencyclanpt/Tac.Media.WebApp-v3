import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'form-result',
  templateUrl: "./form-result.component.html",
  styleUrls: ["form-result.component.scss"]
})
export class FormResultComponent implements OnInit, OnChanges {

  @Input('gameType') gameType!: string;

  @Output("invokeAction")
  invokeAction = new EventEmitter<any>();

  @Output("onChangeForm")
  OnChangeForm = new EventEmitter<any>();

  @ViewChild('logoImage', { static: true })
  uploadLogoImage?: ElementRef<HTMLInputElement>;

  @ViewChild('logoTeam2', { static: true })
  uploadLogoTeam2?: ElementRef<HTMLInputElement>;

  @ViewChild('logoTeam1', { static: true })
  uploadLogoTeam1?: ElementRef<HTMLInputElement>;

  public selectedVal: string = "victory";

  form: FormGroup = new FormGroup({
    campeonato: new FormControl(''),
    ligalogo: new FormControl(''),
    team2logo: new FormControl(''),
    team1logo: new FormControl(''),
    team1Score: new FormControl(''),
    team2Score: new FormControl(''),
  });

  private data = {
    Action: ""
  };

  ngOnInit(): void {
    this.onChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["gameType"]) {
      if (changes["gameType"].currentValue == "CSGO" && this.selectedVal == "draw") {
        this.selectedVal = "victory";
        this.data.Action = "ChangeLayerToVictoryAction";
      }
    }
  }

  onChanges(): void {
    this.form.get('campeonato')?.valueChanges.subscribe(val => {
      this.OnChangeForm.emit({ key: "campeonato", value: val });
    });

    this.form.get('team1Score')?.valueChanges.subscribe(val => {
      this.OnChangeForm.emit({ key: "score", value: this.getScore() });
    });

    this.form.get('team2Score')?.valueChanges.subscribe(val => {
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

  onFileChange(event: any, key: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.OnChangeForm.emit({ key: key, value: reader.result as string });
      };
    }
  }

  onClickHandler(key: any, removed: any) {
    if (removed) {
      this.form.get(key)?.setValue(null);
      this.OnChangeForm.emit({ key: key, value: null });
      return;
    }

    switch (key) {
      case "ligalogo":
        this.uploadLogoImage?.nativeElement.click();
        break;
      case "team1logo":
        this.uploadLogoTeam1?.nativeElement.click();
        break;
      case "team2logo":
        this.uploadLogoTeam2?.nativeElement.click();
        break;

      default:
        console.warn("Invalid type");
    }
  }

  onClickResultState(key: string) {
    this.selectedVal = key;

    switch (key) {
      case "victory":
        this.invokeAction.emit("ChangeLayerToVictoryAction");
        this.data.Action = "ChangeLayerToVictoryAction";
        break;
      case "defeat":
        this.invokeAction.emit("ChangeLayerToDefeatAction");
        this.data.Action = "ChangeLayerToDefeatAction";
        break;
      case "draw":
        this.invokeAction.emit("ChangeLayerToDrawAction");
        this.data.Action = "ChangeLayerToDrawAction";
        break;
      default:
        break;
    }
  }

  getAllData() {
    return this.data;
  }
}
