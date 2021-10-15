import { Injectable } from '@nestjs/common';
import * as mailjet from 'node-mailjet';
import { Template } from './resources/templates.enum';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class MailerService {
    private mailjet: mailjet.Email.Client;

    constructor(private config: ConfigService) {
        this.mailjet = mailjet.connect(this.config.get('MAILJET_API_KEY'), this.config.get('MAILJET_SECRET_KEY'));
    }

    async sendMail(
        to: string | string[],
        template: Template,
        variables: Record<string, string | any>,
        options: Record<string, any> = {},
    ) {
        const recipients = Array.isArray(to) ? to : [to];
        console.log('[MAIL SENT] MAIL TO ', to);
        console.log('[MAIL SENT] TEMPLATE ', template);
        console.log('[MAIL SENT] variables', JSON.stringify(variables));
        return await this.mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    To: recipients.map((email) => ({ Email: email })),
                    TemplateID: parseInt(template as any),
                    TemplateLanguage: true,
                    Variables: variables,
                    ...options,
                },
            ],
        });
    }

    async getTemplateContentDetail(templateId: number): Promise<any> {
        console.log('Will retrieve templateContent of templateID=', templateId);

        return await this.mailjet
            .get('template', { version: 'v3' })
            .id(templateId)
            .action('detailcontent')
            .request();
    }

    async sendTestMail(campaignDraftId: number): Promise<any> {
        console.log('Sending test mail for campaignId =', campaignDraftId);

        return await this.mailjet
            .post('campaigndraft', { version: 'v3' })
            .id(campaignDraftId)
            .action('test')
            .request({
                Recipients: [
                    {
                        Email: 'raphael.avocegamou@adhere-digital.com',
                        Name: 'Raphael AVOCEGAMOU',
                    },
                ],
            });
    }
}
