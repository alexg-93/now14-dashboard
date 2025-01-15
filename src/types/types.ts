export interface Article {
    id: number;
    author_id: number;
    title: string;
    views: string;
    time_string: string;
    author: string;
    date_time: string;
}

export interface ViewsSummary {
        views: string;
        articles: number;
        target: number;
        target_prec: number;
        push_notifications: number;
}

export interface AuthorPostCount {
    author_id: number;
    post_count: number;
  }
  
export interface MostActiveAuthors {
    day: AuthorPostCount;
    week: AuthorPostCount;
    month: AuthorPostCount;
  }

export interface Author {
    id: string;
    display_name: string;
    avatar_url:string;
}

export interface CombinedAuthorData extends Author {
  period: keyof MostActiveAuthors;
  posts: number;
}

export interface SummaryAuthors extends Author {
 author_id: number;
 views_sum: number;
 articles_sum: number;
}

export interface MostCommentedArticle extends Author {
  author_id: number;
  title: string;
  comments: number;
  time_string:string;
  date_time:string;
}

export type Period = 'day' | 'week' | 'month';