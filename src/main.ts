// Importe os módulos necessários
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Defina as opções do CORS
    const corsOptions: CorsOptions = {
      origin: 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    };

    // Aplica as opções do CORS
    app.enableCors(corsOptions);

    // Inicia o servidor
    await app.listen(3000);

    console.log('Aplicação iniciada com sucesso!');
    console.log('Servidor rodando em http://localhost:3000');
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
  }
}

bootstrap();
