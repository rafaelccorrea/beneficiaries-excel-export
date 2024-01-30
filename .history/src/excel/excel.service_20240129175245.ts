// excel.service.ts
import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { CustomWebSocketGateway } from '../notification/index';

@Injectable()
export class ExcelService {
  constructor(private readonly webSocketGateway: CustomWebSocketGateway) {}

  async generateReport(beneficiarios: any[]): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Beneficiarios');

    // Adiciona cabeçalhos
    worksheet.addRow(['ID', 'Nome', 'Email', 'Telefone']);

    // Adiciona os dados dos beneficiários
    beneficiarios.forEach((beneficiario) => {
      worksheet.addRow([
        beneficiario.id,
        beneficiario.name,
        beneficiario.email,
        beneficiario.phone,
      ]);
    });

    // Salva o arquivo
    const fileName = 'beneficiarios.xlsx';
    await workbook.xlsx.writeFile(fileName);

    // Notifica o usuário quando a planilha estiver pronta
    this.webSocketGateway.notifyUser(
      `Planilha de beneficiários gerada com sucesso! Faça o download em: ${fileName}`,
    );
  }
}
