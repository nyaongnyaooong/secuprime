import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정을 변경합니다.
  app.enableCors({
    origin: 'http://localhost:3000', // 여기에 허용하려는 origin을 입력합니다.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 필요한 경우 자격 증명을 포함합니다.
  });

  await app.listen(3001);
}
bootstrap();
