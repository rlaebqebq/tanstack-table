import { ColumnDef } from '@tanstack/react-table';

import TableComponent from '@/app/_table/TableComponent';
import mockData from '@/app/_table/mockdata.json';
import { NextPage } from 'next';
import TablePage from '@/app/_table/TablePage';

export interface IMockDataItem {
  id: number;
  isActive: boolean;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  registered: string;
}

const fetchMockData = (): Promise<IMockDataItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 1000);
  });
};

const Page: NextPage = async () => {
  const data = await fetchMockData();

  return <TablePage data={data} />;
};
export default Page;
