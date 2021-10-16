import React,{useState, useRef} from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import GroupingTable from './materialTable';
import { Dialog } from 'primereact/dialog';
import Header from "./operationsExport";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import oprtData from '../Data/ic4pro_operations.json';
import oprData from '../Data/ic4pro_operations.json';
import "./operationsDataTable.css";
import "./operationsColorBadges.css";


const defaultCellStyle = {
  textOverflow: 'ellipsis', 
  whiteSpace: 'nowrap', 
  overflow: 'hidden', 
  minWidth: '300px',
  height: '26px',
  paddingTop: "3px",
  paddingBottom: "3px"
};



const Table = ({ data, selectedData, selectData, filter, grouping }) => {
  
  const [subModal, setSubModal] = useState(false);
  const [currentSub, setCurrentSub] = useState({ data: [], columns: [] });
  const [setprinting] = useState(false);
  const [selectedOperatorOfficer, setSelectedOperatorOfficer] = useState(null);
  const [selectedRecordDate, setSelectedRecordDate] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const dt = useRef(null);

  const operations = [...oprData.map(et=> et.ic4proOperationID )];

  const operationBodyTemplate = (rowData) => {
    rowcolorRecord = oprData.filter(function (getRecord) {
      return getRecord.ic4proDescription=== rowData.ic4proDescription
    }) 
    return (
      <React.Fragment>
        
          <span style={{background:rowcolorRecord.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold"}}>{rowcolorRecord.map(ee=>ee.ic4proDescription)}</span> 
        
       
      </React.Fragment>
    );
  };


  const renderOperationFilter = () => {
    return (
      <Dropdown
        value={selectedOperation}
        options={operations}
        onChange={onOperationFilterChange}
        itemTemplate={operationItemTemplate}
        showClear
        placeholder="Select Operation"
        className="p-column-filter"
      />
    );
  };


  const columnData =[ 
    {
      dataField: 'ic4proOperationID',
      text: 'Operation FT',
    },
    {
      dataField: 'ic4proModelId',
      text: 'Model Id',
    },
    {
      dataField: 'ic4proFunction',
      text: 'Action',
    },
    {
      dataField: 'ic4proDescription',
      text: 'Description',
    },
    {
      dataField: 'ic4proFunctionColor',
      text: 'Function Color',
    },
    {
      dataField: 'ic4proLanguage',
      text: 'Language',
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
      
    }
  
  ];

  localStorage.setItem("header", columnData)

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

function getUnique(arr, comp) {

  // store the comparison  values in array
const unique =  arr.map(e => e[comp])

// store the indexes of the unique objects
.map((e, i, final) => final.indexOf(e) === i && i)

// eliminate the false indexes & return unique objects
.filter((e) => arr[e]).map(e => arr[e]);

return unique;
}

function getUniqueRecordDate(arr, comp) {

  // store the comparison  values in array
const unique =  arr.map(e => e[comp])

// store the indexes of the unique objects
.map((e, i, final) => final.indexOf(e) === i && i)

// eliminate the false indexes & return unique objects
.filter((e) => arr[e]).map(e => arr[e]);

return unique;
}

const arrFilterOperatorOffArray = getUnique(oprtData, 'ic4proOperator')

const arrFilterRecordDateOffArray = getUniqueRecordDate(oprtData, 'ic4proRecordDate')

  const onContactOperatorChange = (e) => {
    dt.current.filter(e.value, 'ic4proOperator', 'in');
    setSelectedOperatorOfficer(e.value);
  }
  const onRecordDateChange = (e) => {
    dt.current.filter(e.value, 'ic4proRecordDate', 'in');
    setSelectedRecordDate(e.value);
  }
  const operatorBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title"></span>
            <span className="image-text">{rowData.ic4proOperator}</span>
        </React.Fragment>
    );
  }

  const RecordDateBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title"></span>
            <span className="image-text">{rowData.ic4proRecordDate}</span>
        </React.Fragment>
    );
  }

  const contactOperatorItemTemplate = (option) => {
    return (
        <div className="p-multiselect-representative-option">
            <span className="image-text">{option.ic4proOperator}</span>
        </div>
    );
  }

  const recordDateItemTemplate = (option) => {
    return (
        <div className="p-multiselect-representative-option">
            <span className="image-text">{option.ic4proRecordDate}</span>
        </div>
    );
  }


  var rowcolorRecord

  const operationItemTemplate = (option) => {
    rowcolorRecord = oprData.filter(function (getRecord) {
      console.log("option:",option)
      console.log("getRecord.ic4proOperationID:",getRecord.ic4proOperationID)
      return getRecord.ic4proOperationID=== option
    }) 
    return (
      <span style={{background:rowcolorRecord.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold"}}>{rowcolorRecord.map(ee=>ee.ic4proDescription)}</span> 
        
   
    );
  };

  const onOperationFilterChange = (event) => {
    dt.current.filter(event.value, "ic4proOperation", "equals");
    setSelectedOperation(event.value);
  };


  
  const operatorFilter = 
    <MultiSelect value={selectedOperatorOfficer} 
    options={arrFilterOperatorOffArray}
    // appendTo="document.body"
    style={{minWidth:"150px",maxWidth:"160px", height: '30px'}}
    itemTemplate={contactOperatorItemTemplate} 
    onChange={onContactOperatorChange} 
    optionLabel='ic4proOperator'
    optionValue='ic4proOperator' 
    placeholder="All" className="p-column-filter" />;

    const RecordDateFilter = 
    <MultiSelect value={selectedRecordDate} 
    options={arrFilterRecordDateOffArray}
    // appendTo="document.body"
    style={{minWidth:"150px",maxWidth:"160px", height: '30px'}}
    itemTemplate={recordDateItemTemplate} 
    onChange={onRecordDateChange} 
    optionLabel='ic4proRecordDate'
    optionValue='ic4proRecordDate' 
    placeholder="All" className="p-column-filter" />;

   
 

  const recordCounterBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Record Counter</span>
        {rowData.ic4proRecordCounter}
      </React.Fragment>
    );
  };
  
  const operationFilterElement = renderOperationFilter();

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
                  },  } : { title: text, field: dataField, cellStyle:{
                    ...defaultCellStyle
                    },  }
              })} data={data} />
              :
                <DataTable 
                ref={dt} value={data}
                className="p-datatable-customers" dataKey="ic4proFaintId" rowHover scrollable={true}
                // scrollHeight="1000px"  
                responsive={true} onRowClick={(event) => { selectData(event.data); }}
                emptyMessage="No customers found" globalFilter={filter}
                paginator rows={5}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5,10, 20, 25,100,150,200,250,300,350,400,450,500]}
                  >
                <Column field="ic4proOperationID"
                  header={columnData.find(item => item.text).text} 
                 filter sortable={true} 
                 filterPlaceholder="Operation Id"
                 style={{width:'200px'}}
                 />
                <Column field="ic4proModelId" 
                 header="Model Id" 
                 filterPlaceholder="Model Id"
                 filter sortable={true} 
                 style={{width:'200px'}}
                 />
                <Column
                field="ic4proFunction"
                header="Function"
                filterPlaceholder="Function"
                headerStyle={{ width: "250px" }}
                filter sortable={true} 

                />
                 <Column field="ic4proDescription"  
                 header="Description" filter sortable={true} 
                 filterPlaceholder="Description"
                 style={{width:'200px'}}
                 />
                 <Column field="ic4proFunctionColor"  
                 header="Function Color" filter sortable={true} 
                 filterPlaceholder="Function Color"
                 style={{width:'200px'}}
                 />
                <Column field="ic4proNotifier"  
                 header="Notifier" filter sortable={true} 
                 filterPlaceholder="Notifier"
                 style={{width:'200px'}}
                 />
                  <Column field="ic4proOperationMsg"  
                 header="Operation Message" filter sortable={true} 
                 filterPlaceholder="Message"
                 style={{width:'200px'}}
                 />

                <Column field="ic4proSendOTP"  
                 header="Send OTP" filter sortable={true} 
                 filterPlaceholder="Send OTP"
                 style={{width:'200px'}}
                 />
                  <Column field="ic4proOtpMessage"  
                 header="OTP Message" filter sortable={true} 
                 filterPlaceholder="OTP Message"
                 style={{width:'200px'}}
                 />
                <Column field="ic4proLanguage"  
                 header="Language" filter sortable={true} 
                 style={{width:'200px'}}
                 filterPlaceholder="Language"
                 />
                  <Column field="ic4proUserLocation"  
                 header="User Location" filter sortable={true} 
                 style={{width:'200px'}}
                 filterPlaceholder="User Location"
                 />
                <Column
                  field="ic4proRecordCounter"
                  header="Record Counter"
                  headerStyle={{ width: "250px" }}
                  body={recordCounterBodyTemplate}
                  sortable
                  filter
                  filterMatchMode="gte"
                  filterPlaceholder="Minimum"
                />
               
                <Column field="ic4proRecordDate" 
                header="Record Date" 
                body={RecordDateBodyTemplate} 
                style={{width:'200px'}} 
                filter 
                filterMatchMode="custom" 
                
                filterElement={RecordDateFilter}
                />
                <Column field="ic4proRecordTime" 
                header="Record Time" 
                timeOnly hourFormat="12"
                filterPlaceholder="Record Time"
                filter sortable={true} 
                style={{width:'200px'}}
                />
                <Column field="ic4proOperator" 
                header="Operator" 
                body={operatorBodyTemplate} 
                style={{width:'200px', overflow:'visible'}} 
                filter
                filterField="ic4proOperator" 
                filterElement={operatorFilter}/>

              <Column
                field="ic4proOperation"
                header="Operation"
                headerStyle={{ width: "250px" }}
                body={operationBodyTemplate}
                style={{background:oprData.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold"}}
                sortable
                filter
                filterElement={operationFilterElement}
                />
                <Column field="ic4proWorkstation"
                header="Workstation" sortable={true} 
                filter style={{width:'200px'}}
                filterPlaceholder="Workstation"
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
              return modalMore ? { title: text, field: dataField, render: modalMore, grouping: false, cellStyle:{
                ...defaultCellStyle
                }, } : { title: text, field: dataField,cellStyle:{
                  ...defaultCellStyle
                  }, }
            })} data={currentSub.data} />
            :
            <DataTable id="modalproduct" value={currentSub.data} selectionMode="single" header={<Header setprinting={setprinting} id="modalproduct" data={currentSub.data} columnData={currentSub.columns} />} paginator={true} rows={5}
              responsive={true} onRowClick={(event) => { selectData(event.data); }} globalFilter={filter}>
              {
                currentSub.columns && currentSub.columns.map((item) =>
                  <Column field={item.dataField} filter filterPlaceholder={`Search ${item.text}`} header={item.text} body={item.modalMore && item.modalMore} sortable={true} />
                )
              }
            </DataTable>
          }
        </Dialog>
      </div>
    </div>
  );
}

export default Table;