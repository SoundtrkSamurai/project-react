import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import api from '@/api';
import { getItem, setItem } from '@/lib/utils/localStorage';

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const STALE_TIME = 1000 * 60 * 5;

  const storageKey = useMemo(() => {
    return options?.params ? `${url}?${JSON.stringify(options.params)}` : url;
  }, [url, options]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedData = getItem(storageKey);
      const isCacheValid =
        cachedData && currentTime - cachedData.timestamp < STALE_TIME; // 5 minutes

      if (isCacheValid) {
        setData(cachedData.data);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get(url, {
          ...options,
          signal: abortController.signal,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [STALE_TIME, options, storageKey, url]);

  useEffect(() => {
    if (data) {
      const currentTime = new Date().getTime();
      setItem(storageKey, {
        data,
        lastFetched: currentTime,
      });
    }
  }, [data, storageKey]);

  return { data, error, isLoading };
};

export default useFetch;
