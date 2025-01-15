import React from 'react';
import {Card, CardContent, CircularProgress, Typography , Box} from '@mui/material';
import { useMostActiveAuthors } from '../../hooks/useDashboard';
import { Period } from '../../types/types';

const periodTitles: Record<Period, string> = {
    day: 'היום',
    week: 'השבוע',
    month: 'החודש',
};


export const MostActiveAuthors = () => {

    const { data : mostActiveAuthors, isLoading, error,isError } = useMostActiveAuthors();
 
    const PeriodText = ({ period } : { period: Period }) => {
        return(
            <Box className="flex flex-row justify-center gap-1">
               <Typography className="text-yellow-500">{periodTitles[period]}</Typography>
               <Typography className="text-white">{`פירסם הכי הרבה`}</Typography>
            </Box>
            
        )
    }
    

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">{error}</Typography>;

    return (
        mostActiveAuthors.map((author,index)=>{
           
            return (
                <Card key={index} className="mb-4">
                    <CardContent className="flex flex-col bg-[#3E3F58]">
                        <Box>
                        <Typography className="text-white" variant="h6">{author.display_name}</Typography>
                        <PeriodText period={author.period} />
                        <Typography className="text-white" variant="h5">🚀 {author.posts}</Typography>
                      </Box>
                    </CardContent>
              </Card>
            )
        })
        
    );
}


