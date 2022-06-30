import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ServiceCenterResponse } from '../model/dtos/service-centre-response';
import { ServiceAddition } from '../model/service-addition';
import { AddAsset } from '../model/dtos/addasset';
import { DashboardDetails } from '../model/dashboard';
import { PostTransactions } from '../model/dtos/post-transactions';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private httpClient: HttpClient) { }

  halobizBaseUrl = environment['halobizBaseUrl']

  addNewAsset(asset: AddAsset){
    return this.httpClient.post<any>(`${this.halobizBaseUrl}/api/SMSSupplier/AddNewAsset`, asset)
                          .pipe(map(res => {
                            return res;
                          })
                        )

  }



  getServiceCentres(state: string){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/SMSSupplier/GetServiceCenters?state=${state}`)
                          .pipe(map(res => {
                              const serviceCentres: ServiceCenterResponse[] = [];
                              if(res.responseCode =="00")
                              {
                                for(const key in res.responseData)
                                {
                                  serviceCentres.push({...res.responseData[key], sid: key});
                                }
                              }
                              return serviceCentres;
                            })
                          )

  }


  getVehicleMakes(){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/SMSSupplier/GetVehicleMakes`)
                          .pipe(map(res => {
                            const makes: {makeId: number, name: string}[] = [];
                            if(res.responseCode =="00")
                            {
                              for(const key in res.responseData)
                              {
                                makes.push({...res.responseData[key], id: key});
                              }
                            }
                            return makes;
                          })
                        )

  }

  getVehicleModels(makeId: number){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/SMSSupplier/GetVehicleModels?makeId=${makeId}`)
                          .pipe(map(res => {
                            const models: {modelId: number, name: string, makeId: number}[] = [];
                            if(res.responseCode =="00")
                            {
                              for(const key in res.responseData)
                              {
                                models.push({...res.responseData[key], id: key});
                              }
                            }
                            return models;
                          })
                        )

  }

  getSupplierCategories(){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/SMSSupplier/GetSupplierCategories`)
                          .pipe(map(res => {
                            const categories: {categoryId: number, categoryName: string}[] = [];
                            if(res.responseCode =="00")
                            {
                              for(const key in res.responseData)
                              {
                                categories.push({...res.responseData[key], id: key});
                              }
                            }
                            return categories;
                          })
                        )

  }

  getDashboardItems(profileId: any){
    return this.httpClient.get<any>(`${this.halobizBaseUrl}/api/SMSSupplier/Dashboard?profileId=${profileId}`)
    .pipe(map(res => {
      let dashboard!: DashboardDetails;
      if(res.responseCode =="00")
      {
         dashboard = res.responseData;
      }
      return dashboard;
    })
  )

  }

  postTransaction(transaction: PostTransactions){
    return this.httpClient.post<any>(`${this.halobizBaseUrl}/api/SMSContract/PostSupplierTransaction`, transaction)
                          .pipe(map(res => {
                            return res;
                          })
                        )

  }

}

