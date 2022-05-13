import type { HTMLProps } from 'react';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { Link } from '../Link';
import { PageGrid } from '../PageGrid';

export type DataTableProps = {
  /** Data to display */
  data: { [accessor: string]: { label: string; href?: string }[] }[];
  /** Columns for the table */
  columns: Column[];
} & HTMLProps<HTMLTableElement>;

/**
 * ### Full page table for displaying data from the timeline
 * #### Optimised for desktop only
 */
export function DataTable({ data, columns, className = '' }: DataTableProps) {
  const table = useTable({
      columns: useMemo(() => columns, [columns]) as any,
      data: useMemo(() => data, [data])
    }),
    { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      table;

  const renderItem = (item: any, i: number) =>
    item.href ? (
      <Link
        className="block underline transition-colors hover:text-red"
        href={item.href}
        key={i}
      >
        {item.label}
      </Link>
    ) : (
      <span className="block" key={i}>
        {item.label}
      </span>
    );

  return (
    <>
      {/* Mobile list */}
      <PageGrid className="mt-5 text-xs lg:hidden font-ui">
        <div>
          {data.map((item, i) => (
            <ul className="mb-24" key={i}>
              {columns.map(({ Header, accessor }) => (
                <li
                  className="grid grid-cols-2 p-[12px] odd:bg-grey-100"
                  key={accessor as string}
                >
                  <span className="font-bold">{Header}</span>
                  <span>{item[accessor as any].map(renderItem)}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </PageGrid>

      {/* Desktop table */}
      <table
        className={`hidden text-md lg:table w-full ${className}`}
        {...getTableProps()}
      >
        <thead className="border-b">
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column: any, i: number) => (
                <th
                  className="first:pl-[3vw] last:pr-[3vw] p-4 text-left"
                  {...column.getHeaderProps()}
                  key={i}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="odd:bg-grey-100" {...row.getRowProps()} key={i}>
                {row.cells.map((cell, i) => (
                  <td
                    className="first:pl-[3vw] last:pr-[3vw] p-4"
                    {...cell.getCellProps()}
                    key={i}
                  >
                    {cell.value.map(renderItem)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
