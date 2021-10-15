export class SendMailDto {
    to: string | string[];

    variables: Record<string, string | any[]>;

    options: Record<string, any>;
}
