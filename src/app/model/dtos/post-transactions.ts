export interface PostTransactions{
  profileId: number,
  paymentGateway: string,
  paymentReferenceInternal: string,
  paymentReferenceGateway: string,
  contractId: number,
  paymentGatewayResponseCode: string,
  paymentGatewayResponseDescription: string,
  value: number,
  vat: number,
  transactionType: string,
  transactionSource: string,
  paymentConfirmed: boolean
}

