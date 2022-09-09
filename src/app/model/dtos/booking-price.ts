export interface BookingPrice{
  responseCode: string,
  responseData: ResponseData
}

export interface ResponseData{
  "assetType": string,
  "bookingPrice": number,
  "renewalPrice": number
}
