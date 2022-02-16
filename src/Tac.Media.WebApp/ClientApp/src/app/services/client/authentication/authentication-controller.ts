import { HttpClient } from "@angular/common/http";
import { LoginRequestModel } from "../models/login-request.model";
import { LoginResponseModel } from "../models/login-response.model";

export class AuthenticationController {
  private _baseUrl: string = "api/auth";

  constructor(private http: HttpClient) { }

  login(body: LoginRequestModel) {
    return this.http.post<LoginResponseModel>(this._baseUrl + "/login", body);
  }
}