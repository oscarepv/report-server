import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
    name: string;
}

export const getHelloWorldReport = (
    options: ReportOptions,
): TDocumentDefinitions  => {
    const { name } = options;
    const docDefinition: TDocumentDefinitions = {
        
        content: [`Hola ${name}`],
        background: [
            {
                image: 'src/assets/back_03.png',
                width: 792
            }
          ]
    };
    return docDefinition;
};