import { Card } from '@mui/material';
import RecentOrdersTable from './DictionariesTable';
import { DictionaryType } from 'src/models/dictionary';

function RecentOrders() {
  const dictionaries: DictionaryType[] = [
    {
      id: '1', language: "English", badEntry: "super", rightEntry: "super"
    },
    {
      id: '2', language: "French", badEntry: "hello", rightEntry: "hello"
    },
    {
      id: '3', language: "French", badEntry: "apple", rightEntry: "apple"
    },
    {
      id: '4', language: "German", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '5', language: "Italian", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '6', language: "Italian", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '7', language: "Italian", badEntry: "hello", rightEntry: "hello"
    },
    {
      id: '8', language: "Italian", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '9', language: "English", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '10', language: "English", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '11', language: "English", badEntry: "hello", rightEntry: "hello"
    },
    {
      id: '12', language: "German", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '13', language: "German", badEntry: "dog", rightEntry: "dog"
    },
    {
      id: '14', language: "German", badEntry: "dog", rightEntry: "dog"
    }
  ];

  return (
    <Card>
      <RecentOrdersTable />
    </Card>
  );
}

export default RecentOrders;
