export interface AuthAPIResponse{
  responseCode: string,
  responseData: ResponseData
}


interface ResponseData{
  token: string,
  refreshToken: string
}
