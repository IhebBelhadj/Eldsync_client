export class Services {
    idService: number;
    serviceType: ServiceType;
    price: number;
  
    constructor(idService: number, serviceType: ServiceType, price: number) {
      this.idService = idService;
      this.serviceType = serviceType;
      this.price = price;
    }
  }
  export enum ServiceType {
    FORUM = 'FORUM',
    CHAT = 'CHAT',
    NOTIFICATIONS = 'NOTIFICATIONS',
    EVENTS = 'EVENTS',
    DOCTOR_SERVICES = 'DOCTOR_SERVICES',
    NURSE_SERVICES = 'NURSE_SERVICES'
  }