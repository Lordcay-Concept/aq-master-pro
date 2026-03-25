import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const smsService = {
  
  async sendSMS(params: {
    to: string;
    message: string;
  }): Promise<boolean> {
    try {
      const to = params.to.startsWith('+') ? params.to : `+234${params.to.replace(/^0+/, '')}`;
      
      const result = await twilioClient.messages.create({
        body: params.message,
        to: to,
        from: process.env.TWILIO_PHONE_NUMBER,
      });

      console.log(`SMS sent to ${to}: ${result.sid}`);
      return true;
    } catch (error) {
      console.error('Error sending SMS:', error);
      return false;
    }
  },

  
  async sendPaymentConfirmation(params: {
    to: string;
    name: string;
    amount: number;
    reference: string;
    serviceName: string;
    ticketNumber?: string;
  }): Promise<boolean> {
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(params.amount);

    let message = `A&Q Master Pro: Payment of ${formattedAmount} for ${params.serviceName} was successful! Reference: ${params.reference}.`;

    if (params.ticketNumber) {
      message += ` Your ticket number is ${params.ticketNumber}.`;
    }

    message += ` Thank you for choosing us!`;

    return this.sendSMS({
      to: params.to,
      message,
    });
  },

  
  async sendQueueUpdate(params: {
    to: string;
    ticketNumber: string;
    position: number;
    estimatedWait: number;
  }): Promise<boolean> {
    const message = `A&Q Master Pro: Your ticket ${params.ticketNumber} is now #${params.position} in queue. Estimated wait time: ${params.estimatedWait} minutes.`;

    return this.sendSMS({
      to: params.to,
      message,
    });
  },

  
  async sendTicketCalled(params: {
    to: string;
    ticketNumber: string;
    counter: number;
  }): Promise<boolean> {
    const message = `A&Q Master Pro: Your ticket ${params.ticketNumber} is now being called. Please proceed to Counter ${params.counter}.`;

    return this.sendSMS({
      to: params.to,
      message,
    });
  }
};