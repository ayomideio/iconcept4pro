import React,{useState, useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import GroupingTable from './materialTable';
import { Dialog } from 'primereact/dialog';
import Header from "./languageExport";
import { MultiSelect } from 'primereact/multiselect';

import { Dropdown } from 'primereact/dropdown';
import oprtData from '../../Data/tempData/ic4pro_language.json';
import oprData from '../../Data/tempData/ic4pro_language.json';
import "./languageDataTable.css";
import "./languageColorBadges.css";


const defaultCellStyle = {
  textOverflow: 'ellipsis', 
  whiteSpace: 'nowrap', 
  overflow: 'hidden', 
  minWidth: '300px',
  height: '26px',
  paddingTop: "3px",
  paddingBottom: "3px"
};


export const columnData = [
  {
    dataField: 'ic4proLanguageId',
    text: 'Language Id',
    placeholder:'Language Id'
  },
  {
    dataField: 'ic4proLanguageName',
    text: 'Language Name',
    placeholder: 'Language Name',
  },
  {
    dataField: 'ic4proLanguageNativeName',
    text: 'Language Native Name',
    placeholder: 'Language Native Name',
  },
  {
    dataField: 'ic4proInstalledDate',
    text: 'Description',
    placeholder: 'Description',
  },
  {
    dataField: 'ic4proLanguage',
    text: 'Language',
    placeholder: 'Language',
  },

  {
    dataField: 'ic4proRecordDate',
    text: 'Record Date',
    placeholder: 'Record Date',

  },
  {
    dataField: 'ic4proRecordTime',
    text: 'Record Time',

  },
  {
    dataField: 'ic4proWorkstation',
    text: 'Workstation',
    placeholder: 'Workstation',

  },

];


const Table = ({ data, selectedData, selectData, filter, grouping }) => {
  
  const [subModal, setSubModal] = useState(false);
  const [currentSub, setCurrentSub] = useState({ data: [], columns: [] });
  const [setprinting] = useState(false);
  const [selectedOperatorOfficer, setSelectedOperatorOfficer] = useState(null);
  const [selectedRecordDate, setSelectedRecordDate] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const dt = useRef(null);

  const operations = [...oprData.map(et=> et.ic4proLanguageId )];


  const operationBodyTemplate = (rowData) => {
    rowcolorRecord = oprData.filter(function (getRecord) {
      return getRecord.ic4proInstalledDate=== rowData.ic4proInstalledDate
    }) 
    return (
      <React.Fragment>
        
          <span style={{background:rowcolorRecord.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold"}}>{rowcolorRecord.map(ee=>ee.ic4proInstalledDate)}</span> 
        
       
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
      console.log("getRecord.ic4proLanguageId:",getRecord.ic4proLanguageId)
      return getRecord.ic4proLanguageId=== option
    }) 
    return (
      <span style={{background:rowcolorRecord.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold"}}>{rowcolorRecord.map(ee=>ee.ic4proInstalledDate)}</span> 
        
   
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
                stripedRows={true}
                ref={dt} value={data}
                className="p-datatable-customers" dataKey="ic4proFaintId" rowHover scrollable={true}
                responsive={true} onRowClick={(event) => { selectData(event.data); }}
                emptyMessage="No customers found" globalFilter={filter}
                paginator rows={5}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[5,10, 20, 25,100,150,200,250,300,350,400,450,500]}
                
                  >
                <Column field="ic4proLanguageId"
                 header="Language Id" 
                 filter sortable={true} 
                  filterPlaceholder="Language Id"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 style={{width:'200px'}}
                 />
                <Column field="ic4proLanguageName" 
                 header="Language Name" 
                  filterPlaceholder="Language Name"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 filter sortable={true} 
                 style={{width:'200px'}}
                 />
                <Column
                field="ic4proLanguageNativeName"
                header="Language Native Name"
                  filterPlaceholder="Language Native Name"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '200px' }}
                filter sortable={true} 
                />
                 <Column field="ic4proInstalledDate"  
                  header="Installed Name" filter sortable={true} 
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 filterPlaceholder="Installed Name"
                 style={{width:'200px'}}
                 />
              
                <Column field="ic4proLanguage"  
                  header="Language" filter sortable={true} 
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 style={{width:'200px'}}
                 filterPlaceholder="Language"
                 />
                  <Column field="ic4proUserLocation"  
                 header="User Location" filter sortable={true} 
                  style={{ width: '200px' }}
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                 filterPlaceholder="User Location"
                 />
                <Column
                  field="ic4proRecordCounter"
                  header="Record Counter"
                  body={recordCounterBodyTemplate}
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                  sortable
                  filter
                  filterMatchMode="gte"
                  filterPlaceholder="Minimum"
                />
               
                <Column field="ic4proRecordDate" 
                header="Record Date" 
                  body={RecordDateBodyTemplate} 
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
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
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                style={{width:'200px'}}
                />
                <Column field="ic4proOperator" 
                header="Operator" 
                body={operatorBodyTemplate} 
                style={{width:'200px', overflow:'visible'}} 
                  filter
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                filterField="ic4proOperator" 
                filterElement={operatorFilter}/>

              <Column
                field="ic4proOperation"
                header="Operation"
                body={operationBodyTemplate}
                style={{background:oprData.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold"}}
                sortable
                  filter
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                filterElement={operationFilterElement}
                />
                <Column field="ic4proWorkstation"
                header="Workstation" sortable={true} 
                  filter style={{ width: '200px' }}
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
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
            <DataTable stripedRows={true} id="modalproduct" value={currentSub.data} selectionMode="single"
              header={<Header setprinting={setprinting} id="modalproduct" data={currentSub.data} columnData={currentSub.columns} />} paginator={true} rows={5}
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