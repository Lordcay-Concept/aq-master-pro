import axios from 'axios';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY!;
const BASE_URL = 'https://api.paystack.co';

if (!PAYSTACK_SECRET_KEY || !PAYSTACK_PUBLIC_KEY) {
  throw new Error('Paystack keys not configured in environment variables');
}

export interface InitializePaymentParams {
  email: string;
  amount: number; 
  reference: string;
  callbackUrl: string;
  metadata: Record<string, any>;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, any>;
    customer: {
      id: number;
      email: string;
      phone?: string;
    };
  };
}

export const paystack = {
  
  async initializePayment(params: InitializePaymentParams): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        `${BASE_URL}/transaction/initialize`,
        {
          email: params.email,
          amount: params.amount,
          reference: params.reference,
          callback_url: params.callbackUrl,
          metadata: params.metadata,
          channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money'], 
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Paystack error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  },

  
  async verifyPayment(reference: string): Promise<VerifyPaymentResponse> {
    try {
      const response = await axios.get(`${BASE_URL}/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Paystack verification error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  },

  
  generateReference(): string {
    return `PAY-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
  },

  
  toKobo(amountInNaira: number): number {
    return Math.round(amountInNaira * 100);
  },

  
  fromKobo(amountInKobo: number): number {
    return amountInKobo / 100;
  },

  
  verifyWebhookSignature(signature: string, payload: string): boolean {
    const crypto = require('crypto');
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(payload)
      .digest('hex');
    
    return hash === signature;
  }
};