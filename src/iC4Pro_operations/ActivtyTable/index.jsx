import React, {useState,useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import GroupingTable from './materialTable';
import { Dialog } from 'primereact/dialog';
import Header from "./activityExport";


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
  const [setprinting] = useState(false);
  const dt = useRef(null);

  const columnData = [
    {
      dataField: 'ic4proUserActivityId',
      text: 'Activity Id',
    },
    {
      dataField: 'ic4proApplication',
      text: 'Application',
    },
    {
      dataField: 'ic4proRecordId',
      text: 'Record Id',
    },
    {
      dataField: 'ic4proFunction',
      text: 'Function',
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
      dataField: 'ic4proRecordDate',
      text: 'Record Date',
    
    },
    {
      dataField: 'ic4proRecordTime',
      text: 'Record Time',
    
    },
    {
      dataField: 'ic4proPreviousCounter',
      text: 'Previous Counter',
    
    },
    {
      dataField: 'ic4proWorkstation',
      text: 'Workstation',
    
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
      text: 'Related Id',
    
    },
    {
      dataField: 'ic4proRelatedApp',
      text: 'Related Application',
    
    },
    {
      dataField: 'ic4proRelatedAppType',
      text: 'Related Application Type',
    
    },
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
      <div className="datatable-doc-demo">
        <div className="p-col-12" style={{ overflow: 'hidden' }}>
          <div className=" card-w-title datatable-demo printme" id="key" >
            {grouping ?
              <GroupingTable columns={columnData.map((item) => {
                const { text, dataField, modalMore } = item;
                return modalMore ? {
                  title: text, field: dataField, render: modalMore, grouping: false, cellStyle: {
                    ...defaultCellStyle
                  },
                } : {
                  title: text, field: dataField, cellStyle: {
                    ...defaultCellStyle
                  },
                  }
              })} data={data} />
              :
              <DataTable
                ref={dt} value={data}
                className="p-datatable-customers" dataKey="ic4proUserActivityId" rowHover scrollable={true}
                responsive={true} onRowClick={(event) => { selectData(event.data); }}
                emptyMessage="No customers found" globalFilter={filter}
                paginator rows={5}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5, 10, 20, 25, 100, 150, 200, 250, 300, 350, 400, 450, 500]}
                
              >
                <Column field="ic4proUserActivityId"
                  header="ActivitId"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />
                <Column field="ic4proApplication"
                  header="Application" filter
                  sortable={true} style={{ width: '200px' }} />
                <Column
                  field="ic4proRecordId"
                  header="Record Id"
                  headerStyle={{ width: "250px" }}
                  sortable
                  filter
                />
                <Column field="ic4proFunction"
                  header="Function"
                  style={{ width: '200px', overflow: 'visible' }}
                  filter sortable={true}
                  filterField="ic4proFunction"
                />
                <Column field="ic4proOperator"
                  header="Operator" sortable={true}
                  filter style={{ width: '200px' }}
                
                />
                <Column field="ic4proLanguage"
                  header="Language" filter
                  sortable={true} style={{ width: '200px' }} />
                <Column field="ic4proCurrentCounter"
                  header="Current Counter"
                  style={{ width: '200px' }}
                  filter sortable={true}
                  // filterMatchMode="custom" 
                  filterMatchMode="gte"
                  filterPlaceholder="Minimum"
                />
                <Column field="ic4proRecordDate"
                  header="Record Date"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />
                <Column
                  field="ic4proRecordTime"
                  header="Record Time"
                  headerStyle={{ width: "250px" }}
                  sortable
                  filter
               
                />
                <Column field="ic4proPreviousCounter"
                  header="Previous Counter"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />
                <Column field="ic4proWorkstation"
                  header="Workstation"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />
                <Column field="ic4proPreviousStatus"
                  header="Previous Status"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />
                <Column field="ic4proPresentStatus"
                  header="Present Status"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />

                <Column field="ic4proRelatedId"
                  header="RelatedId"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />
                <Column field="ic4proRelatedApp"
                  header="Related App"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />
                <Column field="ic4proRelatedAppType"
                  header="RelatedApp Type"
                  filter sortable={true}
                  style={{ width: '200px' }}
                />
              
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
            <DataTable id="modalproduct" value={currentSub.data} selectionMode="single" header={<Header setprinting={setprinting} id="modalproduct" data={currentSub.data} columnData={currentSub.columns} />} paginator={true} rows={5}
              responsive={true} onRowClick={(event) => { selectData(event.data); }} globalFilter={filter}>
              {
                currentSub.columns && currentSub.columns.map((item) =>
                  <Column field={item.dataField}
                    header={item.text}
                    filterMatchMode="gte"
                    filter filterPlaceholder={`Search ${item.text}`}
                    body={item.modalMore && item.modalMore} sortable={true}
                    
                  />
                )
              }
            </DataTable>
          }
        </Dialog>
      </div>
    </div>
  )
}
  
  
  export default HistoryTable;