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

    public async sendEmail(emailConfig: EmailConfig) {
        this.instance.post("/mail/send", {
            "personalizations": [
              {
                "to": [
                  {
                    "email": emailConfig.to.address,
                    "name": emailConfig.to.name
                  }
                ],
                "subject": emailConfig.subject
              }
            ],
            "from": {
              "email": emailConfig.from.address,
              "name": emailConfig.from.name
            },
            "content": [{
                "type": emailConfig.content.type,
                "value": emailConfig.content.value
            }]
        }).then((response) => {
            console.log("[Email: %s] Email was successfully sent.", emailConfig.to.name);
        }).catch((err) => {
            console.error("[Email: %s] Error was occurred while sending an E-mail");
            console.error(err); 
        });
    }
}

export default EmailManager;