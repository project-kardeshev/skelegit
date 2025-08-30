import { useState, useEffect } from 'react';
import { Effect } from 'effect';
import { Branch } from '@skelegit/core';
import { useSkelegit } from '../providers/skelegit-provider';

export function useBranches(
  owner: string,
  repo: string,
  clientName?: string
) {
  const { getClient } = useSkelegit();
  const [branches, setBranches] = useState<Branch[]>([]);
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

    const effect = client.listBranches(owner, repo);
    
    Effect.runPromise(effect)
      .then((branchList) => {
        setBranches(branchList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [owner, repo, clientName, getClient]);

  return { branches, loading, error };
}
