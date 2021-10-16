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

const HistoryTable = ({ data, selectedData, selectData, filter, grouping }) => {

const [subModal, setSubModal] = useState(false);
const [currentSub, setCurrentSub] = useState({ data: [], columns: [] });
const [setprinting] = useState(false);

const columnData = [
  {
    dataField: 'ic4proRegulatorCode',
    text: 'Regulator Code',
     
  },
  {
    dataField: 'ic4proRegulatorName',
    text: 'Regulator Name',
  },
  {
    dataField: 'ic4proYearOfEstablish',
    text: 'Year of Establish',
  },
  {
    dataField: 'ic4proCountryDomicile',
    text: 'Country Domicile',
  },
  {
    dataField: 'ic4proUrl',
    text: 'URL',
  },
  {
    dataField: 'ic4proMission',
    text: 'Mission',
  },
  {
    dataField: 'ic4proObjective',
    text: 'Objective',
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
                <DataTable stripedRows={true} value={data}
                  className="p-datatable-customers" dataKey="ic4proUserActivityId" rowHover scrollable={true}
                  responsive={true} onRowClick={(event) => { selectData(event.data); }}
                  emptyMessage="No customers found" globalFilter={filter}
                  paginator rows={5}
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  rowsPerPageOptions={[5, 10, 20, 25, 100, 150, 200, 250, 300, 350, 400, 450, 500]}>
                  {
                    columnData && columnData.map((item, index) =>
                      <Column key={index}
                        field={item.dataField}
                        filter
                        filterPlaceholder={`Search ${item.text}`}
                        header={item.text} body={item.formatter && item.formatter}
                        sortable={true}
                        headerStyle={{ background: '#1565C0', color: '#ffffff', width: '145px' }}
                        style={{ width: '200px' }} />
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
                header={<Header setprinting={setprinting} id="modalproduct" data={currentSub.data} columnData={currentSub.columns} />} paginator={true} rows={5}
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
  
  
  export default HistoryTable;