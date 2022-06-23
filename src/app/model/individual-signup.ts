//  export class IndividualSignup{
//   constructor( firstName: string;
//     lastName: string;
//     gender: string;
//     supplierCategoryId: number;
//     dateOfBirth: string;
//     mobileNumber: string;
//     stateId: number;
//     state: string;
//     lgaId: number;
//     street: string;
//     address: string;
//     imageUrl: string;
//     primaryContactName: string;
//     primaryContactEmail: string;
//     primaryContactMobile: string;
//     primaryContactGender: string;
//     accountLogin: AccountLogin){}
// }

//  export class AccountLogin{
//    constructor(public email: string;
//     public password: string){}
//  }

export interface IndividualSignup{
  firstName: string;
      lastName: string;
      gender: string;
      supplierCategoryId: number;
      dateOfBirth: string;
      mobileNumber: string;
      stateId: number;
      state: string;
      lgaId: number;
      street: string;
      address: string;
      imageUrl: string;
      primaryContactName: string;
      primaryContactEmail: string;
      primaryContactMobile: string;
      primaryContactGender: string;
      accountLogin: AccountLogin
}

export interface AccountLogin{
       email: string;
       password: string
   }
