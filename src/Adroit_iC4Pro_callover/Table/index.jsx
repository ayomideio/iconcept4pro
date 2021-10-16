import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import GroupingTable from "./materialTable";
import { Dialog } from "primereact/dialog";
import Header from "./export";
import { MultiSelect } from "primereact/multiselect";
import data from "../../Data/tempData/ic4pro_callover.json";
import iC4Pro_Session_Storage from "../../iC4Pro_Session_Storage";
import "./DataTable.css";
import "./ColorBadges.css";

const defaultCellStyle = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    minWidth: "300px",
    height: "26px",
    paddingTop: "3px",
    paddingBottom: "3px",
};

const Table = ({ data, selectedData, selectData, branchcodeSelected, entrydateSelected, filter, grouping }) => {
    const [subModal, setSubModal] = useState(false);
    const [currentSub, setCurrentSub] = useState({ data: [], columns: [] });
    const [setPrinting] = useState(false);

    const [selectedBranchCode, setSelectedBranchCode] = useState(null);
    const [selectedEntryDate, setSelectedEntryDate] = useState(null);

    const dt = useRef(null);

    const columnData = [
        {
            text: "Transaction Ref Id",
            dataField: "IC4PROTRANSREFID",
        },
        {
            text: "Transaction Id",
            dataField: "IC4PROTRANSID",
        },
        {
            text: "Transaction Sub Id",
            dataField: "IC4PROTRANSSUBID",
        },

        {
            text: "Branch Code",
            dataField: "IC4PROBRANCHCODE",
        },
        {
            text: "Account Id",
            dataField: "IC4PROACCOUNTID",
        },
        {
            text: "Acct Sort Code",
            dataField: "IC4PROACCTSORTCODE",
        },
        {
            text: "Account Name",
            dataField: "IC4PROACCOUNTNAME",
        },
        {
            text: "Lcy Amount",
            dataField: "IC4PROLCYAMOUNT",
        },
        {
            text: "Lcy Code",
            dataField: "IC4PROLCYCODE",
        },
        {
            text: "Fcy Amount",
            dataField: "IC4PROFCYAMOUNT",
        },
        {
            text: "Fcy Code",
            dataField: "IC4PROFCYCODE",
        },
        {
            text: "Transaction Code",
            dataField: "IC4PROTRANSCODE",
        },
        {
            text: "Transaction Type",
            dataField: "IC4PROTRANSTYPE",
        },
        {
            text: "Cheque Number",
            dataField: "IC4PROCHEQUENO",
        },
        {
            text: "Narrative",
            dataField: "IC4PRONARRATIVE",
            width: 230,
        },
        {
            text: "Value Date",
            dataField: "IC4PROVALUEDATE",
        },
        {
            text: "Booking Date",
            dataField: "IC4PROBOOKINGDATE",
        },

        {
            text: "Entry Date",
            dataField: "IC4PROENTRYDATE",
        },
        {
            text: "Inputter",
            dataField: "IC4PROINPUTTER",
        },
        {
            text: "Authoriser",
            dataField: "IC4PROAUTHORISER",
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
                });
            } else {
                result.push({
                    text: item,
                    dataField: item,
                    modalMore: (rowData, props) => (
                        <Button
                            variant="info"
                            size="sm"
                            onClick={() => {
                                console.log(rowData);
                                setCurrentObj(rowData[item]);
                                setSubModal(true);
                            }}
                        >
                            More
                        </Button>
                    ),
                });
            }
        });
        return result;
    };
    let setCurrentObj = (obj) => {
        setCurrentSub({
            data: obj,
            columns: columnFormatter(obj),
        });
    };

    function getUniqueOpr(arr, comp) {
        // store the comparison  values in array
        const unique = arr
            .map((e) => e[comp])

            // store the indexes of the unique objects

            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the false indexes & return unique objects
            .filter((e) => arr[e])
            .map((e) => arr[e]);

        return unique;
    }

    const arrFilterBranchCodeArray = getUniqueOpr(data, "IC4_BRANCH_CODE");

    function getUniqueEnt(arr, comp) {
        // store the comparison  values in array
        const unique = arr
            .map((e) => e[comp])

            // store the indexes of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the false indexes & return unique objects
            .filter((e) => arr[e])
            .map((e) => arr[e]);

        // iC4Pro_Session_Storage.setFilteredData(JSON.stringify(unique))
        // localStorage.setItem("filteredData",)

        // alert(`unique            ${JSON.stringify(unique)}`)

        return unique;
    }

    const arrFilterEntryDateArray = getUniqueEnt(data, "GRP_BY_DATE");

    var branches = [];
    const onBranchCodeChange = (e) => {
        dt.current.filter(e.value, "IC4_BRANCH_CODE", "in");
        localStorage.setItem("values", e.value);

        setSelectedBranchCode(e.value);
        console.log(`branches             ${dt.current}`);

        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < e.value.length; j++) {
                if (JSON.stringify(data[i]).includes(e.value[j])) {
                    // alert("yes")
                    branches.push(data[i]);
                }
            }
        }
        
        var refinedBranches = [];
        if (selectedEntryDate) {
            for (var i = 0; i < branches.length; i++) {
                for (var k = 0; k < selectedEntryDate.length; k++) {
                    if (JSON.stringify(branches[i]).includes(selectedEntryDate[k])) {
                        // alert("yes")
                        refinedBranches.push(branches[i]);
                    }
                }
            }
        }
        var allcredittotalcall = 0;
        var allcredittotaldebit = 0;
        var transTotal = 0;
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
        });
        // alert(refinedBranches.length)
        if (refinedBranches.length > 0) {
            for (var i = 0; i < refinedBranches.length; i++) {
                allcredittotalcall += parseInt(refinedBranches[i].CREDIT_TOTAL_CALL);
                allcredittotaldebit += parseInt(refinedBranches[i].DEBIT_TOTAL_CALL);
                // alert(`all creditttttttttttttttttttt ${allcredittotalcall}`)
                transTotal += parseFloat(refinedBranches[i].NO_OF_ENTRIES);
            }
        } else {
            for (var i = 0; i < branches.length; i++) {
                allcredittotalcall += parseInt(branches[i].CREDIT_TOTAL_CALL);
                allcredittotaldebit += parseInt(branches[i].DEBIT_TOTAL_CALL);
                // alert(`all creditttttttttttttttttttt ${allcredittotalcall}`)
                transTotal += parseFloat(branches[i].NO_OF_ENTRIES);
            }
        }
        if (refinedBranches.length>0){
          var datapassed = {
            allcredittotalcall: formatter.format(allcredittotalcall).replace("NGN", ""),
            allcredittotaldebit: formatter.format(allcredittotaldebit).replace("NGN", ""),
            transTotal: transTotal,
            transDifference: formatter.format(allcredittotalcall - allcredittotaldebit).replace("NGN", ""),
            refinedBranches:refinedBranches
        };
        } 
        else{
          var datapassed = {
            allcredittotalcall: formatter.format(allcredittotalcall).replace("NGN", ""),
            allcredittotaldebit: formatter.format(allcredittotaldebit).replace("NGN", ""),
            transTotal: transTotal,
            transDifference: formatter.format(allcredittotalcall - allcredittotaldebit).replace("NGN", ""),
            refinedBranches:branches
        };
        }
       
        branchcodeSelected(datapassed);
    };

    const branchCodeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Branch Code</span>
                <span>{rowData.IC4_BRANCH_CODE}</span>
            </React.Fragment>
        );
    };

    const branchCodesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <span className="image-text">{option.IC4_BRANCH_CODE}</span>
            </div>
        );
    };
    const onEntryDateChange = (e) => {
        dt.current.filter(e.value, "GRP_BY_DATE", "in");

        setSelectedEntryDate(e.value);
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < e.value.length; j++) {
                if (JSON.stringify(data[i]).includes(e.value[j])) {
                    // alert("yes")
                    branches.push(data[i]);
                }
            }
        }

        var refinedBranches = [];
        if (selectedBranchCode) {
            for (var i = 0; i < branches.length; i++) {
                for (var k = 0; k < selectedBranchCode.length; k++) {
                    if (JSON.stringify(branches[i]).includes(selectedBranchCode[k])) {
                        // alert("yes")
                        refinedBranches.push(branches[i]);
                    }
                }
            }
        }
        var allcredittotalcall = 0;
        var allcredittotaldebit = 0;
        var transTotal = 0;
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
        });
        // alert(refinedBranches.length)
        if (refinedBranches.length > 0) {
            for (var i = 0; i < refinedBranches.length; i++) {
                allcredittotalcall += parseInt(refinedBranches[i].CREDIT_TOTAL_CALL);
                allcredittotaldebit += parseInt(refinedBranches[i].DEBIT_TOTAL_CALL);
                // alert(`all creditttttttttttttttttttt ${allcredittotalcall}`)
                transTotal += parseFloat(refinedBranches[i].NO_OF_ENTRIES);
            }
        } else {
            for (var i = 0; i < branches.length; i++) {
                allcredittotalcall += parseInt(branches[i].CREDIT_TOTAL_CALL);
                allcredittotaldebit += parseInt(branches[i].DEBIT_TOTAL_CALL);
                // alert(`all creditttttttttttttttttttt ${allcredittotalcall}`)
                transTotal += parseFloat(branches[i].NO_OF_ENTRIES);
            }
        }

        // alert(`breanchessssssssssssss ${JSON.stringify(branches)}`)

        if (refinedBranches.length>0){
          var datapassed = {
            allcredittotalcall: formatter.format(allcredittotalcall).replace("NGN", ""),
            allcredittotaldebit: formatter.format(allcredittotaldebit).replace("NGN", ""),
            transTotal: transTotal,
            transDifference: formatter.format(allcredittotalcall - allcredittotaldebit).replace("NGN", ""),
            refinedBranches:refinedBranches
        };
        } 
        else{
          var datapassed = {
            allcredittotalcall: formatter.format(allcredittotalcall).replace("NGN", ""),
            allcredittotaldebit: formatter.format(allcredittotaldebit).replace("NGN", ""),
            transTotal: transTotal,
            transDifference: formatter.format(allcredittotalcall - allcredittotaldebit).replace("NGN", ""),
            refinedBranches:branches
        };
        }
        entrydateSelected(datapassed);
    };

    const entryDateBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Entry Date</span>
                <span>{rowData.GRP_BY_DATE}</span>
            </React.Fragment>
        );
    };

    const entryDatesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <span className="image-text">{option.GRP_BY_DATE}</span>
            </div>
        );
    };

    const branchCodeFilter = (
        <MultiSelect
            value={selectedBranchCode}
            options={arrFilterBranchCodeArray}
            style={{ minWidth: "100px", maxWidth: "160px", height: "30px" }}
            itemTemplate={branchCodesItemTemplate}
            onChange={onBranchCodeChange}
            optionLabel="IC4_BRANCH_CODE"
            optionValue="IC4_BRANCH_CODE"
            placeholder="All"
            className="p-column-filter"
        />
    );

    const entryDateFilter = (
        <MultiSelect
            value={selectedEntryDate}
            options={arrFilterEntryDateArray}
            style={{ minWidth: "50px", maxWidth: "160px", height: "30px" }}
            itemTemplate={entryDatesItemTemplate}
            onChange={onEntryDateChange}
            optionLabel="GRP_BY_DATE"
            optionValue="GRP_BY_DATE"
            placeholder="All"
            className="p-column-filter"
        />
    );

    const noOfEntriesBodyTemplate = (rowData) => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
        });
        return (
            <React.Fragment>
                <span className="p-column-title">No of Entries</span>
                {formatter.format(rowData.NO_OF_ENTRIES).replace("NGN", "")}
            </React.Fragment>
        );
    };

    const creditTotalBodyTemplate = (rowData) => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
        });
        return (
            <React.Fragment>
                <span className="p-column-title">Total Credit</span>
                {formatter.format(rowData.CREDIT_TOTAL_CALL).replace("NGN", "")}
            </React.Fragment>
        );
    };
    const debitTotalBodyTemplate = (rowData) => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "NGN",
        });
        return (
            <React.Fragment>
                <span className="p-column-title">Total Debit</span>
                {formatter.format(rowData.DEBIT_TOTAL_CALL).replace("NGN", "")}
            </React.Fragment>
        );
    };

    return (
        <div>
            <div className="datatable-doc-demo">
                <div className="p-col-12" style={{ overflow: "hidden" }}>
                    <div className=" card-w-title datatable-demo printme" id="key">
                        {grouping ? (
                            <GroupingTable
                                columns={columnData.map((item) => {
                                    const { text, dataField, modalMore } = item;
                                    return modalMore
                                        ? {
                                              title: text,
                                              field: dataField,
                                              render: modalMore,
                                              grouping: false,
                                              cellStyle: {
                                                  ...defaultCellStyle,
                                              },
                                          }
                                        : {
                                              title: text,
                                              field: dataField,
                                              cellStyle: {
                                                  ...defaultCellStyle,
                                              },
                                          };
                                })}
                                data={data}
                            />
                        ) : (
                            <DataTable
                                ref={dt}
                                value={data}
                                className="p-datatable-customers"
                                dataKey="ic4proFaintId"
                                rowHover
                                scrollable={true}
                                responsive={true}
                                onRowClick={(event) => {
                                    selectData(event.data);
                                }}
                                emptyMessage="No customers found"
                                globalFilter={filter}
                                paginator
                                rows={10}
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                rowsPerPageOptions={[10, 20, 25]}
                            >
                                <Column
                                    field="IC4_BRANCH_CODE"
                                    header="Branch Code"
                                    headerStyle={{ background: "#1565C0", color: "#ffffff", width: "130px" }}
                                    body={branchCodeBodyTemplate}
                                    filterField="IC4_BRANCH_CODE"
                                    filterElement={branchCodeFilter}
                                    filter
                                    sortable={true}
                                    style={{ width: "130px", padding: "3px", overflow: "visible" }}
                                />
                                <Column field="GRP_BY_DATE" header="Entry Date" headerStyle={{ background: "#1565C0", color: "#ffffff", width: "130px" }} body={entryDateBodyTemplate} filterField="GRP_BY_DATE" filterElement={entryDateFilter} filter sortable={true} style={{ width: "130px" }} />
                                <Column
                                    field="NO_OF_ENTRIES"
                                    header="No Of Entries"
                                    headerStyle={{ background: "#1565C0", color: "#ffffff", width: "120px" }}
                                    body={noOfEntriesBodyTemplate}
                                    style={{ width: "120px", overflow: "visible" }}
                                    filter
                                    sortable={true}
                                    filterMatchMode="gte"
                                    filterPlaceholder="Minimum"
                                />
                                <Column field="NO_OF_CREDIT" header="Credit Freq" headerStyle={{ background: "#1565C0", color: "#ffffff", width: "120px" }} sortable={true} filter filterMatchMode="gte" filterPlaceholder="Minimum" style={{ width: "120px" }} />
                                <Column field="CREDIT_TOTAL_CALL" header="Total Credit" headerStyle={{ background: "#1565C0", color: "#ffffff", width: "120px" }} body={creditTotalBodyTemplate} filter sortable={true} style={{ width: "120px", textAlign: "right" }} />
                                <Column field="NO_OF_DEBIT" header="Debit Freq" headerStyle={{ background: "#1565C0", color: "#ffffff", width: "120px" }} style={{ width: "120px" }} sortable={true} filter filterMatchMode="gte" filterPlaceholder="Minimum" />
                                <Column field="DEBIT_TOTAL_CALL" header="Total Debit" body={debitTotalBodyTemplate} headerStyle={{ background: "#1565C0", color: "#ffffff", width: "120px" }} style={{ width: "120px", textAlign: "right" }} sortable={true} filter />
                            </DataTable>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    visible={subModal}
                    className="grouping-modal"
                    onHide={() => {
                        setCurrentSub({ data: [], columns: [] });
                        setSubModal(false);
                    }}
                >
                    {!grouping ? (
                        <GroupingTable
                            columns={
                                currentSub.columns &&
                                currentSub.columns.map((item) => {
                                    const { text, dataField, modalMore } = item;
                                    return modalMore
                                        ? {
                                              title: text,
                                              field: dataField,
                                              render: modalMore,
                                              grouping: false,
                                              cellStyle: {
                                                  ...defaultCellStyle,
                                              },
                                          }
                                        : {
                                              title: text,
                                              field: dataField,
                                              cellStyle: {
                                                  ...defaultCellStyle,
                                              },
                                          };
                                })
                            }
                            data={currentSub.data}
                        />
                    ) : (
                        <DataTable
                            id="modalproduct"
                            value={currentSub.data}
                            selectionMode="single"
                            header={<Header setPrinting={setPrinting} id="modalproduct" data={currentSub.data} columnData={currentSub.columns} />}
                            paginator={true}
                            rows={5}
                            responsive={true}
                            onRowClick={(event) => {
                                selectData(event.data);
                            }}
                            globalFilter={filter}
                        >
                            {currentSub.columns && currentSub.columns.map((item) => <Column field={item.dataField} filter filterPlaceholder={`Search ${item.text}`} header={item.text} body={item.modalMore && item.modalMore} sortable={true} />)}
                        </DataTable>
                    )}
                </Dialog>
            </div>
        </div>
    );
};

export default Table;
