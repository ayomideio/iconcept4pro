import React from 'react';
import styled from 'styled-components';
import { useTable, useGroupBy, useExpanded } from 'react-table';
import dataset from '../Data/ic4pro_operations.json';

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


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useGroupBy,
    useExpanded // useGroupBy would be pretty useless without useExpanded ;)
  )

  // We don't want to render all of the rows for this example, so cap
  // it at 100 for this use case
  const firstPageRows = rows.slice(0, 100)

  

  return (
    <>
      {/* <pre>
        <code>{JSON.stringify({ groupBy, expanded }, null, 2)}</code>
      </pre> */}
      <Legend />
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
          {firstPageRows.map((row, i) => {
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
      <br />
      <div>Showing the first 100 results of {rows.length} rows</div>
    </>
  )
}

function Legend() {
  return (
    <div
      style={{
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
    </div>
  )
}

function ExpandTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'Operation ID',
            accessor: 'ic4proOperationID',
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Operation ID`,
          },
          {
            Header: 'Model Id',
            accessor: 'ic4proModelId',
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Model ID`,
          },
          {
            Header: 'Function',
            accessor: 'ic4proFunction',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Function`,
          },
          {
            Header: 'Description',
            accessor: 'ic4proDescription',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Description`,
          },
          {
            Header: 'Function Color',
            accessor: 'ic4proFunctionColor',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Function Color`,
          },
          {
            Header: 'Notifier',
            accessor: 'ic4proNotifier',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Notifier`,
          },
          {
            Header: 'Operation Message',
            accessor: 'ic4proOperationMsg',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Operation Message`,
          },
          {
            Header: 'Send OTP',
            accessor: 'ic4proSendOTP',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Send OTP`,
          },
          {
            Header: 'OTP Message',
            accessor: 'ic4proOtpMessage',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} OTP Message`,
          },
          {
            Header: 'Language',
            accessor: 'ic4proLanguage',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Language`,
          },
          {
            Header: 'User Location',
            accessor: 'ic4proUserLocation',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} User Location`,
          },
          {
            Header: 'Record Date',
            accessor: 'ic4proRecordDate',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Record Date`,
          },
          {
            Header: 'Record Time',
            accessor: 'ic4proRecordTime',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Record Time`,
          },
          {
            Header: 'Operator',
            accessor: 'ic4proOperator',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Operator`,
          },
          {
            Header: 'Operation',
            accessor: 'ic4proOperation',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Operation`,
          },
          {
            Header: 'Workstation',
            accessor: 'ic4proWorkstation',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Workstation`,
          },
          {
            Header: 'Record Counter',
            accessor: 'ic4proRecordCounter',
            aggregate: 'sum',
            Aggregated: ({ value }) => `${value} (total)`,
          },
          {
            Header: 'Modifier',
            accessor: 'ic4proModifier',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Modifier`,
          },
          {
            Header: 'Date Modified',
            accessor: 'ic4proDateModified',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Modified`,
          },
          {
            Header: 'Time Modified',
            accessor: 'ic4proTimeModified',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Time Modified`,
          },
          {
            Header: 'Modifier Terminal',
            accessor: 'ic4proModifierTerminal',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Modifier Terminal`,
          },
        ],
      },
      // {
      //   Header: 'Info',
      //   columns: [
      //     {
      //       Header: 'Age',
      //       accessor: 'age',
      //       // Aggregate the average age of visitors
      //       aggregate: 'average',
      //       Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`,
      //     },
      //     {
      //       Header: 'Visits',
      //       accessor: 'visits',
      //       // Aggregate the sum of all visits
      //       aggregate: 'sum',
      //       Aggregated: ({ value }) => `${value} (total)`,
      //     },
      //     {
      //       Header: 'Status',
      //       accessor: 'status',
      //     },
      //     {
      //       Header: 'Profile Progress',
      //       accessor: 'progress',
      //       // Use our custom roundedMedian aggregator
      //       aggregate: roundedMedian,
      //       Aggregated: ({ value }) => `${value} (med)`,
      //     },
      //   ],
      // },
    ],
    []
  )

  function processData(dataset) {
    const result = Object.keys(dataset).map((key) => {return dataset[key]; });
    return result;
  }

  const data = React.useMemo(() => processData(dataset), []);

  // const data = React.useMemo(() => makeData(10000), [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default ExpandTable
