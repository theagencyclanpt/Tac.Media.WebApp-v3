import { Injectable } from '@angular/core';
import { ApiClientService } from "../client/api-client.service";
import { map } from 'rxjs';

@Injectable()
export class AuthenticationService {

  private storageKey = 'token';

  constructor(private _api: ApiClientService) { }

  login(username: string, password: string) {

    return this._api.Authentication.login({
      Username: username,
      Password: password
    }).pipe(map(response => {
      // login successful if there's a jwt token in the response

      if (response && response.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(this.storageKey, JSON.stringify(response.token));
      }

      return response;
    }));
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }
}