import React from 'react'
import {
  Row,
  Col,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap'
import styled from 'styled-components';
import {
  useTable,
  useGroupBy,
  useExpanded,
  useSortBy,
  useFilters,
  usePagination,
  useRowSelect,
} from 'react-table';
import { matchSorter } from 'match-sorter';
import BTable from 'react-bootstrap/Table';
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import XLSX from "xlsx";
import JsPDF from "jspdf";
import "jspdf-autotable";
import dataset from '../../Data/tempData/ic4pro_language.json';

const DistributionHistory = () => {


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
       background-color: rgb(102, 153, 204);
       color:white;
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
#dropdown :hover{
  background-color: #1aa3ff;
  color: white;
}

`


  // Create an editable cell renderer
  const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
    editable,
  }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
      setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
      updateMyData(index, id, value)
    }

    // If the initialValue is changed externall, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    if (!editable) {
      return `${initialValue}`
    }

    return <input value={value} onChange={onChange} onBlur={onBlur} />
  }

  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length

    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }



  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

  // Be sure to pass our updateMyData and the skipReset option
  function Table({ columns, data, updateMyData, skipReset }) {
    const filterTypes = React.useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
              ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
              : true
          })
        },
      }),
      []
    )

    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
        // And also our default editable cell
        Cell: EditableCell,
      }),
      []
    )


    //Export Function
    function getExportFileBlob({ columns, data, fileType, fileName }) {
      fileName = 'iC4Pro_regulators'
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

    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      gotoPage,
      nextPage,
      exportData,
      previousPage,
      setPageSize,
      state: {
        pageIndex,
        pageSize,

      },
    } = useTable(
      {
        columns,
        data,
        defaultColumn,
        getExportFileBlob,
        filterTypes,
        updateMyData,
        autoResetPage: !skipReset,
        autoResetSelectedRows: !skipReset,
        disableMultiSort: true,
      },
      useFilters,
      useGroupBy,
      useSortBy,
      useExpanded,
      usePagination,
      useRowSelect,
      useExportData
    )

    return (
      <>


        <Row >

          <Col
            style={{
              marginLeft: '1.1rem',
              padding: '0.5rem 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: '#0aff0082',
                padding: '0.5rem',
              }}
            >
              Grouped
      </span>{' '}
            <span
              style={{
                display: 'inline-block',
                background: '#ffa50078',
                padding: '0.5rem',
              }}
            >
              Aggregated
      </span>{' '}
            <span
              style={{
                display: 'inline-block',
                background: '#ff000042',
                padding: '0.5rem',
              }}
            >
              Repeated Value
      </span>

            <Dropdown as={ButtonGroup}
              className="ml-1  mr-3"
              style={{
                padding: '0rem',
                border: 0,
                width: "18px"
              }}
            >
              <Dropdown.Toggle
                variant="primary btn-md"
                id="dropdown-basic"
                style={{
                  backgroundColor: 'blue',
                  borderRadius: '4px',
                  border: 0,
                  padding: '0.5rem',
                  marginBottom: '0.4rem'
                }}>
                Export/Download</Dropdown.Toggle>
              <Dropdown.Menu id="dropdown"
                style={{
                  background: 'lightblue',

                }}>

                <Dropdown.Item
                  size="sm"
                  className="ml-1"
                  style={{
                    height: '2.1rem',
                    borderRadius: '4px',
                    padding: '2px 2px 2px 2px',
                  }}
                  onClick={() => {
                    exportData("csv", true);
                  }}
                >
                  1. Export All as CSV
                      </Dropdown.Item>

                <Dropdown.Item
                  size="sm"
                  className="ml-1"
                  style={{
                    height: '2.1rem',
                    borderRadius: '4px',
                    padding: '2px 2px 2px 2px',
                  }}
                  onClick={() => {
                    exportData("csv", false);
                  }}
                >
                  2. Export Current View as CSV
                      </Dropdown.Item>

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
                  3. Export All as xlsx
                      </Dropdown.Item>

                <Dropdown.Item
                  size="sm"
                  className="ml-1"
                  style={{
                    height: '2.1rem',
                    borderRadius: '4px',
                    padding: '2px 2px 2px 2px',
                  }}
                  onClick={() => {
                    exportData("xlsx", false);
                  }}
                >
                  4. Export Current View as xlsx
                      </Dropdown.Item>

                <Dropdown.Item
                  size="sm"
                  className="ml-1"
                  style={{
                    height: '2.1rem',
                    borderRadius: '4px',
                    padding: '2px 2px 2px 2px',
                  }}
                  onClick={() => {
                    exportData("pdf", true);
                  }}
                >
                  5. Export All as PDF
                      </Dropdown.Item>

                <Dropdown.Item
                  size="sm"
                  className="ml-1"
                  style={{
                    height: '2.1rem',
                    borderRadius: '4px',
                    padding: '2px 2px 2px 2px',
                  }}
                  onClick={() => {
                    exportData("pdf", false);
                  }}
                >
                  6. Export Current View as PDF
                      </Dropdown.Item>

              </Dropdown.Menu>
            </Dropdown>


          </Col>


        </Row>




        <BTable striped bordered hover size="sm" >

          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.canGroupBy ? (
                        // If the column can be grouped, let's add a toggle
                        <span {...column.getGroupByToggleProps()}>
                          {column.isGrouped ? '🛑 ' : '👊 '}
                        </span>
                      ) : null}
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (

                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          // For educational purposes, let's color the
                          // cell depending on what type it is given
                          // from the useGroupBy hook
                          {...cell.getCellProps()}
                          style={{
                            background: cell.isGrouped
                              ? '#0aff0082'
                              : cell.isAggregated
                                ? '#ffa50078'
                                : cell.isPlaceholder
                                  ? '#ff000042'
                                  : 'white',
                          }}
                        >


                          {cell.isGrouped ? (
                            // If it's a grouped cell, add an expander and row count
                            <>
                              <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded ? '👇' : '👉'}
                              </span>{' '}
                              {cell.render('Cell')} ({row.subRows.length})
                            </>
                          ) : cell.isAggregated ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            cell.render('Cell')
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </BTable>
        {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}

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
    )
  }

  // Define a custom filter filter function!
  function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
      const rowValue = row.values[id]
      return rowValue >= filterValue
    })
  }

  // This is an autoRemove method on the filter function that
  // when given the new filter value and returns true, the filter
  // will be automatically removed. Normally this is just an undefined
  // check, but here, we want to remove the filter if it's not a number
  filterGreaterThan.autoRemove = val => typeof val !== 'number'


  const columns = React.useMemo(
    () => [
      {
        Header: 'Language ID',
        accessor: 'ic4proLanguageId',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} Total`,
      },
      {
        Header: 'Language Name',
        accessor: 'ic4proLanguageName',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} Total`,
      },
      {
        Header: 'Language Native Name',
        accessor: 'ic4proLanguageNativeName',
        aggregate: 'count',
        Aggregated: ({ value }) => `${value} Total`,
      },
      {
        Header: 'Installed Date',
        accessor: 'ic4proInstalledDate',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Date`,
      },
      {
        Header: 'Language',
        accessor: 'ic4proLanguage',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Language`,
      },
      {
        Header: 'User Location',
        accessor: 'ic4proUserLocation',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Location`,
      },
      {
        Header: 'Record Date',
        accessor: 'ic4proRecordDate',
        aggregate: 'min',
        Aggregated: ({ value }) => `${value} Lowest Date `,
      },
      {
        Header: 'Operator',
        accessor: 'ic4proOperator',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Operator`,
      },
      {
        Header: 'Operation',
        accessor: 'ic4proOperation',

      },
      {
        Header: 'Workstation',
        accessor: 'ic4proWorkstation',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Workstation`,
      },
      {
        Header: 'Mininum',
        accessor: 'ic4proRecordCounter',
        id: 'fatai',
        aggregate: 'min',
        Aggregated: ({ value }) => `${value} (Mininum/Maximum)`,
      },
      {
        Header: 'Maximum',
        accessor: 'ic4proRecordCounter',
        id: 'akeem',
        aggregate: 'max',
        Aggregated: ({ value }) => `${value} (Maximum)`,
      },
      {
        Header: 'Average',
        accessor: 'ic4proRecordCounter',
        id: 'adroit',
        aggregate: 'average',
        Aggregated: ({ value }) => `${value} (Average)`,
      },
      {
        Header: 'Deleter',
        accessor: 'ic4proDeleter',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value} Unique Deleter`,
      },
      {
        Header: 'Date Deleted',
        accessor: 'ic4proDateDeleted',
        aggregate: 'min',
        Aggregated: ({ value }) => `${value} Lowest Date Deleted`,
      },

      {
        Header: 'Terminal',
        accessor: 'ic4proTerminal',
        aggregate: 'uniqueCount',
        Aggregated: ({ value }) => `${value}  Unique Terminal`,
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
    <div>
      <Styles>

        <Table columns={columns} data={data} />
      </Styles>



    </div>
  )




}
export default DistributionHistory;



