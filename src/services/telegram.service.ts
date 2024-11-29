import { TELEGRAM_CHAT_ID, TELEGRAM_BOT_TOKEN } from "../config/environment";
import { IRequestOptions } from "../data/types/api.types";
import { RequestApi } from "../utils/apiClients/request";

class TelegramService {
    constructor(private apiClient = new RequestApi()) {}
  
    async postNotification(text: string) {
      const options: IRequestOptions = {
        method: "post",
        baseURL: `https://api.telegram.org/`,
        url: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        headers: {
          "Content-type": "application/json",
        },
        data: {
          chat_id: TELEGRAM_CHAT_ID,
          text,
        },
      };
      return this.apiClient.send(options);
    }
  }
  
  export default new TelegramService();