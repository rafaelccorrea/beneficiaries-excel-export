import { Module } from '@nestjs/common';
import { BeneficiariosController } from './beneficiarios.controller';
import { BeneficiariosService } from './beneficiarios.service';
import { ExcelService } from './excel/excel.service';
import { HttpModule } from '@nestjs/axios';
import { CustomWebSocketGateway } from './notification';

@Module({
  imports: [HttpModule],
  providers: [BeneficiariosService, ExcelService, CustomWebSocketGateway],
  controllers: [BeneficiariosController],
})
export class AppModule {}
