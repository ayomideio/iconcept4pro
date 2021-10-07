import React, {useState,useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import GroupingTable from './materialTable';
import { Dialog } from 'primereact/dialog';
import Header from "./historyExport";


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
const [setPrinting] = useState(false);
const dt = useRef(null);

 

const columnData = [
  {
    dataField: 'ic4proHistoryId',
    text: 'History Id',
  },
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
    
  },
  {
    dataField: 'ic4proModifier',
    text: 'Modifier',
    
  },
  {
    dataField: 'ic4proDateModified',
    text: 'Date Modified',
    
  },
  {
    dataField: 'ic4proTimeModified',
    text: 'Time Modified',
    
  },
  {
    dataField: 'ic4proModifierTerminal',
    text: 'Modifier Terminal',
    
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
        <div className="p-col-12"  style={{overflow: 'hidden'}}>
          <div className=" card-w-title datatable-demo printme" id="key" >
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
                <DataTable stripedRows={true}
                ref={dt} value={data}
                className="p-datatable-customers" dataKey="ic4proFaintId" rowHover scrollable={true}
                responsive={true} onRowClick={(event) => { selectData(event.data); }}
                  emptyMessage="No customers found" globalFilter={filter}
                paginator rows={5}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5,10, 20, 25,100,150,200,250,300,350,400,450,500]}
                
                >
                <Column field="ic4proHistoryId"
                 header="History Id" 
                 filter sortable={true} 
                 filterPlaceholder="History Id"
                    style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 />
                <Column field="ic4proRegulatorCode" 
                 header="Regulator Code" 
                 filterPlaceholder="Regulator Code"
                 filter sortable={true} 
                    style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 />
                <Column
                    field="ic4proRegulatorName"
                header="Regulator Name"
                filterPlaceholder="Regulator Name"
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                filter sortable={true} 
                />
                  <Column field="ic4proYearOfEstablish"  
                 header="Year of Establish" filter sortable={true} 
                    filterPlaceholder="Year of Establish"
                    style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 />
                 <Column field="ic4proCountryDomicile"  
                 header="Country Domicile" filter sortable={true} 
                 filterPlaceholder="Country Domicile"
                    style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '150px' }}
                  />
                  <Column field="ic4proUrl"
                    header="URL" filter sortable={true}
                    filterPlaceholder="URL"
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                    style={{ width: '200px' }}
                  />
                  <Column field="ic4proMission"
                    header="Mission" filter sortable={true}
                    filterPlaceholder="Mission"
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                    style={{ width: '200px' }}
                  />
                  <Column field="ic4proObjective"
                    header="Objective" filter sortable={true}
                    filterPlaceholder="Objective"
                    style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                  />
                <Column field="ic4proLanguage"  
                 header="Language" filter sortable={true} 
                    style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 />
                  <Column field="ic4proUserLocation"  
                 header="User Location" filter sortable={true} 
                    style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 />
                <Column
                  field="ic4proRecordCounter"
                  header="Record Counter"
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '150px' }}
                  sortable
                  filter
                  filterMatchMode="gte"
                  filterPlaceholder="Minimum"
                />
                <Column field="ic4proRecordDate" 
                header="Record Date" 
                style={{width:'200px'}} 
                filter 
                    filterMatchMode="custom" 
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                />
                <Column field="ic4proRecordTime" 
                header="Record Time" 
                timeOnly hourFormat="12"
                filter sortable={true} 
                    style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                />
                <Column field="ic4proOperator" 
                header="Operator" 
                style={{width:'200px', overflow:'visible'}} 
                filter
                    filterField="ic4proOperator" 
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                />
                <Column field="ic4proOperation" 
                header="Operation" 
                style={{width:'200px'}} 
                filter sortable={true} 
                    filterField="ic4proOperator" 
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                />

                <Column field="ic4proWorkstation"
                header="Workstation" sortable={true} 
                    filter style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                />


              <Column field="ic4proModifier" 
                header="Modifier" 
                style={{width:'200px'}} 
                filter sortable={true} 
                    filterField="ic4proModifier" 
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                />

                <Column field="ic4proDateModified"
                header="Date Modified" sortable={true} 
                    filter style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                />
                <Column field="ic4proTimeModified" 
                header="Time Modified" 
                style={{width:'200px'}} 
                filter sortable={true} 
                    filterField="ic4proTimeModified" 
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                />

                <Column field="ic4proModifierTerminal"
                header="Modifier Terminal" sortable={true} 
                    filter style={{ width: '200px' }}
                    headerStyle={{ background: '#1565C0', color: '#ffffff', width: '150px' }}
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
  
  
  export default HistoryTable;