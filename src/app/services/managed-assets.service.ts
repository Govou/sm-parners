import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManagedAssets } from '../model/dtos/managedassets';

@Injectable({
  providedIn: 'root'
})
export class ManagedAssetsService {

  constructor(private httpClient: HttpClient) { }
  halobizBaseUrl = environment['halobizBaseUrl']

  getManagedAssets(profileId: number){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/SMSSupplier/AssetsUnderManagement?profileId=${profileId}`)
                          .pipe(map(res => {
                            if(res.responseCode =="00")
                            {
                               return res.responseData;
                            }

                          })
                        )

  }
}
