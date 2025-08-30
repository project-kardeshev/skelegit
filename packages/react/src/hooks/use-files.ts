import { useState, useEffect } from 'react';
import { Effect } from 'effect';
import { GitFile } from '@skelegit/core';
import { useSkelegit } from '../providers/skelegit-provider';

export function useFiles(
  owner: string,
  repo: string,
  path: string = '',
  ref?: string,
  clientName?: string
) {
  const { getClient } = useSkelegit();
  const [files, setFiles] = useState<GitFile[]>([]);
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

    const effect = client.listFiles(owner, repo, path, ref);
    
    Effect.runPromise(effect)
      .then((fileList) => {
        setFiles(fileList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [owner, repo, path, ref, clientName, getClient]);

  return { files, loading, error };
}
