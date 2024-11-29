export interface IOrderNumberDetails {
    orderNumber: string,
    assignedManager: string,
}

export interface IOrderStatusDetails {
    orderStatus: string,
    totalPrice: string,
    delivery: string,
    createdOn: string,
}

export interface IOrderDetails extends IOrderNumberDetails, IOrderStatusDetails {}

export interface ICustomerDetails {
    email: string;
    name: string;
    country: string;
    city: string;
    street: string;
    house: string;
    flat: string;
    phone: string;
    createdOn: string;
    notes?: string;
}

export interface IRequestedProductDetails {
    name: string;
    price: string;
    manufacturer: string,
    notes?: string;
}
