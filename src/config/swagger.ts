import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Budget API Implementation')
  .setDescription('The Budget API Implementation')
  .setVersion('1.0')
  .build();
