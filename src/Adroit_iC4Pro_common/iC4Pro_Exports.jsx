import React from "react";
import {
   Button
} from 'react-bootstrap';
import styled from "styled-components";
import { useTable, useSortBy, useFilters } from "react-table";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import XLSX from "xlsx";
import JsPDF from "jspdf";
import "jspdf-autotable";



// import makeData from "./makeData";
import dataset from '../Adroit_iC4Pro_language/Data/ic4pro_language.json'

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

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
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
            placeholder={`Search ${count} records...`}
        />
    );
}

const defaultColumn = {
    Filter: DefaultColumnFilter,
};

function getExportFileBlob({ columns, data, fileType, fileName }) {
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
        rows,
        prepareRow,
        exportData,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            getExportFileBlob,
        },
        useFilters,
        useSortBy,
        useExportData
    );

    return (
        <>
            <Button
                size="sm"
                className="ml-1"
                style={{
                    height: '2rem',
                    backgroundColor: "#18615B",
                    marginLeft: '0.5rem',
                    border: 'none'
                }}

                onClick={() => {
                    exportData("csv", true);
                }}
            >
                Export All as CSV
      </Button>{" "}
            <Button
                size="sm"
                className="ml-1"
                style={{
                    height: '2rem',
                    backgroundColor: "#1EA1A1",
                    marginLeft: '0.5rem',
                    border: 'none'
                }}
                onClick={() => {
                    exportData("csv", false);
                }}
            >
                Export Current View as CSV
      </Button>{" "}
            <Button
                size="sm"
                className="ml-1"
                style={{
                    height: '2rem',
                    backgroundColor: "#8b7d7b",
                    marginLeft: '0.5rem',
                    border: 'none'
                }}
                onClick={() => {
                    exportData("xlsx", true);
                }}
            >
                Export All as xlsx
      </Button>{" "}
            <Button
                size="sm"
                className="ml-1"
                style={{
                    height: '2rem',
                    backgroundColor: "#cdb7b5",
                    marginLeft: '0.5rem',
                    border: 'none'
                }}
                onClick={() => {
                    exportData("xlsx", false);
                }}
            >
                Export Current View as xlsx
      </Button>{" "}
            <Button
                size="sm"
                className="ml-1"
                style={{
                    height: '2rem',
                    backgroundColor: "#8B1C62",
                    marginLeft: '0.5rem',
                    border: 'none'
                }}
                onClick={() => {
                    exportData("pdf", true);
                }}
            >
                Export All as PDF
      </Button>{" "}
            <Button
                size="sm"
                className="ml-1"
                style={{
                    height: '2rem',
                    backgroundColor: "#EE30A7",
                    marginLeft: '0.5rem',
                    border: 'none'
                }}
                onClick={() => {
                    exportData("pdf", false);
                }}
            >
                Export Current View as PDF
      </Button>
            
            <table {...getTableProps()}
            style={{marginTop:'0.6rem'}}>
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
                    {rows.map((row, i) => {
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
          
            <br />
            <div>Showing the results of {rows.length} rows</div>
        </>
    );
}

function App() {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Language Details',
                columns: [
                    {
                        Header: 'Language ID',
                        accessor: 'ic4proLanguageId',
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
                        },
                    
                ],
            },

        ],
        []
    )


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
