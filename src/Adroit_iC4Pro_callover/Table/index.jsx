import React, { useState, useRef,useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import GroupingTable from './materialTable';
import { Dialog } from 'primereact/dialog';
import Header from "./export";
import { MultiSelect } from 'primereact/multiselect';
import calloverData from '../../Data/tempData/ic4pro_callover.json';
import axios from 'axios'

import "./DataTable.css";
import "./ColorBadges.css";
import moment from 'moment'

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
  const [setPrinting] = useState(false);

  const [selectedBranchCode, setSelectedBranchCode] = useState(null);
  const [selectedEntryDate, setSelectedEntryDate] = useState(null);
  const [state, setState] = useState({
    data: [...[]],
  });
  const dt = useRef(null);

  const columnData = [
    {
      dataField: 'IC4_BRANCH_CODE',
      text: 'Branch Code',
    },
    {
      dataField: 'GRP_BY_DATE',
      text: 'Entry Date',
    },
    {
      dataField: 'NO_OF_ENTRIES',
      text: 'NO Of Entries',
    },
    {
      dataField: 'NO_OF_CREDIT',
      text: 'Credit Freq',
    },
    {
      dataField: 'NO_OF_DEBIT',
      text: 'Total Credit',
    },
    {
      dataField: 'DEBIT_TOTAL_CALL',
      text: 'Debit Freq',
    },
    {
      dataField: 'DEBIT_TOTAL_CALL',
      text: 'Total Debit',
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

  async function getData (){
  
		await axios.get("http://127.0.0.1:8000/callover/index/").then(res=>{
	

      for (var i=0;i<res.data.alldata.length;i++){
        res.data.alldata[i].GRP_BY_DATE=new Intl.DateTimeFormat('en-NG').format(new Date(res.data.alldata[i].GRP_BY_DATE))
      }
      setState({
        data:res.data.alldata,
     
      })
      
		
		
			
		}).finally(()=>{
			// setLoading(false);
		})
		
	}
	useEffect(()=>{
		getData()



	},[]) 

  function getUniqueOpr(arr, comp) {

    // store the comparison  values in array
    const unique = arr.map(e => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e]).map(e => arr[e]);

    return unique;
  }

  const arrFilterBranchCodeArray = getUniqueOpr(state.data, 'IC4_BRANCH_CODE')

  function getUniqueEnt(arr, comp) {

    // store the comparison  values in array
    const unique = arr.map(e => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e]).map(e => arr[e]);

    return unique;
  }

  const arrFilterEntryDateArray = getUniqueEnt(state.data, 'GRP_BY_DATE')


  const onBranchCodeChange = (e) => {
    dt.current.filter(e.value, 'IC4_BRANCH_CODE', 'in');
    setSelectedBranchCode(e.value);
  }

  const branchCodeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Branch Code</span>
        <span >{rowData.IC4_BRANCH_CODE}</span>
      </React.Fragment>
    );
  }

  const branchCodesItemTemplate = (option) => {
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option.IC4_BRANCH_CODE}</span>
      </div>
    );
  }
  const onEntryDateChange = (e) => {
    dt.current.filter(e.value, 'GRP_BY_DATE', 'in');
    setSelectedEntryDate(e.value);
  }

  const entryDateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Entry Date</span>
        <span >{rowData.GRP_BY_DATE}</span>
      </React.Fragment>
    );
  }

  const entryDatesItemTemplate = (option) => {
    
    
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option.GRP_BY_DATE}</span>
      </div>
    );
  }



  const branchCodeFilter =
    <MultiSelect value={selectedBranchCode}
      options={arrFilterBranchCodeArray}
      style={{ minWidth: "100px", maxWidth: "160px", height: '30px' }}
      itemTemplate={branchCodesItemTemplate}
      onChange={onBranchCodeChange}
      optionLabel='IC4_BRANCH_CODE'
      optionValue='IC4_BRANCH_CODE'
      placeholder="All" className="p-column-filter" />;

  const entryDateFilter =
    <MultiSelect value={selectedEntryDate}
      options={arrFilterEntryDateArray}
      style={{ minWidth: "50px", maxWidth: "160px", height: '30px' }}
      itemTemplate={entryDatesItemTemplate}
      onChange={onEntryDateChange}
      optionLabel='GRP_BY_DATE'
      optionValue='GRP_BY_DATE'
      placeholder="All" className="p-column-filter" />;



  const noOfEntriesBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">No of Entries</span>
        {rowData.NO_OF_ENTRIES}
      </React.Fragment>
    );
  };

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
                className="p-datatable-customers" dataKey="ic4proFaintId" rowHover scrollable={true}

                responsive={true} onRowClick={(event) => { selectData(event.data); }}
                emptyMessage="No customers found" globalFilter={filter}
                paginator rows={10}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 20, 25]}
              >
                <Column
                  field="IC4_BRANCH_CODE"
                  header="Branch Code"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                  body={branchCodeBodyTemplate}
                  filterField="IC4_BRANCH_CODE"
                  filterElement={branchCodeFilter}
                  filter sortable={true}
                  style={{ width: '130px', padding: '3px', overflow: 'visible' }}
                />
                <Column
                  field="GRP_BY_DATE"
                  header="Entry Date"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '130px' }}
                  body={entryDateBodyTemplate}
                  filterField="GRP_BY_DATE"
                  filterElement={entryDateFilter}
                  filter sortable={true}
                  style={{ width: '130px' }} />
                <Column
                  field="NO_OF_ENTRIES"
                  header="No Of Entries"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '120px' }}
                  body={noOfEntriesBodyTemplate}
                  style={{ width: '120px', overflow: 'visible' }}
                  filter
                  sortable={true} filterMatchMode="gte"
                  filterPlaceholder="Minimum"
                />
                <Column
                  field="NO_OF_CREDIT"
                  header="Credit Freq"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '120px' }}
                  sortable={true}
                  filter
                  filterMatchMode="gte"
                  filterPlaceholder="Minimum"
                  style={{ width: '120px' }}
                />
                <Column
                  field="CREDIT_TOTAL_CALL"
                  header="Total Credit"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '120px' }}

                  filter
                  sortable={true}
                  style={{ width: '120px', textAlign: 'right' }}
                />
                <Column
                  field="NO_OF_DEBIT"
                  header="Debit Freq"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '120px' }}

                  style={{ width: '120px' }}
                  sortable={true}
                  filter
                  filterMatchMode="gte"
                  filterPlaceholder="Minimum"

                />
                <Column
                  field="DEBIT_TOTAL_CALL"
                  header="Total Debit"
                  headerStyle={{ background: '#1565C0', color: '#ffffff', width: '120px' }}
                  
                  style={{ width: '120px', textAlign: 'right' }}
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
              return modalMore ? {
                title: text, field: dataField, render: modalMore, grouping: false, cellStyle: {
                  ...defaultCellStyle
                },
              } : {
                title: text, field: dataField, cellStyle: {
                  ...defaultCellStyle
                },
                }
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