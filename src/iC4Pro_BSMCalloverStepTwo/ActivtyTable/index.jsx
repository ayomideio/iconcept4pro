import React, {useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import { getOperation } from '../helper.js';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import GroupingTable from './materialTable';
import { Dialog } from 'primereact/dialog';
import Header from "./export";
import { InputText } from 'primereact/inputtext';


const defaultCellStyle = {
  textOverflow: 'ellipsis', 
  whiteSpace: 'nowrap', 
  overflow: 'hidden', 
  minWidth: '300px',
//  height:
  maxWidth: "40rem"
};

const HistoryTable = ({ data, selectedData, selectData, filter, grouping }) => {

const [subModal, setSubModal] = useState(false);
const [currentSub, setCurrentSub] = useState({ data: [], columns: [] });
const [printing, setPrinting] = useState(false);

const columnData = [
  {  
    dataField: 'userActivityId',
    text: 'User Activity ID',
  },
  {  
    dataField: 'ic4proApplication',
    text: 'Application',
  },
  {  
    dataField: 'ic4proRecordId',
    text: 'Record ID',
  },
  {  
    dataField: 'ic4proFunction',
    text: 'Function',
  },
      {
        dataField: 'ic4proChangeDetails',
        text: 'Field Name',
        formatter: (rowData, props) => {
          var result = "";
          rowData.ic4proChangeDetails.map(item => {
            result = result + item.ic4proFieldName + " " ;
          })
          return result;
        },
        modalMore: (rowData, props) => {
          var result = "";
          rowData.otherNotifiers.map(item => {
            // result = result + item.notify + " ";
          })
          return <div>
            <Button
              variant="info"
              size="sm"
              className={printing ? "for-print" : "no-print"}
              onClick={() => {
                setCurrentObj(rowData.otherNotifiers);
                setSubModal(true);
              }}
            >More
            </Button>
            <span className={!printing ? "for-print" : "no-print"}>{result}</span>
          </div>;
        },
      },

      {
        dataField: 'ic4proChangeDetails',
        text: 'Change From',
        formatter: (rowData, props) => {
          var result = "";
          rowData.ic4proChangeDetails.map(item => {
            result = result  + item.ic4proChangeFrom + " " ;
          })
          return result;
        },
        modalMore: (rowData, props) => {
          var result = "";
          rowData.otherNotifiers.map(item => {
            // result = result + item.notify + " ";
          })
          return <div>
            <Button
              variant="info"
              size="sm"
              className={printing ? "for-print" : "no-print"}
              onClick={() => {
                setCurrentObj(rowData.otherNotifiers);
                setSubModal(true);
              }}
            >More
            </Button>
            <span className={!printing ? "for-print" : "no-print"}>{result}</span>
          </div>;
        },
      },

      {
        dataField: 'ic4proChangeDetails',
        text: 'Change To',
        formatter: (rowData, props) => {
          var result = "";
          rowData.ic4proChangeDetails.map(item => {
            result = result + item.ic4proChangeTo + " ";
          })
          return result;
        },
        modalMore: (rowData, props) => {
          var result = "";
          rowData.otherNotifiers.map(item => {
            // result = result + item.notify + " ";
          })
          return <div>
            <Button
              variant="info"
              size="sm"
              className={printing ? "for-print" : "no-print"}
              onClick={() => {
                setCurrentObj(rowData.otherNotifiers);
                setSubModal(true);
              }}
            >More
            </Button>
            <span className={!printing ? "for-print" : "no-print"}>{result}</span>
          </div>;
        },
      },
      {  
        dataField: 'ic4proLanguage',
        text: 'Language',
      },
      {
        dataField: 'ic4proCurrentCounter',
        text: 'Current Counter', 
      },
      {
        dataField: 'ic4proOperator',
        text: 'Operator', 
      },
      {
        dataField: 'notifierStatus',
        text: 'Notifier Status', 
      },
      
      {
        dataField: 'specialMessage',
        text: 'Special Message',
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
        dataField: 'ic4proWorkstation',
        text: 'Workstation', 
      },
      {
        dataField: 'ic4proPreviousCounter',
        text: 'Previous Counter',
      },
      {
        dataField: 'ic4proPreviousStatus',
        text: 'Previous Status',
      },
      {
        dataField: 'ic4proPresentStatus',
        text: 'Present Status',
      },
      {
        dataField: 'ic4proRelatedId',
        text: 'Related ID',
      },
      {
        dataField: 'ic4proRelatedApp',
        text: 'Related App',
      },
      {
        dataField: 'ic4proRelatedAppType',
        text: 'Related App Type',
      },
    ]
  
    let columnFormatter = (obj) => {
      let result = [];
      let keyNames = Object.keys(obj[0]);
  
      keyNames.map((item) => {
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
              {/* <div style={{background:"#7E57C2", height:"2rem"}}></div> */}
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
                <DataTable value={data} selectionMode="single"
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
              <DataTable id="modalproduct" value={currentSub.data} selectionMode="single" header={<Header setPrinting={setPrinting} id="modalproduct" data={currentSub.data} columnData={currentSub.columns} />} paginator={true} rows={5}
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