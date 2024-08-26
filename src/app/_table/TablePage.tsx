'use client';

import type { ColumnDef, SortingState } from '@tanstack/react-table';

import TableComponent from '@/app/_table/TableComponent';
import type { IMockDataItem } from '@/app/page';
import { IDropdownColumnSort } from '@/app/_table/table';

const TablePage = ({ data }: { data: IMockDataItem[] }) => {
  const defaultColumns: ColumnDef<IMockDataItem, any>[] = [
    { header: 'ID', accessorKey: 'id', size: 30 },
    {
      header: 'Active',
      accessorKey: 'isActive',
      size: 60,
      cell: ({ row }) => (row.getValue('isActive') ? 'Y' : 'N'),
    },
    { header: 'Name', accessorKey: 'name', size: 160 },
    { header: 'Company', accessorKey: 'company', size: 160 },
    { header: 'Email', accessorKey: 'email', size: 160 },
    { header: 'Phone', accessorKey: 'phone', size: 160 },
    { header: 'Registered', accessorKey: 'registered', enableSorting: false },
    { header: 'Gender', accessorKey: 'gender', enableSorting: false, size: 60 },
  ];

  const selectSortingOption: IDropdownColumnSort[] = [
    { id: 'gender', label: '성별', desc: false },
    { id: 'registered', label: '등록일', desc: true },
  ];

  return <TableComponent selectSortingOption={selectSortingOption} defaultColumns={defaultColumns} data={data} />;
};

export default TablePage;
