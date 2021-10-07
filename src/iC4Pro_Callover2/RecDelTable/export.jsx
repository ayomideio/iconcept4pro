import React, { Component,useRef } from 'react';
import { ExportPdf, ExportExcel } from './download';
import {Button} from 'primereact/button'
import { PdfIcon, PrintIcon, ExcelIcon, CopyIcon, EmailIcon } from '../icons/icons';
import ReactToPrint from 'react-to-print';
import  Table  from '../Table/index';

 const Header=({ id, data, columnData, setPrinting })=> {

    const componentRef = useRef();
    
    let exportIconStyle = {
        float:'right',
        marginLeft:'3px',
        backgroundColor:'transparent',
        color:'#000000',
        border:'none'
      };

    let textMail = "";
    columnData.map(item => {
        textMail = textMail + "%20," + item.text;
    });

    data.map((item) => {
        textMail = textMail + "%0D%0A";
        columnData.map(key => {
            if (key.formatter) {
                textMail = textMail + "%20," + key.formatter(item);
            } else {
                textMail = textMail + "%20," + item[key.dataField];
            }
        })
    })

   
    


    return (<div className="d-flex justify-content-between" style={{background:"#F8A316"}}>
        <span></span>
        <div className="d-flex" >
            {/* <ExportExcel  button={<img src={require("../../assets/layout/images/Excel-2013-icon.png")} tooltip="EXCEL" tooltipOptions={{position: 'top'}} alt="EXCEL"/>  } data={data} columnData={columnData} />
            <a href={"mailto:?body=" + textMail} > <img tooltip="EMAIL" tooltipOptions={{position: 'top'}} href= "https://www.flaticon.com/authors/pixel-perfect" src={require("../../assets/layout/images/email.png")} alt="EMAIL"/></a>
            <Button type="button" style={exportIconStyle}  
              label="" tooltip="PRINT" tooltipOptions={{position: 'top'}} onClick={() => { window.print() }} >
             <img src={require("../../assets/layout/images/Printer.png")} alt="PRINT"/>  
             </Button> */}
    
                {/* <ReactToPrint
                    trigger={() => <Button>Print this out!</Button>}
                    content={() => componentRef.current}
                />
                <Table  ref={componentRef} /> */}
    
            {/* <i className="pi pi-file-pdf" style={{'fontSize': '2em'}} onClick={() => {ExportPdf(id);}}></i> */}
            {/* <Button type="button" style={exportIconStyle}  
              label="" tooltip="PDF" tooltipOptions={{position: 'top'}} onClick={() => {ExportPdf(id);}} >
              <img src={require("../../assets/layout/images/pdf-icon.png")} alt="PDF"/>  
            </Button> */}
        </div>
    </div >
    );
};

export default Header;