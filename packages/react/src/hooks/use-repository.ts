import { useState, useEffect } from 'react';
import { Effect } from 'effect';
import { Repository } from '@skelegit/core';
import { useSkelegit } from '../providers/skelegit-provider';

export function useRepository(owner: string, repo: string, clientName?: string) {
  const { getClient } = useSkelegit();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const client = getClient(clientName);
    if (!client) {
      setError(new Error('No Git client available'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const effect = client.getRepository(owner, repo);
    
    Effect.runPromise(effect)
      .then((repo) => {
        setRepository(repo);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [owner, repo, clientName, getClient]);

  return { repository, loading, error };
}

export function useRepositories(owner?: string, clientName?: string) {
  const { getClient } = useSkelegit();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const client = getClient(clientName);
    if (!client) {
      setError(new Error('No Git client available'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const effect = client.listRepositories(owner);
    
    Effect.runPromise(effect)
      .then((repos) => {
        setRepositories(repos);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [owner, clientName, getClient]);

  return { repositories, loading, error };
}
