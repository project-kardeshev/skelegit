import { Branch } from '../../../core/src/index.ts';

export declare function useBranches(owner: string, repo: string, clientName?: string): {
    branches: Branch[];
    loading: boolean;
    error: Error | null;
};
