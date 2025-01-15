import { useQuery } from '@tanstack/react-query';
import {getAuthors, getMostActiveAuthors, getMostCommentedArticles, getMostViewedArticles, getSummaryAuthorsToday, getTotalViews} from '../services/dashboardApi';
import { Article, Author, MostActiveAuthors, ViewsSummary ,CombinedAuthorData , Period, SummaryAuthors, MostCommentedArticle } from '../types/types';

export const useAuthors = () => {
    return useQuery<Author[]>({
      queryKey: ['authors'],
      queryFn: getAuthors,
      refetchInterval: 5 * 60 * 1000, // refresh interval every 5 minutes,
    });
  };

// Custom hook for Most Viewed Articles
export const useMostViewedArticles = () => {
    return useQuery<Article[]>({ queryKey: ['mostViewedArticles'], queryFn: getMostViewedArticles  , refetchInterval: 5 * 60 * 1000});
  };

// Custom hook for Summary views
export const useTotalViews = () => {
  return useQuery<ViewsSummary>({ queryKey: ['totalViews'], queryFn: getTotalViews , refetchInterval: 5 * 60 * 1000});
};

// Custom hook for Most Active Authors
export const useMostActiveAuthors = () => {

   // Use the custom hook to get cached authors data
  const { data: authors = [], isLoading: authorsLoading, isError: authorsError } = useAuthors();
    
      const { data: mostActiveAuthors, isLoading: mostActiveAuthorsLoading, isError: mostActiveAuthorsError } = useQuery<MostActiveAuthors>({
        queryKey: ['mostActiveAuthors'],
        queryFn: getMostActiveAuthors,
        refetchInterval: 5 * 60 * 1000
      });
    
      const isLoading = authorsLoading || mostActiveAuthorsLoading;
      const isError = authorsError || mostActiveAuthorsError;
      const error = authorsError || mostActiveAuthorsError;

    
    
      if (isLoading) {
        return { data: [], isLoading: true, isError: false };
      }
    
      if (isError) {
        return { data: [], isLoading: false, isError: true, error };
      }

    const periods: Period[] = ['day', 'week', 'month'];


    const authorsWithPosts: CombinedAuthorData[] = periods.map((period) => {
        const periodData = mostActiveAuthors?.[period];
        if (!periodData) return null;

        const author = authors.find((author) => author.id === periodData.author_id?.toString());

        if (!author) return null;

        return {
            id: author.id,
            display_name: author.display_name,
            avatar_url: author.avatar_url,
            posts: periodData.post_count,
            period,
        };
        })
        .filter((data): data is CombinedAuthorData => data !== null);

  return { data: authorsWithPosts, isLoading: false, isError: false };
};

// Custom hook for Authors with Posts
  export const useAuthorsWithPostsToday = () => {
  // Use the custom hook to get cached authors data
  const { data: authors = [], isLoading: authorsLoading, isError: authorsError } = useAuthors();

  // Fetch summary data for authors on the given date (articles_sum and views_sum)
  const { data: summaryData = [], isLoading: summaryLoading, isError: summaryError } = useQuery<SummaryAuthors[]>({
    queryKey: ['summaryAuthors'],
    queryFn: getSummaryAuthorsToday,
    refetchInterval: 5 * 60 * 1000
  });

  const isLoading = authorsLoading || summaryLoading;
  const isError = authorsError || summaryError;
  const error = authorsError || summaryError;

  if (isLoading) {
    return { isLoading, isError, error };
  }

  if (isError) {
    return { isLoading: false, isError: true, error };
  }

  // Combine the data from both queries
  const authorsWithSummaryData : SummaryAuthors[] = summaryData.map((summary) => {
    const author = authors.find((author) => +author.id === +summary.author_id);
  
    if (!author) return null;
  
    return {
      id: author.id,
      display_name: author.display_name,
      avatar_url: author.avatar_url,
      author_id: summary.author_id,
      articles_sum: summary.articles_sum,
      views_sum: summary.views_sum,
    };
  }).filter(Boolean) as SummaryAuthors[]; // removes null values

  return { data: authorsWithSummaryData, isLoading: false, isError: false };
  };

  // Custom hook for most commented articles
  export const useMostCommentedArticles = (date?:string) => {
    
   // Use the custom hook to get cached authors data
  const { data: authors = [], isLoading: authorsLoading, isError: authorsError } = useAuthors();

   const { data: mostCommentedArticles, isLoading: mostCommentedArticlesLoading, isError: mostCommentedArticlesError } = useQuery<MostCommentedArticle[]>({ queryKey: ['mostCommentedArticles'], queryFn: () => getMostCommentedArticles(date) , refetchInterval: 5 * 60 * 1000 });

    const isLoading = authorsLoading || mostCommentedArticlesLoading;
    const isError = authorsError || mostCommentedArticlesError;
    const error = authorsError || mostCommentedArticlesError;

    if (isLoading) {
      return { data: [], isLoading: true, isError: false };
    }

    if (isError) {
      return { data: [], isLoading: false, isError: true, error };
    }

   
    const mostCommentedArticlesWithAuthor : MostCommentedArticle[] = mostCommentedArticles?.map((article) => {
      const author = authors.find((author) => author.id === article.author_id.toString());
      if (!author) return null;
    
      return {
        ...article,
        id:author.id,
        display_name: author.display_name,
      };
    }).filter(Boolean) as MostCommentedArticle[]; // removes null values

    return { data: mostCommentedArticlesWithAuthor, isLoading: false, isError: false };

  };