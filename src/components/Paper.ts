import { Paper, styled } from "@mui/material";

export const ItemPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  margin: '10px',
  padding: '7px'
}));