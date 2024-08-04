import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';

  
import { getEmploymentLetterReport } from 'src/reports/employment-letter.report';
import { getHelloWorldReport } from 'src/reports/hello-world.report';
import { getEmploymentLetterByIdReport } from 'src/reports/employment-letter-by-id.report';
import { getCountryReport} from 'src/reports/countries.report';


//


@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {

    async onModuleInit () {
        await this.$connect();
    }

    constructor (private readonly printerService: PrinterService) {
        super();
    }

    hello() {
        const docDefinition = getHelloWorldReport({name : 'Tyta'});
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

    employmentLetter (){
        const docDefinition = getEmploymentLetterReport();
        const doc = this.printerService.createPdf(docDefinition);
        return doc;
    }

    async employmentLetterById(employeeId: number) {
        const employee = await this.employees.findUnique({
          where: {
            id: employeeId,
          },
        });
    
        if (!employee) {
          throw new NotFoundException(`Employee with id ${employeeId} not found`);
        }
    
        const docDefinition = getEmploymentLetterByIdReport({
          employerName: 'Fernando Herrera',
          employerPosition: 'Gerente de RRHH',
          employeeName: employee.name,
          employeePosition: employee.position,
          employeeStartDate: employee.start_date,
          employeeHours: employee.hours_per_day,
          employeeWorkSchedule: employee.work_schedule,
          employerCompany: 'Tucan Code Corp.',
        });
    
        const doc = this.printerService.createPdf(docDefinition);
    
        return doc;
      }

      async getCountries() {
        const countries = await this.countries.findMany({
          where: {
            local_name: {
              not: null,
            },
          },
        });
    
        const docDefinition = getCountryReport({ countries });
    
        return this.printerService.createPdf(docDefinition);
      }



}
