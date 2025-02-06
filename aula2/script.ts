interface Car {
    brand: string;
    model: string;
    year?: number;
    isElectric: boolean;
    horsePower: number;
}

let car1: Car = {
    brand: 'Ford',
    model: 'Focus',
    year: 2019,
    isElectric: false,
    horsePower: 125
};

type PaymentMethod = 'card' | 'mbway' | 'paypal';

interface Payment {
    value: number;
    method: PaymentMethod;
    details: string;
}

let payment1: Payment = {
    value: 99.99,
    method: 'card',
    details: 'xxxx-xxxx-xxxx-xxxx'
};

function processPayment(payment: Payment): string {
    return `Processing payment of ${payment.value}€ using ${payment.method}`;
}

console.log(processPayment(payment1))