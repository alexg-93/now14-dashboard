import { useMostViewedArticles } from '../../hooks/useDashboard';
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

export const MostViewedArticles = () => {
  const { data, isLoading, error } = useMostViewedArticles();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <TableContainer component={Paper} className="px-5 max-h-[60vh]" sx={{backgroundColor: '#3E3F58'}}>
      <Typography className="text-white text-center bg-[#3E3F58] p-2" variant="h4">{'הכתבות הכי נצפות'}</Typography>
      <Table className="bg-[#3E3F58]">
        {/* Table Header */}
        <TableHead className="bg-[#616276]">
          <TableRow>
            
            <TableCell align="left">
              <Typography className="text-white" variant="h6">
                {'צפיות'}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography className="text-white" variant="h6">
                {'כותרת'}
              </Typography>
            </TableCell>
            
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {data?.map((article) => (
            <TableRow key={article.id}>
              <TableCell align="left" >
               <Typography className="text-white" variant="h6">{article.views}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className="text-white">{article.title}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
