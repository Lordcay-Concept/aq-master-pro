import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

export const emailService = {
  
  async sendEmail(params: EmailParams): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"A&Q Master Pro" <${process.env.EMAIL_FROM || 'noreply@aqmaster.com'}>`,
        to: params.to,
        subject: params.subject,
        text: params.text || params.html.replace(/<[^>]*>/g, ''),
        html: params.html,
        attachments: params.attachments,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${params.to}`);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
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
    date: Date;
  }): Promise<boolean> {
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(params.amount);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .details {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #dee2e6;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: 600;
            color: #495057;
          }
          .value {
            color: #212529;
          }
          .ticket {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .ticket-number {
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 2px;
          }
          .footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            color: #6c757d;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Confirmed! ✅</h1>
            <p>Thank you for choosing A&Q Master Pro</p>
          </div>
          
          <div class="content">
            <p>Hello <strong>${params.name}</strong>,</p>
            <p>Your payment has been successfully processed. Your transaction details are below:</p>
            
            <div class="details">
              <div class="detail-row">
                <span class="label">Amount Paid:</span>
                <span class="value"><strong>${formattedAmount}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Reference:</span>
                <span class="value"><strong>${params.reference}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Service:</span>
                <span class="value"><strong>${params.serviceName}</strong></span>
              </div>
              <div class="detail-row">
                <span class="label">Date:</span>
                <span class="value"><strong>${params.date.toLocaleDateString()} at ${params.date.toLocaleTimeString()}</strong></span>
              </div>
            </div>
            
            ${params.ticketNumber ? `
            <div class="ticket">
              <p style="margin:0; opacity:0.9;">Your Ticket Number</p>
              <div class="ticket-number">${params.ticketNumber}</div>
              <p style="margin:10px 0 0; opacity:0.9;">Please keep this number for reference</p>
            </div>
            ` : ''}
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/customer/dashboard" class="button">
                View Your Dashboard
              </a>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} A&Q Master Pro. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: params.to,
      subject: `Payment Confirmed - A&Q Master Pro`,
      html,
    });
  },

  
  async sendPaymentFailed(params: {
    to: string;
    name: string;
    reference: string;
    reason?: string;
  }): Promise<boolean> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Failed</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; }
          .header { background: #dc3545; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .footer { text-align: center; padding: 20px; background: #f8f9fa; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Failed</h1>
          </div>
          <div class="content">
            <p>Hello <strong>${params.name}</strong>,</p>
            <p>We were unable to process your payment.</p>
            <p><strong>Reference:</strong> ${params.reference}</p>
            ${params.reason ? `<p><strong>Reason:</strong> ${params.reason}</p>` : ''}
            <p>Please try again or contact support if the issue persists.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/kiosk" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Try Again</a>
          </div>
          <div class="footer">
            <p>A&Q Master Pro</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: params.to,
      subject: 'Payment Failed - A&Q Master Pro',
      html,
    });
  }
};