import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SendMailDto } from './dto/sendMail.dto';
import { MailerService } from './mailer.service';
import { Template } from './resources/templates.enum';

@Controller('mailer')
export class MailerController {
    constructor(private mailerService: MailerService) {}

    @Post('access-account')
    async accessAccount(@Body() sendMailDto: SendMailDto, @Res() res: any) {
        const { to, variables, options } = sendMailDto;
        const result: any = await this.mailerService.sendMail(
            to,
            Template.ACCESS_ACCOUNT_TEMPLATE,
            variables,
            options,
        );
        return res.status(HttpStatus.OK).send(result);
    }

    @Post('access-folder')
    async accessFolder(@Body() sendMailDto: SendMailDto, @Res() res: any) {
        const { to, variables, options } = sendMailDto;
        const result: any = await this.mailerService.sendMail(
            to,
            Template.ACCESS_FOLDER_TEMPLATE,
            variables,
            options,
        );
        return res.status(HttpStatus.OK).send(result);
    }

    @Post('new-task')
    async newTask(@Body() sendMailDto: SendMailDto, @Res() res: any) {
        const { to, variables, options } = sendMailDto;
        const result: any = await this.mailerService.sendMail(to, Template.NEW_TASK_TEMPLATE, variables, options);
        return res.status(HttpStatus.OK).send(result);
    }

    @Post('end-task')
    async endTask(@Body() sendMailDto: SendMailDto, @Res() res: any) {
        const { to, variables, options } = sendMailDto;
        const result: any = await this.mailerService.sendMail(to, Template.END_TASK_TEMPLATE, variables, options);
        return res.status(HttpStatus.OK).send(result);
    }
}
