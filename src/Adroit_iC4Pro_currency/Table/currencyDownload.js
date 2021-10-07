import React from "react";
import ReactExport from "react-export-excel";
import { savePDF } from '@progress/kendo-react-pdf';
import "jspdf-autotable";
import moment from 'moment';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


// Assign id for div you want to export as pdf. Then call this function and pass id like exportPdf("#container-id")
function ExportPdf(id) {

    savePDF(document.getElementById(id), { paperSize: 'A2', landscape: true, fileName: 'Language' + '-' + moment().format('YYYYMMDD-HHmm') });

}

function ExportExcel(props) {

    const { button, data, columnData } = props;

    return <div>
        <ExcelFile element={button} filename ={`Language` + '-' + moment().format('YYYYMMDD-HHmm')}>
            <ExcelSheet data={data} name="Branch-List">
                {
                    columnData && columnData.map((item, index) => {
                        return <ExcelColumn key={index} label={item.text} value={item.formatter ? item.formatter : item.dataField} />
                    })
                }
            </ExcelSheet>
        </ExcelFile>
    </div>
}

export { ExportPdf, ExportExcel };