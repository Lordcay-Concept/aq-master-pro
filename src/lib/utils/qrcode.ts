import QRCode from 'qrcode';

export async function generateTicketQRCode(ticketNumber: string, appointmentId: string): Promise<string> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const ticketUrl = `${baseUrl}/customer/ticket/${appointmentId}`;
  
  try {
    const qrCodeDataURL = await QRCode.toDataURL(ticketUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#1e40af',
        light: '#ffffff'
      }
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return '';
  }
}