import {injectable} from "inversify";
import axios, {AxiosInstance} from "axios";
import {NOTIFICATION_API_BASE_URL} from "@config/config";

@injectable()
export class NotificationAPIClient {
    private client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: NOTIFICATION_API_BASE_URL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    async sendEmail(email: string, message: string) {
        const payload = { email, message };
        return this.client.post('/send-email', payload);
    }

    async sendSMS(telephone: string, message: string) {
        const payload = { telephone, message };
        return this.client.post('/send-sms', payload);
    }
}