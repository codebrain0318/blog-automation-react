import { Box, styled, Tooltip } from '@mui/material';

const CollapseWrapper = styled(Box)(
    () => `
        position: absolute;
        top: 20px;
        right: 20px;
    `
)

function Collapse() {
  return (
    <CollapseWrapper>
        <img src='/static/images/sidebar/collapse.svg' />
    </CollapseWrapper>
  );
}

export default Collapse;
