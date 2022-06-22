import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ServiceCenterResponse } from '../model/dtos/service-centre-response';
import { ServiceAddition } from '../model/service-addition';
import { strictEqual } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private httpClient: HttpClient) { }

  halobizBaseUrl = environment['halobizBaseUrl']

  getStates(){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/Utilities/GetStates`)
                          .pipe(map(res => {
                              const states: {stateName: string, stateId: number}[] = [];
                              if(res.responseCode =="00")
                              {
                                for(const key in res.responseData)
                                {
                                  states.push({...res.responseData[key], id: key});
                                }
                              }
                              return states;
                            })
                          )

  }



}
