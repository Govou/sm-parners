export class personalContact {

    constructor(
      public firstName: string,
      public lastName: string,
      public dateOfBirth: string,
      public phoneNumber: string,
      public gender: string,
      public stateId: number,
      public lgaId: number,
      public address: string,
      public imageUrl:string,
      public email: string,
      public password: string,
      public password2:string,
      
    ) {  }
  
  }

export class account{
  constructor(
    public email: string,
    public password: string,
  ){}
}


export class createBussiness{
  constructor(
    public companyName: string,
    public industryId: number,
    public industry: string,
    public phoneNumber: string,
    public stateId: number,
    public lgaId: number,
    public address: string,
    public logoUrl: string,
    public email: string,
    public password: string,
    public password2: string,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: string,
    public phoneNumber2: string,
    public gender: string
  ) { }
}
 