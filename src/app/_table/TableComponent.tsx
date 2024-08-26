'use client';

import type { ITableProps } from '@/app/_table/table';
import {
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import styles from './table.module.css';
import { useCallback, useEffect, useState } from 'react';
import { IDropdownColumnSort } from '@/app/_table/table';

// Make sure to use `T` directly without modifying the structure
const TableComponent = <T,>({ selectSortingOption, data, defaultColumns }: ITableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dropdownSorting, setDropdownSorting] = useState<IDropdownColumnSort>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable<T>({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    enableSorting: true,
    enableSortingRemoval: true,
    autoResetPageIndex: false,
    maxMultiSortColCount: 2,
    isMultiSortEvent: (e) => false,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    if (selectSortingOption && selectSortingOption.length > 0) {
      const newSortCondition = selectSortingOption.map((i) => {
        return { id: i.id, desc: i.desc };
      });
      setSorting([newSortCondition[0]]);
      setDropdownSorting(selectSortingOption[0]);
    }
  }, []);

  return (
    <>
      <p>filter: {sorting.map((i) => i.id).join(',')}</p>
      <div className={styles.tableHead}>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {selectSortingOption && selectSortingOption.length > 0 && (
          <select
            value={dropdownSorting?.id}
            onChange={(e) => {
              const findItem = selectSortingOption?.find((i) => i.id === e.currentTarget.value);
              if (findItem) {
                // table.setSorting((prev) => [...prev, { id: findItem.id, desc: findItem?.desc }]);
                setSorting((prev) => {
                  const findWithoutSelectSortingOption = prev.filter(
                    (i) => !selectSortingOption.map((item) => item.id).includes(i.id),
                  );
                  if (findWithoutSelectSortingOption) {
                    return [...findWithoutSelectSortingOption, findItem];
                  }
                  return [findItem];
                });
                setDropdownSorting(findItem);
              }
            }}
          >
            {selectSortingOption.map((i) => (
              <option key={i.id} value={i.id}>
                Filter {i.id}
              </option>
            ))}
          </select>
        )}
      </div>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ minWidth: header.getSize(), maxWidth: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <button
                          type='button'
                          className={
                            header.column.getCanSort()
                              ? `${styles.btn} ${styles.btn_sortable}`
                              : `${styles.btn} ${styles.btn_sortDisable}`
                          }
                          value={header.id}
                          onClick={() => {
                            const currentDesc =
                              header.column.getNextSortingOrder() === 'asc'
                                ? false
                                : header.column.getNextSortingOrder() === 'desc'
                                  ? true
                                  : undefined;

                            header.column.toggleSorting(currentDesc, true);
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          <span>
                            {header.column.getCanSort()
                              ? ({
                                  asc: ' 🔼',
                                  desc: ' 🔽',
                                }[header.column.getIsSorted() as string] ?? '')
                              : ''}
                          </span>
                        </button>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} style={{ minWidth: cell.column.getSize(), maxWidth: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        <button className='border rounded p-1' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <button
          className='border rounded p-1'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
    </>
  );
};

export default TableComponent;
