// beneficiarios.controller.ts
import { Controller, Post } from '@nestjs/common';
import { BeneficiariosService } from './beneficiarios.service';

@Controller('beneficiarios')
export class BeneficiariosController {
  constructor(private readonly beneficiariosService: BeneficiariosService) {}

  @Post('exportar')
  async exportarBeneficiarios() {
    try {
      await this.beneficiariosService.exportarBeneficiarios();
      return {
        message:
          'Processo de exportação iniciado. Você será notificado quando estiver pronto.',
      };
    } catch (error) {
      return { error: 'Ocorreu um erro ao exportar os beneficiários.' };
    }
  }
}
