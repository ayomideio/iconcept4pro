import React from "react";
import {
    Dropdown,
    ButtonGroup,
} from 'react-bootstrap';
import styled from "styled-components";
import {
    useTable,
    useSortBy,
    useFilters,
    usePagination
} from "react-table";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import XLSX from "xlsx";
import JsPDF from "jspdf";
import "jspdf-autotable";
import BTable from 'react-bootstrap/Table';
import dataset from '../../Data/tempData/ic4pro_language.json';


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      margin: 0;
      width:auto;
      padding: 0.2rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
       background-color: lightblue;
      :last-child {
        border-right: 0;
      }
      
    }

     th,
    td {
      margin: 0;
      padding: 0.2rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      
      :last-child {
        border-right: 0;
      }
      
    }
    

    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
   padding-top: 0.6rem;
   padding-bottom: 0.6rem;
    display: inline - block;
    float: center;
  }
  .pagination button {
  float: left;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
   width: 18rem;
   color: white;
}
`


// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            style={{
                width: '100px',
                height: '10px'
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

const defaultColumn = {
    Filter: DefaultColumnFilter,
};

function getExportFileBlob({ columns, data, fileType, fileName }) {
    fileName = 'iC4Pro_regulators_dis_analysis';
    if (fileType === "csv") {
        // CSV example
        const headerNames = columns.map((col) => col.exportValue);
        const csvString = Papa.unparse({ fields: headerNames, data });
        return new Blob([csvString], { type: "text/csv" });
    } else if (fileType === "xlsx") {
        // XLSX example

        const header = columns.map((c) => c.exportValue);
        const compatibleData = data.map((row) => {
            const obj = {};
            header.forEach((col, index) => {
                obj[col] = row[index];
            });
            return obj;
        });

        let wb = XLSX.utils.book_new();
        let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
            header,
        });
        XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
        XLSX.writeFile(wb, `${fileName}.xlsx`);

        // Returning false as downloading of file is already taken care of
        return false;
    }
    //PDF example
    if (fileType === "pdf") {
        const headerNames = columns.map((column) => column.exportValue);
        const doc = new JsPDF();
        doc.autoTable({
            head: [headerNames],
            body: data,
            margin: { top: 20 },
            styles: {
                minCellHeight: 9,
                halign: "left",
                valign: "center",
                fontSize: 11,
            },
        });
        doc.save(`${fileName}.pdf`);

        return false;
    }

    // Other formats goes here
    return false;
}

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        exportData,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            getExportFileBlob,
        },
        useFilters,
        useSortBy,
        useExportData,
        usePagination
    );

    return (
        <>

            <div style={{
                display: 'inline-block'
            }}>

                <Dropdown as={ButtonGroup}
                    className="ml-1  mr-3"
                    style={{ padding: "0", border: 0, width: "18px", display: 'inline-block' }}
                >
                    <Dropdown.Toggle
                        variant="primary btn-md"
                        id="dropdown-basic"
                        style={{
                            backgroundColor: '#18615B',
                            height: '2rem',
                            borderRadius: '4px', border: 0,
                        }}>
                        Export CSV</Dropdown.Toggle>
                    <Dropdown.Menu style={{
                        backgroundColor: '#1EA1A3'
                    }}>

                        <Dropdown.Item

                            size="sm"
                            className="ml-1"
                            style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                            onClick={() => {
                                exportData("csv", true);
                            }}
                        >
                            1. Export All as CSV
                      </Dropdown.Item>


                        <Dropdown.Item

                            size="sm"
                            className="ml-1"
                            style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                            onClick={() => {
                                exportData("csv", false);
                            }}
                        >
                            2. Export Current View as CSV
                      </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>


                <Dropdown as={ButtonGroup}
                    className="ml-1  mr-3"
                    style={{
                        padding: "0",
                        border: 0,
                        width: "18px",
                        display: 'inline-block',

                    }}
                >
                    <Dropdown.Toggle
                        variant="primary btn-md"
                        id="dropdown-basic"
                        style={{
                            backgroundColor: '#8b7d7b', height: '2rem',
                            borderRadius: '4px', border: 0, marginLeft: '5rem',
                        }}>
                        Export XLSX</Dropdown.Toggle>
                    <Dropdown.Menu
                        style={{
                            backgroundColor: '#cdb7b5'
                        }}
                    >

                        <Dropdown.Item

                            size="sm"
                            className="ml-1"
                            style={{
                                height: '2.1rem',
                                borderRadius: '4px',
                                padding: '2px 2px 2px 2px',

                            }}
                            onClick={() => {
                                exportData("xlsx", true);
                            }}
                        >
                            1. Export All as XLSX
                      </Dropdown.Item>


                        <Dropdown.Item

                            size="sm"
                            className="ml-1"
                            style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                            onClick={() => {
                                exportData("xlsx", false);
                            }}
                        >
                            2. Export Current View as XLSX
                      </Dropdown.Item>


                    </Dropdown.Menu>
                </Dropdown>



                <Dropdown as={ButtonGroup}
                    className="ml-1  mr-3"
                    style={{
                        padding: "0",
                        border: 0,
                        width: "18px",
                        display: 'inline-block',

                    }}
                >
                    <Dropdown.Toggle
                        variant="primary btn-md"
                        id="dropdown-basic"
                        style={{
                            backgroundColor: '#8B1C62', height: '2rem',
                            borderRadius: '4px', border: 0, marginLeft: '10.4rem',
                        }}>
                        Export PDF</Dropdown.Toggle>
                    <Dropdown.Menu
                        style={{
                            backgroundColor: '#EE30A7'
                        }}>

                        <Dropdown.Item

                            size="sm"
                            className="ml-1"
                            style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                            onClick={() => {
                                exportData("pdf", true);
                            }}
                        >
                            1.  Export All as PDF
                      </Dropdown.Item>


                        <Dropdown.Item

                            size="sm"
                            className="ml-1"
                            style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                            onClick={() => {
                                exportData("pdf", false);
                            }}
                        >
                            2. Export Current View as PDF
                      </Dropdown.Item>


                    </Dropdown.Menu>
                </Dropdown>



                <Dropdown as={ButtonGroup}
                    className="ml-1  mr-3"
                    style={{
                        padding: "0",
                        border: 0,
                        width: "18px",
                        display: 'inline-block',

                    }}
                >
                    <Dropdown.Toggle
                        variant="primary btn-md"
                        id="dropdown-basic"
                        style={{
                            backgroundColor: ' #48c9b0  ', height: '2rem',
                            borderRadius: '4px', border: 0, marginLeft: '15.4rem',
                        }}>
                        print</Dropdown.Toggle>
                    <Dropdown.Menu
                        style={{
                            backgroundColor: ' #a3e4d7 '
                        }}>

                        <Dropdown.Item

                            size="sm"
                            className="ml-1"
                            style={{ height: '2.1rem', borderRadius: '4px', padding: '2px 2px 2px 2px' }}
                            onClick={() => {
                                window.print()
                            }}
                        >
                            1.  print
                      </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>


            </div>


            <BTable striped bordered hover size="sm" style={{ marginTop: '0.6rem' }} >
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    // Add the sorting props to control sorting. For this example
                                    // we can add them into the header props
                                    <th {...column.getHeaderProps()}>
                                        <span {...column.getSortByToggleProps()}>
                                            {column.render("Header")}
                                        </span>
                                        <div>
                                            {column.canFilter ? column.render("Filter") : null}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? " 🔽"
                                                        : " 🔼"
                                                    : ""}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </BTable>

            <div className="pagination">

                <button onClick={() => previousPage()} disabled={!canPreviousPage}
                    style={{
                        background: !canPreviousPage ? 'lightgray' : 'gray'
                    }}
                >
                    Previous
        </button>{' '}
                {' '}

                <span style={{
                    marginLeft: '7rem'
                }}>
                    Page <span style={{
                        display: 'inline-block',
                        width: '10px'
                    }}></span>
                    <strong>
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '40px', height: '5px' }}
                        /> of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span style={{
                    display: 'inline-block',
                    width: '3rem'
                }}></span>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{
                        height: '2.4rem'
                    }}
                >
                    {[5, 10, 15, 20, 25, 30, 40, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}  rows
                        </option>
                    ))}
                </select>

                <button onClick={() => nextPage()} disabled={!canNextPage}
                    style={{
                        background: !canNextPage ? 'lightgray' : 'gray',
                        marginLeft: '7rem'
                    }}>
                    Next
        </button>
            </div>


        </>
    );
}

function App() {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Language Id',
                accessor: 'ic4proLanguageId',
                width: 50
            },
            {
                Header: 'Language Name',
                accessor: 'ic4proLanguageName',
            },
            {
                Header: 'Language Native Name',
                accessor: 'ic4proLanguageNativeName',
            },
            {
                Header: 'Installed Date',
                accessor: 'ic4proInstalledDate',
            },
            {
                Header: 'Language',
                accessor: 'ic4proLanguage',
            },
            {
                Header: 'User Location',
                accessor: 'ic4proUserLocation',

            },
            {
                Header: 'Record Date',
                accessor: 'ic4proRecordDate',

            },
            {
                Header: 'Record Time',
                accessor: 'ic4proRecordTime',
            },
            {
                Header: 'Operator',
                accessor: 'ic4proOperator',
            },
            {
                Header: 'Operation',
                accessor: 'ic4proOperation',

            },
            {
                Header: 'Workstation',
                accessor: 'ic4proWorkstation',
            },
            {
                Header: 'Record Counter',
                accessor: 'ic4proRecordCounter',
            }
        ],
        []
    );

    function processData(dataset) {
        const result = Object.keys(dataset).map((key) => { return dataset[key]; });
        return result;
    }

    const data = React.useMemo(() => processData(dataset), []);

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    );
}

export default App;
