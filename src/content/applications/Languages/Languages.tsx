import { Card } from '@mui/material';
import LanguagesTable from './LanguagesTable';
import { LanguageType } from 'src/models/language';

function RecentOrders() {
  const languages: LanguageType[] = [
    {
      id: '1',
      name: "English",
      url: "http://english.com",
      username: "username1",
      password: "password1"
    },
    {
      id: '2',
      name: "German",
      url: "http://germany.com",
      username: "username2",
      password: "password2"
    },
    {
      id: '3',
      name: "Italian",
      url: "http://italian.com",
      username: "username3",
      password: "password3"
    },
  ];

  return (
    <Card>
      <LanguagesTable/>
    </Card>
  );
}

export default RecentOrders;
