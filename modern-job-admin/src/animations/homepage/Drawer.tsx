import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Menu } from 'lucide-react';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import PaymentIcon from '@mui/icons-material/Payment';
import { useRouter } from 'next/navigation';
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Users', 'Jobs'].map((text:string, index:number) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => text === 'Users' ? router.push('/users') : router.push('/jobs')}>
              <ListItemIcon>
                {index % 2 === 0 ? <GroupIcon /> : <WorkIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Applications', 'Payments'].map((text:string, index:number) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>text === 'Applications'?router.push('/applications'):router.push('/payments')}>
              <ListItemIcon>
                {index % 2 === 0 ? <SpeakerNotesIcon /> : <PaymentIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>          <Menu  className="text-gray-700 cursor-pointer" />      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
