import axios from 'axios';
import { Article, Author, MostActiveAuthors, MostCommentedArticle, SummaryAuthors, ViewsSummary } from '../types/types';

const API_BASE_URL = 'https://www.now14.co.il/wp-json/dashboard/v1';

export const getMostViewedArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`${API_BASE_URL}/most_views`);
  return response.data;
};

export const getTotalViews = async (): Promise<ViewsSummary> => {
  const response = await axios.get(`${API_BASE_URL}/summary`);
  return response.data;
};

export const getMostActiveAuthors = async (): Promise<MostActiveAuthors> => {
  const response = await axios.get(`${API_BASE_URL}/most_active_authors`);
  return response.data;
};

export const getAuthors = async ():Promise<Author[]> => {
    const response = await axios.get(`${API_BASE_URL}/authors`);
    return response.data;
  };

export const getSummaryAuthorsToday = async (): Promise<SummaryAuthors[]> =>{
  const response = await axios.get(`${API_BASE_URL}/summary/authors`);
  return response.data;
};  


export const getMostCommentedArticles = async (date?: string): Promise<MostCommentedArticle[]> => {
  const url = date ? `${API_BASE_URL}/most_comments/${date}` : `${API_BASE_URL}/most_comments`;
  const response = await axios.get(url);
  return response.data;
};