
export class activatewallet{
    constructor(
      public profileId: string,
      public securityQuestion: string,
      public securityAnswer: string,
      public walletPin: string,
      public confirmPin:string,
      public amount:number,
      public platForm:string,
      public gateway:string

    ){}
  }

