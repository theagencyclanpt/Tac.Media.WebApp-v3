import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BannerController } from "./banner/banner-controller";

@Injectable()
export class ApiClientService {

  public Banner: BannerController = new BannerController(this.http);

  constructor(private http: HttpClient) { }
}