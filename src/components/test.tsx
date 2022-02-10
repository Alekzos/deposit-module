import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Icon, { IconProps } from '@mui/material/Icon';
import { Tooltip } from '@mui/material';
import HelpOutline from '@mui/icons-material/HelpOutline';
import DeleteIcon from '@mui/icons-material/Delete';

// const WrappedIcon = (props: IconProps) => <Icon {...props} />;

const WrappedIcon = (props: IconProps) =>  
<Tooltip title="Информация о сроках">
        <h1>?</h1>
</Tooltip>;


WrappedIcon.muiName = 'Icon';


WrappedIcon.muiName = 'Icon';

export default function Composition() {
  return (
    <div>


      <IconButton>
        <WrappedIcon>1<HelpOutline /></WrappedIcon>
      </IconButton>
    </div>
  );
}