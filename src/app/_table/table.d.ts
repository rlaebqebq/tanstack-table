import { ReactNode } from 'react';
import type { ColumnDef, ColumnSort, SortingState } from '@tanstack/react-table';

// Define TRenderableValue
type TRenderableValue = string | number | boolean | null | undefined | ReactNode;

// Adjust ITableProps to handle ColumnDef
interface ITable<T> {
  defaultColumns: ColumnDef<T, any>[];
  data: T[];
}

interface IDropdownColumnSort extends ColumnSort {
  label: string;
}

export interface ITableProps<T> extends ITable<T> {
  selectSortingOption?: IDropdownColumnSort[];
}
