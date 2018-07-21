import * as config from './config';
import Axios, { AxiosInstance } from '../node_modules/axios';

export interface EmailConfig {
    to: {
        name: string,
        address: string
    },
    from: {
        name: string,
        address: string
    },
    subject: string,
    content: {
        type: string,
        value: string
    }
};

class EmailManager {
    protected static readonly key: string = config.SENDGRID_API_KEY;
    protected instance: AxiosInstance;

    constructor() {
        this.instance = Axios.create({
            baseURL: "https://api.sendgrid.com/v3",
            headers: {
                "Authorization": "Bearer " + EmailManager.key
            }
        });
    }

    public async sendEmail(config: EmailConfig) {
        this.instance.post("/mail/send", {
            "personalizations": [
              {
                "to": [
                  {
                    "email": config.to.address,
                    "name": config.to.name
                  }
                ],
                "subject": config.subject
              }
            ],
            "from": {
              "email": config.from.address,
              "name": config.from.name
            },
            "content": [{
                "type": config.content.type,
                "value": config.content.value
            }]
        }).then((response) => {
            console.log("[Email: %s] Email was successfully sent.", config.to.name);
        }).catch((err) => {
            console.error("[Email: %s] Error was occurred while sending an E-mail");
            console.error(err); 
        });
    }
}

export default EmailManager;