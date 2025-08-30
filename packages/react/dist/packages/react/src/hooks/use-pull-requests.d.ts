import { PullRequest } from '../../../core/src/index.ts';

export declare function usePullRequests(owner: string, repo: string, state?: 'open' | 'closed' | 'all', clientName?: string): {
    pullRequests: PullRequest[];
    loading: boolean;
    error: Error | null;
};
