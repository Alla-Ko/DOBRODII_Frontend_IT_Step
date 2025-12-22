import { AnimalAidRequest } from './animalAidRequest';
import { Guardianship } from './guardianship';

export type PaymentScope = 'global' | 'aidRequest' | 'guardianship';

export interface LiqPayCheckoutRequest {
  amount?: number;
  description?: string;
  isRecurring?: boolean;
  scope: PaymentScope;
  entityId?: string; 
  payerName?: string;
  payerPhone?: string;
  payerEmail?: string;
}

export interface LiqPayCheckoutResponse {
  data: string;
  signature: string;
  publicKey: string;
  gatewayUrl: string;
  orderId: string;
  resultUrl: string;

}
export interface PaymentStatusResponse {
  orderId: string;
  status: PaymentStatus; 
  success: boolean;
  providerPaymentId?: string;
  scope?: PaymentScope;
  scopeId?: string;
  userId?: string;
  amount: number;
  currency: 'UAH';
  isRecurring: boolean;
  anonymous?: boolean;
  donation: Partial<Payment>;
  guardianship?: Partial<Guardianship>;
  animalAidRequest?: Partial<AnimalAidRequest>; 
  subscription?: Partial<PaymentSubscription>;
  createdAt?: string;
  updatedAt?: string;
  message?: string;
}

export type PaymentStatus = 'pending' | 'success' | 'failure';
export type PaymentSubscriptionStatus =
  | 'requirespayment'
  | 'active'
  | 'canceled';

export interface Payment {
  id: string; 
  amount: number;
  currency: 'UAH';
  purpose?: string;
  status: PaymentStatus;
  transactionId: string; 
  targetEntityId?: string;
 
  orderId?: string; 

  isRecurring: boolean;
  scope: PaymentScope;
  entityId: string; 
  description: string;
  payerEmail?: string;
  payerName?: string;
  payerPhone?: string;
  isAnonymous: boolean;
  createdAt: string; 
  completedAt?: string;
  nextPaymentDate?: string;
  cancelledAt?: string;
}

export interface PaymentHistoryResponse {
  id: string;
  providerSubscriptionId?: string;
  amount: number;
  currency: 'UAH';
  status: PaymentStatus;
  recurring: boolean;
  purpose: string;
  targetEntityId?: string;
  donationDate: string;
}

export interface PaymentSubscription {
  id: string;

  amount: number;
  currency: 'UAH';
  provider?: string;
  providerSubscriptionId?: string; 
  status: PaymentSubscriptionStatus;
  guardianship?: Guardianship;
  aidRequest?: AnimalAidRequest;
  scopeType: PaymentScope;
  scopeId?: string;
  createdAt: string; 
  lastChargeAt: string;
  nextChargeAt: string;
  purpose?: string;
}
