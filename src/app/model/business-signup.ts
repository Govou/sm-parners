export interface BusinessSignUp{
  supplierName: string;
  description: string;
  supplierCategoryId: number;
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
  accountLogin: AccountLogin;
}

interface AccountLogin{
  email: string;
  password: string;
}
