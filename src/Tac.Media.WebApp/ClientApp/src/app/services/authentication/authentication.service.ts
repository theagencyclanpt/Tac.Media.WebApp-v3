import { Injectable } from '@angular/core';
import { ApiClientService } from "../client/api-client.service";
import { map } from 'rxjs';
import { UserModel } from "@models/user.model";

@Injectable()
export class AuthenticationService {

  private storageKey = 'user';

  constructor(private _api: ApiClientService) { }

  getUser(): UserModel | null {
    let result = localStorage.getItem(this.storageKey);

    if (result) {
      return JSON.parse(result);
    }

    return null;
  }

  hasLogin() {
    return this.getUser() !== null;
  }

  login(username: string, password: string) {

    return this._api.Authentication.login({
      Username: username,
      Password: password
    }).pipe(map(response => {
      // login successful if there's a jwt token in the response

      if (response && response.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(this.storageKey, JSON.stringify(response));
      }

      return response;
    }));
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }
}