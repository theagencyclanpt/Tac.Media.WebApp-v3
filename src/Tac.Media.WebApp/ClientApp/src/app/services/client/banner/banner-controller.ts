import { HttpClient } from "@angular/common/http";
import { GenerateBannerUrlRequest } from "./generate-banner-url.request";

export class BannerController {
  private _baseUrl: string = "api/banner";

  constructor(private http: HttpClient) { }

  generateUrl(body: GenerateBannerUrlRequest) {
    return this.http.post(this._baseUrl + "/generate-url", body);
  }
}