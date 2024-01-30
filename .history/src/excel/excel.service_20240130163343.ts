import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { CustomWebSocketGateway } from '../notification/index';
import * as fs from 'fs';

@Injectable()
export class ExcelService {
  constructor(private readonly webSocketGateway: CustomWebSocketGateway) {}

  async generateReport(beneficiarios: any[]): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Beneficiarios');

    // Add headers
    worksheet.addRow(['ID', 'Nome', 'Email', 'Telefone']);

    // Add beneficiary data
    beneficiarios.forEach((beneficiario) => {
      worksheet.addRow([
        beneficiario.id,
        beneficiario.name,
        beneficiario.email,
        beneficiario.phone,
      ]);
    });

    const fileName = 'beneficiarios.xlsx';
    const outputStream = fs.createWriteStream(fileName);

    // Write Excel file to the stream
    await workbook.xlsx.write(outputStream);

    // Close the Excel file output stream
    outputStream.end();

    const memoryUsage = process.memoryUsage();
    console.log(`Memory used: ${formatBytes(memoryUsage.heapUsed)}`);

    // Notify the user when the spreadsheet is ready
    this.webSocketGateway.notifyUser(
      `Planilha de beneficiários gerada com sucesso! Faça o download em: ${fileName}`,
    );
  }
}

function formatBytes(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) {
    return '0 Byte';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}
