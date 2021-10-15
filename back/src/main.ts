import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         forbidNonWhitelisted: true,
    //         whitelist: false,
    //         forbidUnknownValues: true,
    //     }),
    // );

    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
        optionsSuccessStatus: 204,
    });

    /*_________________________________*/


    // app.enableCors();

    /*_________________________________*/

    /* 
    **Configuring PORT as we want

      const config = new ConfigService();
      await app.listen(await config.getPortConfig()|| 3555); 
    */

    // **Configuring PORT ass Heroku want
    await app.listen(process.env.PORT || 3555);
}
bootstrap();
