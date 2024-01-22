import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;
  public SENDGRID_API_KEY: string | undefined;
  public SENDGRID_SENDER: string | undefined;
  public EC2_URL: string | undefined;
  public PORT: string | number;
  public MAILER_SERVICE: string;
  public MAILER_EMAIL: string;
  public MAILER_SECRET_KEY: string;
  public SEND_EMAIL: boolean;
  public DISCORD_WEBHOOK_URL: string;
  public WEBSERVICE_URL: string ;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/chattyapp-backend';

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.MAILER_SERVICE = process.env.CLIENT_URL || '';
    this.MAILER_EMAIL = process.env.CLIENT_URL || '';
    this.SEND_EMAIL = process.env.SEND_EMAIL === 'false'; // Convierte a booleano
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.DISCORD_WEBHOOK_URL = process.env.CLIENT_URL || '';
    this.MAILER_SECRET_KEY = process.env.CLIENT_URL || '';
    this.WEBSERVICE_URL = process.env.CLIENT_URL || '';

    this.EC2_URL = process.env.EC2_URL || '';
    this.PORT = process.env.PORT || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }

}

export const config: Config = new Config();
