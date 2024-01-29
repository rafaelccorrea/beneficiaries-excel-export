import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ExcelService } from './excel/excel.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BeneficiariosService {
  constructor(
    private readonly excelService: ExcelService,
    private readonly httpService: HttpService,
  ) {}

  async exportarBeneficiarios(): Promise<void> {
    try {
      const beneficiarios = await this.getBeneficiariosFromAPI().toPromise();
      await this.excelService.generateReport(beneficiarios);
    } catch (error) {
      throw new Error('Ocorreu um erro ao exportar os beneficiários.');
    }
  }

  private getBeneficiariosFromAPI(): Observable<any[]> {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(map((response) => response.data as any[]));
  }
}
