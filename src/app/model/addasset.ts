
export class addAsset{
    constructor(
        public serviceName: string,
        public make: string,
        public model: string,
        public modelNumber: string,
        public imageUrl: string,
        public trackerId: string,
        public isAvailable: true,
        public serialNumber: string,
        public identificationNumber: string,
        public referenceNumber1: string,
        public referenceNumber2: string,
        public referenceNumber3: string,
        public unitCostPrice: string,
        public averagePrice: string,
        public standardDiscount: string,
        public supplierId: 0,
        public frontViewImage: string,
        public leftViewImage: string,
        public rightViewImage: string,
        public rearViewImage: string,
        public topViewImage: string,
        public interiorViewImage: string,
    ){}
}