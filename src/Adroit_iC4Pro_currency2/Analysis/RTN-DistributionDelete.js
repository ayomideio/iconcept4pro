import React from 'react'
import styled from 'styled-components'
import { useTable, useGroupBy, useExpanded } from 'react-table'
import dataset from '../../Data/tempData/ic4pro_currencyDataDelete.json';

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
      <div>Showing the results of {rows.length} rows</div>
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
        Header: 'Currency Details',
        
        columns: [
          
          {
            Header: 'Currency Code',
            accessor: 'ic4proCurrencyCode',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Total`,
          },
          {
            Header: 'Currency Name',
            accessor: 'ic4proCurrencyName',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Total`,
          },
          {
            Header: 'Rank',
            accessor: 'ic4proRank',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Total`,
          },
          {
            Header: 'Buy Rate',
            accessor: 'ic4proBuyRate',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} TOtal`,
          },
          {
            Header: 'Sell Rate',
            accessor: 'ic4proSellRate',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Total`,
          },
          {
            Header: 'Mid Rate',
            accessor: 'ic4proMidRate',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Total`,
          },
          {
            Header: 'Buy Rate USD Eqv',
            accessor: 'ic4proBuyRateUsdEqv',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Total`,
          },
          {
            Header: 'Sell Rate USD Eqv',
            accessor: 'ic4proSellRateUsdEqv',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Total`,
          },
          {
            Header: 'Mid Rate USD Eqv',
            accessor: 'ic4proMidRateUsdEqv',
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Total`,
          },

          {
            Header: 'Rate Date',
            accessor: 'ic4proRateDate',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Date`,
          },
          {
            Header: 'Rate Time',
            accessor: 'ic4proRateTime',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Time`,
          },

          {
            Header: 'Libor Rate',
            accessor: 'ic4proLiborRate',
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Libor`,
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
      },
     
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
