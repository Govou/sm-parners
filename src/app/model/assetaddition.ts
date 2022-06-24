export interface AssetRegistrationForm_1{
  make: string;
  model: string;
  year: string;
  type: string;
  platenumber: string;
  chasis: string;
  modelnumber: string;
  identificationnumber: string;
}

export interface AssetRegistrationForm_Visuals{
  frontImage: string;
  backImage: string;
  leftImage: string;
  rightImage: string;
  interiorImage: string;
}

export interface AssetRegistrationForm_Schedule{
  statename: string;
  center: string;
  date: string;
  time: string;
  price: string;
}
