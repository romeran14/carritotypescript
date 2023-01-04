import styled from 'styled-components';
import { IconButton } from '@mui/material';

export const Wrapper = styled.div`
  margin: 40px;
  .MuiGrid-root.css-vj1n65-MuiGrid-root{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;