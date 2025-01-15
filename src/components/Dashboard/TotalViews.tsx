import { Card, CardContent, CircularProgress, Typography , Box } from '@mui/material';
import { useTotalViews } from '../../hooks/useDashboard';
import { Visibility } from '@mui/icons-material';


export const TotalViews = () => {

  const { data, isLoading, error } = useTotalViews();

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Card>
      <CardContent className='bg-[#3E3F58] text-white'>
        <Box className="flex gap-2 items-center justify-center">
        <Visibility style={{ fontSize: 40,}} />
        <Typography variant="h6">{"מספר צפיות כולל"}</Typography>
        </Box>
        <Typography variant="h4">{data?.views}</Typography>
      </CardContent>
    </Card>
  );
};