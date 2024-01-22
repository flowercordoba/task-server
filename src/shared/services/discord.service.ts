import { config } from '@root/config';

export class DiscordService {
  private readonly discordWebhookUrl = config.DISCORD_WEBHOOK_URL;

  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
      // embeds: [
      //   {
      //     image: { url: 'https://i.ibb.co/c6VF1kx/task-habitando.png' }
      //   }
      // ]
    };
// podriamos usar axios
    const resp = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      console.log('Error sending message to discord');
      return false;
    }

    return true;
  }
}
