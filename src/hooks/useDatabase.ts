import { useEffect, useState } from 'react';
import { initDatabase } from '../db';

export const useDatabase = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initDatabase()
      .then(() => setIsReady(true))
      .catch(err => setError(err));
  }, []);

  return { isReady, error };
};