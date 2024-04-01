import { useRef, useState, useContext } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { History, Language, Person, Translate, Widgets } from '@mui/icons-material';
import { UserContext } from 'src/contexts/UserContext';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
        display: flex;
        align-items: center;
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const { username } = useContext(UserContext);
  const user = {
    name: '@' + username,
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Super Admin'
  };
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleSignOut = () => {
    logout();
  }

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        {/* <Avatar variant="rounded" alt={user.name} src={user.avatar} /> */}
        <Person />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} >
          {/* <Avatar variant="rounded" alt={user.name} src={user.avatar} /> */}
          <Person />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/management/blogs" component={NavLink}>
            {/* <AccountBoxTwoToneIcon fontSize="small" /> */}
            <Widgets />
            <ListItemText primary="Blogs" />
          </ListItem>
          <ListItem button to="/management/languages" component={NavLink}>
            {/* <InboxTwoToneIcon fontSize="small" /> */}
            <Language />
            <ListItemText primary="Languages" />
          </ListItem>
          <ListItem
            button
            to="/management/dictionaries"
            component={NavLink}
          >
            {/* <AccountTreeTwoToneIcon fontSize="small" /> */}
            <Translate />
            <ListItemText primary="Dictionary" />
          </ListItem>
          <ListItem
            button
            to="/management/logging"
            component={NavLink}
          >
            <History />
            <ListItemText primary="Logging" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            onClick={handleSignOut}
            color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
