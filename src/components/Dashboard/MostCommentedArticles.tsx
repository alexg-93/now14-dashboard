import React from 'react';
import { useMostCommentedArticles } from '../../hooks/useDashboard';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';

export const MostCommentedArticles = () => {
    
  const { data : MostCommentedArticles, isLoading, isError, error } = useMostCommentedArticles();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} className="px-5 max-h-[50vh]" sx={{backgroundColor: '#3E3F58',scrollbarWidth: 'thin'}}>
      <Typography className="text-white text-center bg-[#3E3F58] p-2" variant="h4">{'הכי הרבה תגובות'}</Typography>
      <Table className="bg-[#3E3F58]" sx={{direction: 'rtl'}}>
        {/* Table Header */}
        <TableHead className="bg-[#616276]">
          <TableRow>
            
            <TableCell align="left" sx={{ borderBottom: 'none' }}>
              <Typography className="text-white" variant="h6">
                {`כתב`}
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: 'none' }}>
              <Typography className="text-white" variant="h6">
                {`כותרת`}
              </Typography>
            </TableCell>

            <TableCell align="right" sx={{ borderBottom: 'none' }}>
              <Typography className="text-white" variant="h6">
                {`תגובות`}
              </Typography>
            </TableCell>
            
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {MostCommentedArticles?.map((article, index) => (
            <TableRow key={index}  sx={{ direction: 'rtl'}}>

              <TableCell align="right" sx={{ borderBottom: 'none' }} >
               <Typography className="text-white" variant="h6">{article.display_name}</Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none' }}>
                <Typography className="text-white">{article.title}</Typography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: 'none' }} >
               <Typography className="text-white" variant="h6">{article.comments}</Typography>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
