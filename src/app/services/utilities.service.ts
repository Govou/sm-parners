import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ServiceCenterResponse } from '../model/dtos/service-centre-response';
import { ServiceAddition } from '../model/service-addition';
import { strictEqual } from 'assert';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

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
                              else{
                                this.toastr.error('System error', 'A system error has occured', {
                                  timeOut: 3000,
                                });
                              }
                              return states;
                            })
                          )

  }

  getLGAs(stateId: number){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/Utilities/GetLocalGovtAreas?stateId=${stateId}`)
                          .pipe(map(res => {
                              const lgas: {lgaName: string, lgaId: number, stateId: number}[] = [];
                              if(res.responseCode =="00")
                              {
                                for(const key in res.responseData)
                                {
                                  lgas.push({...res.responseData[key], id: key});
                                }
                              }
                              else{
                                this.toastr.error('System error', 'A system error has occured', {
                                  timeOut: 3000,
                                });
                              }
                              return lgas;
                            })
                          )

  }


  getBusinessTypes(){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/Utilities/GetBusinessTypes`)
                          .pipe(map(res => {
                              const businessTypes: {id: number, name: string}[] = [];
                              if(res.responseCode =="00")
                              {
                                for(const key in res.responseData)
                                {
                                  businessTypes.push({...res.responseData[key], id: key});
                                }
                              }
                              else{
                                this.toastr.error('System error', 'A system error has occured', {
                                  timeOut: 3000,
                                });
                              }
                              return businessTypes;
                            })
                          )

  }


}
