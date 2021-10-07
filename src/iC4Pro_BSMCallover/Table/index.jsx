import React,{useState, useRef} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import { getOperation } from '../helper';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import GroupingTable from './materialTable';
import { Dialog } from 'primereact/dialog';
import Header from "./export";
import { InputText } from 'primereact/inputtext'
import { MultiSelect } from 'primereact/multiselect';

import { Calendar } from 'primereact/calendar';
import { Paginator } from 'primereact/paginator';
import { ProgressBar } from "primereact/progressbar";

import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames';
import calloverData from '../Data/ic4pro_callover.json';
import faintData from '../Data/ic4pro_faint.json';
import oprData from '../Data/ic4pro_operations.json';
// import { Slider } from 'primereact/slider';
// import { Tooltip } from 'primereact/tooltip';
// import { classNames } from 'primereact/utils';
import "./DataTable.css";
import "./ColorBadges.css";

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
  const [printing, setPrinting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedContactOfficer, setSelectedContactOfficer] = useState(null);
  const [selectedBranchCode, setSelectedBranchCode] = useState(null);
  const [selectedEntryDate, setSelectedEntryDate] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const dt = useRef(null);

  const operations = [...oprData.map(et=> et.ic4proOperationID )];
  const oprColor = [...oprData.map(et=>et.ic4proFunctionColor)];
  console.log("oprData:",operations)

  const columnData = [
    {
      dataField: 'ic4pro_branchCode',
      text: 'Branch Code',
    },
    {
      dataField: 'ic4pro_entryDate',
      text: 'Entry Date',
    },
    {
      dataField: 'CALL_NO_OF_VOUCHERS',
      text: 'NO Of Entries',
    },
    {
      dataField: 'CALL_CREDIT_FREQ',
      text: 'Credit Freq',
    },
    {
      dataField: 'CALL_CREDIT_TOTAL',
      text: 'Total Credit',
    },
    {
      dataField: 'CALL_DEBIT_FREQ',
      text: 'Debit Freq',
    },
    {
      dataField: 'CALL_DEBIT_TOTALebit',
      text: 'Total Debit',
    },
   
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

  const activityBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Activity</span>
            <ProgressBar value={rowData.activity} showValue={false} />
        </React.Fragment>
    );
}
    
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [first2, setFirst2] = useState(0);
    const [rows2, setRows2] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');

    const filterDate = (value, filter) => {
      if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
          return true;
      }

      if (value === undefined || value === null) {
          return false;
      }

      return value === formatDate(filter);
  }

  const filterDate2 = (value, filter) => {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
    }

    if (value === undefined || value === null) {
        return false;
    }

    return value === formatDate(filter);
}

  const formatDate = (date) => {
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
          month = '0' + month;
      }

      if (day < 10) {
          day = '0' + day;
      }

      return day + '/' + month + '/' + date.getFullYear();
  }

  const onDateChange = (e) => {
    dt.current.filter(e.value, 'ic4proAuditDateFrom', 'custom');
    setSelectedDate(e.value);
  }

  const onDateChange2 = (e) => {
    dt.current.filter(e.value, 'ic4proAuditDateTo', 'custom');
    setSelectedDate(e.value);
  }

  const dateBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
          <span className="p-column-title">Audit DateFrom</span>
            <span>{rowData.ic4proAuditDateFrom}</span>
        </React.Fragment>
    );
  }

  const dateBodyTemplate2 = (rowData) => {
    return (
        <React.Fragment>
          <span className="p-column-title">Audit Date To</span>
            <span>{rowData.ic4proAuditDateTo}</span>
        </React.Fragment>
    );
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

const arrFilterContactOffArray = getUnique(faintData, 'ic4proContactOfficer')

function getUniqueOpr(arr, comp) {

  // store the comparison  values in array
const unique =  arr.map(e => e[comp])

// store the indexes of the unique objects
.map((e, i, final) => final.indexOf(e) === i && i)

// eliminate the false indexes & return unique objects
.filter((e) => arr[e]).map(e => arr[e]);

return unique;
}

const arrFilterBranchCodeArray = getUniqueOpr(calloverData, 'ic4pro_branchCode')

function getUniqueEnt(arr, comp) {

  // store the comparison  values in array
const unique =  arr.map(e => e[comp])

// store the indexes of the unique objects
.map((e, i, final) => final.indexOf(e) === i && i)

// eliminate the false indexes & return unique objects
.filter((e) => arr[e]).map(e => arr[e]);

return unique;
}

const arrFilterEntryDateArray = getUniqueEnt(calloverData, 'ic4pro_entryDate')



  const onContactOfficerChange = (e) => {
    dt.current.filter(e.value, 'ic4proContactOfficer', 'in');
    setSelectedContactOfficer(e.value);
  }

  const contactOfficerBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Contact Officer</span>
            
            <span >{rowData.ic4proContactOfficer}</span>
        </React.Fragment>
    );
  }

  const contactOfficersItemTemplate = (option) => {
    return (
        <div className="p-multiselect-representative-option">
            {/* //<img alt={option.name} src={`showcase/demo/images/avatar/${option.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{verticalAlign: 'middle'}} /> */}
            <span className="image-text">{option.ic4proContactOfficer}</span>
        </div>
    );
  }
  const onBranchCodeChange = (e) => {
    dt.current.filter(e.value, 'ic4pro_branchCode', 'in');
    setSelectedBranchCode(e.value);
  }

  const branchCodeBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Branch Code</span>
            
            <span >{rowData.ic4pro_branchCode}</span>
        </React.Fragment>
    );
  }

  const branchCodesItemTemplate = (option) => {
    return (
        <div className="p-multiselect-representative-option">
            
            <span className="image-text">{option.ic4pro_branchCode}</span>
        </div>
    );
  }
  const onEntryDateChange = (e) => {
    dt.current.filter(e.value, 'ic4pro_entryDate', 'in');
    setSelectedEntryDate(e.value);
  }

  const entryDateBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
            <span className="p-column-title">Entry Date</span>
            {/* <img alt={rowData.representative.name} src={`showcase/demo/images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{verticalAlign: 'middle'}} /> */}
            <span >{rowData.ic4pro_entryDate}</span>
        </React.Fragment>
    );
  }

  const entryDatesItemTemplate = (option) => {
    return (
        <div className="p-multiselect-representative-option">
            {/* //<img alt={option.name} src={`showcase/demo/images/avatar/${option.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{verticalAlign: 'middle'}} /> */}
            <span className="image-text">{option.ic4pro_entryDate}</span>
        </div>
    );
  }

  const operationBodyTemplate = (rowData) => {
    var rowActualRecord = oprData.filter(function (getRecord) {
      return getRecord.ic4proOperationID === rowData.ic4proOperation
    }) 
    return (
      <React.Fragment>
        <span className="p-column-title">Operation</span>
        
       
         
          <p style={{background:rowActualRecord.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold", width:'7rem'}}>{rowActualRecord.map(ee=>ee.ic4proDescription)}</p> 
          
      
   
      </React.Fragment>
    );
  };
//<p style={{background:rowActualRecord.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold"}}></p>
   const renderOperationFilter = () => {
    
    return (
      <Dropdown
        value={selectedOperation}
        options={operations}
        onChange={onOperationFilterChange}
        itemTemplate={operationItemTemplate}
        showClear
        placeholder="Select an Operation"
        className={{color:oprColor,fontWeight: "bold"}}
        style={{color:oprColor,fontWeight: "bold"}}
      />
    );
  };

  const operationItemTemplate = (option) => {
    var rowcolorRecord = oprData.filter(function (getRecord) {
      return getRecord.ic4proOperationID=== option
    }) 
    return (
      <p style={{background:rowcolorRecord.map(ee=>ee.ic4proFunctionColor),fontWeight: "bold"}}>{rowcolorRecord.map(ee=>ee.ic4proDescription)}</p> 
        
   
    );
  };

  const onOperationFilterChange = (event) => {
    dt.current.filter(event.value, "ic4proOperation", "equals");
    setSelectedOperation(event.value);
  };

  const reset = () => {
    setSelectedContactOfficer(null);
    setSelectedBranchCode(null);
    setSelectedEntryDate(null);
    setSelectedDate(null);
    setSelectedOperation(null);
    // setGlobalFilter('');
    dt.current.reset();
  }

  const dateFilter = <Calendar value={selectedDate} 
    onChange={onDateChange} dateFormat="dd/mm/yy" 
    className="p-column-filter"
    style={{}} 
    placeholder="Audit Date Form"/>;

  const dateFilter2 = <Calendar value={selectedDate} 
    onChange={onDateChange2} dateFormat="dd/mm/yy" 
    className="p-column-filter"
    style={{}} 
    placeholder="Audit Date To"/>;  


  const contactOfficerFilter = 
    <MultiSelect value={selectedContactOfficer} 
    options={arrFilterContactOffArray}
    // appendTo="document.body"
    style={{minWidth:"150px",maxWidth:"160px", height: '30px'}}
    itemTemplate={contactOfficersItemTemplate} 
    onChange={onContactOfficerChange} 
    optionLabel='ic4proContactOfficer'
    optionValue='ic4proContactOfficer' 
    placeholder="All" className="p-column-filter" />;

  const branchCodeFilter = 
    <MultiSelect value={selectedBranchCode} 
    options={arrFilterBranchCodeArray}
    // appendTo="document.body"
    style={{minWidth:"100px",maxWidth:"160px", height: '30px'}}
    itemTemplate={branchCodesItemTemplate} 
    onChange={onBranchCodeChange} 
    optionLabel='ic4pro_branchCode'
    optionValue='ic4pro_branchCode' 
    placeholder="All" className="p-column-filter" />;

  const entryDateFilter = 
    <MultiSelect value={selectedEntryDate} 
    options={arrFilterEntryDateArray}
    // appendTo="document.body"
    style={{minWidth:"50px",maxWidth:"160px", height: '30px'}}
    itemTemplate={entryDatesItemTemplate} 
    onChange={onEntryDateChange} 
    optionLabel='ic4pro_entryDate'
    optionValue='ic4pro_entryDate' 
    placeholder="All" className="p-column-filter" />;

    const onCustomPage1 = (event) => {
      setFirst1(event.first);
      setRows1(event.rows);
      setCurrentPage(event.page + 1);
  }

  const onCustomPage2 = (event) => {
      setFirst2(event.first);
      setRows2(event.rows);
  }

  const onPageInputKeyDown = (event, options) => {
      if (event.key === 'Enter') {
          const page = parseInt(currentPage);
          if (page < 0 || page > options.totalPages) {
              setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
          }
          else {
              const first = currentPage ? options.rows * (page - 1) : 0;

              setFirst1(first);
              setPageInputTooltip('Press \'Enter\' key to go to this page.');
          }
      }
  }

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }

    const operationFilterElement = renderOperationFilter();

  let footer = <div className="p-clearfix" style={{width:'100%'}}>
            
  </div>;

const template1 = {
  layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
  'PrevPageLink': (options) => {
      return (
          <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
              <span className="p-p-3">Previous</span>
              <Ripple />
          </button>
      )
  },
  'NextPageLink': (options) => {
      return (
          <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
              <span className="p-p-3">Next</span>
              <Ripple />
          </button>
      )
  },
  'PageLinks': (options) => {
      if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
          const className = classNames(options.className, { 'p-disabled': true });

          return <span className={className} style={{ userSelect: 'none' }}>...</span>;
      }

      return (
          <button type="button" className={options.className} onClick={options.onClick}>
              {options.page + 1}
              <Ripple />
          </button>
      )
  },
  'RowsPerPageDropdown': (options) => {
      const dropdownOptions = [
          { label: 10, value: 10 },
          { label: 20, value: 20 },
          { label: 30, value: 30 },
          { label: 'All', value: options.totalRecords }
      ];

      return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />;
  },
  'CurrentPageReport': (options) => {
    return (
        <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
            {options.first} - {options.last} of {options.totalRecords}
        </span>
    )
}
};

const faintidBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Faint ID</span>
      {rowData.ic4proFaintId}
    </React.Fragment>
  );
};
const refBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Reference</span>
      {rowData.ic4proReference}
    </React.Fragment>
  );
};
const localBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Location</span>
      {rowData.ic4proLocation}
    </React.Fragment>
  );
};
const inspectBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Inspection</span>
      {rowData.ic4proInspectionType}
    </React.Fragment>
  );
};
const recordBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">Record Counter</span>
      {rowData.ic4proRecordCounter}
    </React.Fragment>
  );
};

const noOfEntriesBodyTemplate = (rowData) => {
  return (
    <React.Fragment>
      <span className="p-column-title">No of Entries</span>
      {rowData.CALL_NO_OF_VOUCHERS}
    </React.Fragment>
  );
};
  
  

  return (
    <div>
      <div className="datatable-doc-demo">
        <div className="p-col-12" style={{overflow: 'hidden'}}>
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
              

                responsive={true} onRowClick={(event) => { selectData(event.data); }}
                emptyMessage="No customers found" globalFilter={filter}
                paginator rows={10}
                emptyMessage="No customers found"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 20, 25]}
                  >
                <Column 
                field="GRP_BY_USER" 
                header="Entry Used ID" 
                headerStyle={{background: '#1565C0',color:'#ffffff',width:'130px'}}
                filterField="GRP_BY_USER"
                filter sortable={true} 
                style={{width:'130px', padding: '3px', overflow:'visible'}}
                />
               
                <Column 
                field="CALL_NO_OF_VOUCHERS" 
                header="No Of Entries"
                headerStyle={{background: '#1565C0',color:'#ffffff',width:'120px'}} 
                body={noOfEntriesBodyTemplate} 
                style={{width:'120px', overflow:'visible'}} 
                filter 
                sortable={true} filterMatchMode="gte" 
                filterPlaceholder="Minimum"
                />
                <Column 
                field="CALL_CREDIT_FREQ" 
                header="Credit Freq"
                headerStyle={{background: '#1565C0',color:'#ffffff',width:'120px'}} 
                sortable={true} 
                filter 
                filterMatchMode="gte" 
                filterPlaceholder="Minimum"
                style={{width:'120px'}}
                />
                <Column 
                field="CALL_CREDIT_TOTAL" 
                header="Total Credit"
                headerStyle={{background: '#1565C0',color:'#ffffff',width:'120px'}} 
                // body={inspectBodyTemplate} 
                filter 
                sortable={true} 
                style={{width:'120px', textAlign:'right'}}
                />
                <Column 
                field="CALL_DEBIT_FREQ" 
                header="Debit Freq"
                headerStyle={{background: '#1565C0',color:'#ffffff',width:'120px'}} 
                // body={dateBodyTemplate} 
                style={{width:'120px'}}
                sortable={true} 
                filter 
                filterMatchMode="gte" 
                filterPlaceholder="Minimum"
                // filterMatchMode="custom" 
                // filterElement={dateFilter} 
                // filterFunction={filterDate}
                />
                <Column 
                field="CALL_DEBIT_TOTAL"
                header="Total Debit"
                headerStyle={{background: '#1565C0',color:'#ffffff',width:'120px'}}
                style={{width:'120px', textAlign:'right'}} 
                // body={dateBodyTemplate2}
                sortable={true}  
                filter 
                
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
            <DataTable id="modalproduct" value={currentSub.data} selectionMode="single" header={<Header setPrinting={setPrinting} id="modalproduct" data={currentSub.data} columnData={currentSub.columns} />} paginator={true} rows={5}
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