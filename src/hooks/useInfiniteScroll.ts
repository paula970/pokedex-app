import { useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  loading: boolean;
  loadMore: () => void;
  threshold?: number; // Distance from bottom to trigger load (default: 200px)
}

export function useInfiniteScroll({ 
  hasMore, 
  loading, 
  loadMore, 
  threshold = 200 
}: UseInfiniteScrollOptions) {
  
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= 
      document.body.offsetHeight - threshold &&
      !loading &&
      hasMore
    ) {
      loadMore();
    }
  }, [loading, hasMore, loadMore, threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { handleScroll };
}