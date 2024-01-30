import { Injectable } from '@nestjs/common';
import { ExcelService } from './excel/excel.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class BeneficiariosService {
  constructor(private readonly excelService: ExcelService) {}

  async exportarBeneficiarios(): Promise<void> {
    try {
      const beneficiarios = this.generateBeneficiarios(100000);
      await this.excelService.generateReport(beneficiarios);
    } catch (error) {
      throw new Error('Ocorreu um erro ao exportar os beneficiários.');
    }
  }

  private generateBeneficiarios(count: number): any[] {
    const beneficiarios = [];
    for (let i = 0; i < count; i++) {
      const beneficiario = {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        phone: faker.internet.domainName(),
        email: faker.internet.email(),
      };
      beneficiarios.push(beneficiario);
    }
    return beneficiarios;
  }
}