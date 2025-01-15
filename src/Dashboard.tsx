import React from 'react';
import { MostViewedArticles } from './components/Dashboard/MostViewedArticles';
import { Container, Grid2 as Grid ,Typography} from '@mui/material';
import { TotalViews } from './components/Dashboard/TotalViews';
import { MostActiveAuthors } from './components/Dashboard/MostActiveAuthors';
import { AuthorPostCount } from './components/Dashboard/AuthorPostCount';
import { MostCommentedArticles } from './components/Dashboard/MostCommentedArticles';

export const Dashboard = () => {
return (
    <Container sx={{
        '@media (min-width: 1200px)': {
          maxWidth: 'none', // Remove max-width for large screens
        },
      }}>

        <Typography className="text-red-400 text-center  p-2" sx={{mb:4}} variant="h3">{"Now14 Dashboard"}</Typography>

        <Grid container spacing={4} direction="row-reverse">

            <Grid size={{ xs: 12, md: 4 ,lg: 6}}>
                <MostViewedArticles />
            </Grid>

            <Grid size={{ xs: 12, md: 4 , lg: 3}}>
                <TotalViews />
                <AuthorPostCount />
            </Grid>

            <Grid size={{ xs: 12, md: 4 , lg: 3}}>
                <MostActiveAuthors />
                <MostCommentedArticles/>
            </Grid>

        </Grid>
    </Container>
);
};
