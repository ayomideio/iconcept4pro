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
  maxWidth: 400
};

const HistoryTable = ({ data, selectedData, selectData, filter, grouping }) => {

const [subModal, setSubModal] = useState(false);
const [currentSub, setCurrentSub] = useState({ data: [], columns: [] });
const [printing, setPrinting] = useState(false);

const columnData = [
  {
    dataField: 'ic4proFinId',
    text: 'FAIN ID',
  },
  {
    dataField: 'ic4proReference',
    text: 'Reference',
  },
  {
    dataField: 'ic4proLocation',
    text: 'Location',
  },
  {
    dataField: 'ic4proInspectionType',
    text: 'Inspection Type',
  },
  {
    dataField: 'ic4proAuditDateFrom',
    text: 'Audit Date From',
  },
  {
    dataField: 'ic4proAuditDateTo',
    text: 'Audit Date To',
  },
  {
    dataField: 'ic4proVisitDateFrom',
    text: 'Visit Date From',
  },
  {
    dataField: 'ic4proVisitDateFrom',
    text: 'Visit Date From',
  },
  {
    dataField: 'ic4proRepeatTimeChange',
    text: 'Repeat Time Change',
  },
  {
    dataField: 'ic4proOtherReceivers',
    text: 'Other Receivers',
    formatter: (rowData, props) => {
      var result = "";
      rowData.ic4proOtherReceivers.map(item => {
        result = result + item.ic4proOfficerDesignater + " ";
      })
      return result;
    },
    modalMore: (rowData, props) => {
      var result = "";
      rowData.ic4proOtherReceivers.map(item => {
        // result = result + item.notify + " ";
      })
      return <div>
        <Button
          variant="info"
          size="sm"
          className={printing ? "for-print" : "no-print"}
          onClick={() => {
            setCurrentObj(rowData.ic4proOtherReceivers);
            setSubModal(true);
          }}
        >More
        </Button>
        <span className={!printing ? "for-print" : "no-print"}>{result}</span>
      </div>;
    },
  },
  {
    dataField: 'ic4proTeamMembers',
    text: 'Team Member',
    formatter: (rowData, props) => {
      var result = "";
      rowData.ic4proTeamMembers.map(item => {
        result = result + item.ic4proTeamMember+ " ";
      })
      return result;
    },
    modalMore: (rowData, props) => {
      var result = "";
      rowData.ic4proTeamMembers.map(item => {
        // result = result + item.notify + " ";
      })
      return <div>
        <Button
          variant="info"
          size="sm"
          className={printing ? "for-print" : "no-print"}
          onClick={() => {
            setCurrentObj(rowData.ic4proTeamMembers);
            setSubModal(true);
          }}
        >More
        </Button>
        <span className={!printing ? "for-print" : "no-print"}>{result}</span>
      </div>;
    },
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
  // {
  //   dataField: 'worksheetStatus',
  //   text: 'Worksheet Status',
    
  // },
];

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
              {/* <div style={{background:"#F8A316", height:"2rem"}}></div> */}
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