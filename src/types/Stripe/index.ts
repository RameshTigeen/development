export type GetPublishableKeySuccess = {
  status: true;
  message: 'string';
  data: {
    key: 'string';
  };
};

export type GetPaymentIntentSuccess = {
  status: true;
  message: string;
  data: {
    rental_id: number;
    customer_id: string;
    ephemeral_key: string;
    payment_intent: string;
  };
};

export type PaymentStatuses = 'success' | 'failed' | 'processing';
