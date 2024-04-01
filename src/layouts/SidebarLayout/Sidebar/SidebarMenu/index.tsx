import { useContext } from 'react';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import WidgetsIcon from '@mui/icons-material/Widgets';
import { History, Language, Translate } from '@mui/icons-material';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.primary.light};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          font-weight: 600;
          display: flex;
          color: ${theme.colors.primary.light};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.primary.light};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.primary.dark};
            font-weight: bold;

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.primary.dark};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    'transform',
    'opacity'
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Main Menu
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <SubMenuWrapper>
                <List component="div">
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/management/blogs"
                      startIcon={<WidgetsIcon />}
                    >
                      Content
                    </Button>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/management/languages"
                      startIcon={<Language />}
                    >
                      Languages
                    </Button>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/management/dictionaries"
                      startIcon={<Translate />}
                    >
                      Dictionary
                    </Button>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/management/logging"
                      startIcon={<History />}
                    >
                      Logging
                    </Button>
                  </ListItem>
                </List>
              </SubMenuWrapper>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
