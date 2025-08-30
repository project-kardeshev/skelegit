import { useState, useEffect } from 'react';
import { Effect } from 'effect';
import { PullRequest } from '@skelegit/core';
import { useSkelegit } from '../providers/skelegit-provider';

export function usePullRequests(
  owner: string, 
  repo: string, 
  state: 'open' | 'closed' | 'all' = 'open',
  clientName?: string
) {
  const { getClient } = useSkelegit();
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
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

    const effect = client.listPullRequests(owner, repo, state);
    
    Effect.runPromise(effect)
      .then((prs) => {
        setPullRequests(prs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [owner, repo, state, clientName, getClient]);

  return { pullRequests, loading, error };
}
