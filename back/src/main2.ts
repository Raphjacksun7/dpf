
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// // import * as csurf from 'csurf';
// import * as compression from 'compression';
// import * as rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>((AppModule));
  app.set('trust proxy', 1);
//   const options = new DocumentBuilder()
//     .setTitle('FOP Documentation')
//     .setDescription('The FOP API description')
//     .setVersion('1.0')
//     .addTag('FOP')
//     .build();
//   const document = SwaggerModule.createDocument(app, options);
//   SwaggerModule.setup('api/doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: false,
      forbidUnknownValues: true,
    })
  );

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
    optionsSuccessStatus: 204
  });

  //app.use(csurf());
//   app.use(compression());
//   app.use(
//     rateLimit({
//       windowMs: 60 * 1000, // 15 minutes
//       max: 100, // limit each IP to 100 requests per windowMs
//     }),
//   );
  await app.listen(process.env.PORT || 3555);
}
bootstrap();