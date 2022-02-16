import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BannerController } from "./banner/banner-controller";
import { AuthenticationController } from "./authentication/authentication-controller";

@Injectable()
export class ApiClientService {

  public Authentication: AuthenticationController = new AuthenticationController(this.http);
  public Banner: BannerController = new BannerController(this.http);

  constructor(private http: HttpClient) { }
}