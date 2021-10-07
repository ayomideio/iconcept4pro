import React, {useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import GroupingTable from './materialTable';
import { Dialog } from 'primereact/dialog';
import Header from "./recordDeleteExport";


const defaultCellStyle = {
  textOverflow: 'ellipsis', 
  whiteSpace: 'nowrap', 
  overflow: 'hidden', 
  minWidth: '300px',
//  height:
  maxWidth: 400
};

const DeleteTable = ({ data, selectedData, selectData, filter, grouping }) => {

const [subModal, setSubModal] = useState(false);
const [currentSub, setCurrentSub] = useState({ data: [], columns: [] });
const [setPrinting] = useState(false);

const columnData = [
  {
    dataField: 'ic4proLanguageId',
    text: 'Language Id',
  },
  {
    dataField: 'ic4proLanguageName',
    text: 'Language Name',
  },
  {
    dataField: 'ic4proLanguageNativeName',
    text: 'Language Native Name',
  },
  {
    dataField: 'ic4proInstalledDate',
    text: 'Installed Date',
  },
  {
    dataField: 'ic4proLanguage',
    text: 'Language',
  },
  
  {
    dataField: 'ic4proUserLocation',
    text: 'User Location',
  },

  {
    dataField: 'ic4proRecordDate',
    text: 'Record Date',

  },
  {
    dataField: 'ic4proRecordTime',
    text: 'Record Time',

  },
  {
    dataField: 'ic4proOperator',
    text: 'Operator',

  },
  {
    dataField: 'ic4proOperation',
    text: 'Operation',

  },
  {
    dataField: 'ic4proWorkstation',
    text: 'Workstation',

  },
  {
    dataField: 'ic4proRecordCounter',
    text: 'Record Counter',

  }
];  
    let columnFormatter = (obj) => {
      let result = [];
      let keyNames = Object.keys(obj[0]);
  
      keyNames.forEach((item) => {
        if (!Array.isArray(obj[0][item])) {
          result.push({
            text: item,
            dataField: item,
          })
        }
        else {
  
          result.push({
            text: item,
            dataField: item,
            modalMore: (rowData, props) => <Button
              variant="info"
              size="sm"
              onClick={() => {
                console.log(rowData);
                setCurrentObj(rowData[item]);
                setSubModal(true);
              }}
            >More
        </Button>,
          })
        }
      })
      return result;
    }
    let setCurrentObj = (obj) => {
      setCurrentSub({
        data: obj,
        columns: columnFormatter(obj)
      });
    }
  
    let footer = <div  style={{background:"#F8A316", width:'100%'}}>
              
    </div>;
  
  
    return (
      <div>
        <div className="p-grid">
          <div className="p-col-12">
            <div className=" card-w-title datatable-demo printme" id="operationID" >
              {grouping ?
                <GroupingTable columns={columnData.map((item) => {
                  const { text, dataField, modalMore } = item;
                  return modalMore ? { title: text, field: dataField, render: modalMore, grouping: false, cellStyle:{
                    ...defaultCellStyle
                  }, } : { title: text, field: dataField, cellStyle:{
                    ...defaultCellStyle 
                  }, }
                })} data={data} />
                :
                <DataTable stripedRows={true} value={data} selectionMode="single"
                setPrinting={setPrinting} id="operationID"
                data={data} columnData={columnData} 
                header={<Header setPrinting={setPrinting} id="operationID"
                data={data} columnData={columnData} />} 
                scrollable={true} scrollHeight="600px" paginator={true} currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                rows={10} rowsPerPageOptions={[5,10,20]} footer={footer}
                  responsive={true} onRowClick={(event) => { selectData(event.data); }} globalFilter={filter}>
                  {
                    columnData && columnData.map((item, index) =>
                      <Column key={index} field={item.dataField} filter filterPlaceholder={`Search ${item.text}`} header={item.text} body={item.formatter && item.formatter} sortable={true} style={{width:'200px'}} />
                    )
                  }
                </DataTable>
              }
              
            </div>
          </div>
        </div>
        <div>
          <Dialog visible={subModal} className="grouping-modal" onHide={() => { setCurrentSub({ data: [], columns: [] }); setSubModal(false); }}>
            {!grouping ?
              <GroupingTable columns={currentSub.columns && currentSub.columns.map((item) => {
                const { text, dataField, modalMore } = item;
                return modalMore ? { title: text, field: dataField, render: modalMore, grouping: false } : { title: text, field: dataField }
              })} data={currentSub.data} />
              :
              <DataTable stripedRows={true} id="modalproduct" value={currentSub.data} selectionMode="single"
                header={<Header setPrinting={setPrinting} id="modalproduct" data={currentSub.data} columnData={currentSub.columns} />} paginator={true} rows={5}
                responsive={true} onRowClick={(event) => { selectData(event.data); }} globalFilter={filter}>
                {
                  currentSub.columns && currentSub.columns.map((item) =>
                    <Column field={item.dataField} header={item.text} filter filterPlaceholder={`Search ${item.text}`} body={item.modalMore && item.modalMore} sortable={true} />
                  )
                }
              </DataTable>
            }
          </Dialog>
        </div>
      </div>
    );
  }
  
  
  export default DeleteTable;