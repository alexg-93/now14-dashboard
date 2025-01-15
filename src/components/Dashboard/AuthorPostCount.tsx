import { useAuthorsWithPostsToday } from '../../hooks/useDashboard';
import {
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import ArticleSharpIcon from '@mui/icons-material/ArticleSharp';
export const AuthorPostCount = () => {
  const { isLoading, data, isError, error } = useAuthorsWithPostsToday();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Card className="mt-5">
      <CardContent className="flex flex-col bg-[#3E3F58] gap-5">
       <Box className="flex flex-row justify-center gap-2">
       <ArticleSharpIcon fontSize="large" sx={{ color: 'white' }}/>
       <Typography className="text-white" variant="h6">
          {'כמה פירסמנו היום'}
        </Typography>
       </Box>
        {data?.map((author, index) => {
          return (
            <Box key={index} className="flex flex-row justify-between gap-1 px-5 rounded-md bg-gray-500">
              <Typography className="text-white" variant="h6">
                {author.articles_sum + ' : פירסם'}
              </Typography>
              <Typography className="text-white" variant="h6">
                {author.display_name}
              </Typography>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};
