import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { create, Whatsapp, Message, SocketState } from "venom-bot"

export type QRCode = {
  base64Qr: string;
  asciiQR?: string;
  attempts?: number;
  urlCode?: string;
};

class Sender {
  private client: Whatsapp;
  private connected: boolean;
  private qr: QRCode;
  static sendText: any;

  get isConnected(): boolean {
    return this.connected;
  }

  get qrCode(): QRCode {
    return this.qr;
  }

  constructor() {
    this.initialize();
  }

  async sendText(to: string, body: string) {
    if (!isValidPhoneNumber(to, "BR")) {
      throw new Error("This number is not valid");
    }

    let phoneNumber = parsePhoneNumber(to, "BR")
      ?.format("E.164")
      ?.replace("+", "") as string;

    phoneNumber = phoneNumber.includes("@c.us")
      ? phoneNumber
      : `${phoneNumber}@c.us`;

    await this.client.sendText(phoneNumber, body);
  }

  private initialize() {
    const qr = (base64Qr: string) => {
      this.qr = { base64Qr };
    };

    const status = (statusSession: string) => {
      this.connected = [
        "Connected",
        "isLogged",
        "qrReadSuccess",
        "chatsAvailable",
      ].includes(statusSession);
    };

    const start = (client: Whatsapp) => {
      this.client = client;

      client.onStateChange((state: any) => {
        this.connected = state === SocketState.CONNECTED;
      });
    };

    create("ws-sender-dev")
      .then((client: any) => start(client))
      .catch((error: any) => console.log(error));
  }
}

export default Sender;
