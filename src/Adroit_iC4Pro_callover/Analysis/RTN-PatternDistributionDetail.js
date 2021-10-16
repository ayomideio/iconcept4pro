import React from 'react'
import styled from 'styled-components'
import {
    useTable,
    usePagination,
    useSortBy,
    useFilters,
    useGroupBy,
    useExpanded,
    useRowSelect,
} from 'react-table'
import { matchSorter } from 'match-sorter'

import makeData from '../../Data/tempData/ic4pro_callovertransaction_data.json'


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

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
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
            filterTypes,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData,
            // We also need to pass this so the page doesn't change
            // when we edit the data.
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
        // Here we will use a plugin to add our selection column
        hooks => {
            hooks.visibleColumns.push(columns => {
                return [
                    {
                        id: 'selection',
                        // Make this column a groupByBoundary. This ensures that groupBy columns
                        // are placed after it
                        groupByBoundary: true,
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]
            })
        }
    )

    // Render the UI for your table
    return (
        <>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    <div>
                                        {column.canGroupBy ? (
                                            // If the column can be grouped, let's add a toggle
                                            <span {...column.getGroupByToggleProps()}>
                                                {column.isGrouped ? '🛑 ' : '👊 '}
                                            </span>
                                        ) : null}
                                        <span {...column.getSortByToggleProps()}>
                                            {column.render('Header')}
                                            {/* Add a sort direction indicator */}
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </div>
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (


                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.isGrouped ? (
                                                // If it's a grouped cell, add an expander and row count
                                                <>
                                                    <span {...row.getToggleRowExpandedProps()}>
                                                        {row.isExpanded ? '👇' : '👉'}
                                                    </span>{' '}
                                                    {cell.render('Cell', { editable: false })} (
                                                    {row.subRows.length})
                                                </>
                                            ) : cell.isAggregated ? (
                                                // If the cell is aggregated, use the Aggregated
                                                // renderer for cell
                                                cell.render('Aggregated')
                                            ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                                // Otherwise, just render the regular cell
                                                cell.render('Cell', { editable: false })
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>

                        )
                    })}
                </tbody>
            </table>

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


const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    }
)

function App(props) {


    const columns = React.useMemo(
        () => [
            {
                Header: 'Transaction Ref Id',
                accessor: 'IC4PROTRANSREFID',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Transaction Id',
                accessor: 'ic4proTransId',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Transaction Sub Id',
                accessor: 'ic4proTransSubId',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },

            {
                Header: 'Branch Code',
                accessor: 'ic4pro_branchCode',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Account Id',
                accessor: 'ic4proAccountId',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Acct Sort Code',
                accessor: 'ic4proAcctSortCode',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Account Name',
                accessor: 'ic4proAccountName',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Lcy Amount',
                accessor: 'ic4proLcyAmount',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Lcy Code',
                accessor: 'ic4proLcyCode',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Fcy Amount',
                accessor: 'ic4proFcyAmount',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Fcy Code',
                accessor: 'ic4proFcyCode',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Transaction Code',
                accessor: 'ic4proTransCode',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Transaction Type',
                accessor: 'ic4proTransType',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Cheque Number',
                accessor: 'ic4proChequeNo',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Narrative',
                accessor: 'ic4proNarrative',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Value',
                accessor: 'ic4proValueDate',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Booking Date',
                accessor: 'ic4proBookingDate',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Posting Date',
                accessor: 'ic4proPostingDate',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Entry Date',
                accessor: 'ic4pro_entryDate',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            }, {
                Header: 'Entry Time',
                accessor: 'ic4proEntryTime',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Inputter',
                accessor: 'ic4proInputter',
                aggregate: 'count',
                Aggregated: ({ value }) => `${value} Total`,
            },
            {
                Header: 'Authoriser',
                accessor: 'ic4proAuthoriser',
                aggregate: 'uniqueCount',
                Aggregated: ({ value }) => `${value} Unique Date`,
            }
        ],

        []
    )


    function processData(dataset) {
        const result = Object.keys(dataset).map((key) => { return dataset[key]; });
        return result;
    }
    alert(`dataaaaaaaaaaaa ${JSON.stringify(props)}`)

    const [data, setData] = React.useState(() => processData(props.data), [])
    // const [originalData] = React.useState(data)

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.
    const skipResetRef = React.useRef(false)

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        skipResetRef.current = true
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    // After data changes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        skipResetRef.current = false
    }, [data])

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...


    return (
        <Styles>

            <Table
                columns={columns}
                data={data}
                updateMyData={updateMyData}
                skipReset={skipResetRef.current}
            />
        </Styles>
    )
}

export default App

