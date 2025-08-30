import { Repository } from '../../../core/src/index.ts';

export declare function useRepository(owner: string, repo: string, clientName?: string): {
    repository: Repository | null;
    loading: boolean;
    error: Error | null;
};
export declare function useRepositories(owner?: string, clientName?: string): {
    repositories: Repository[];
    loading: boolean;
    error: Error | null;
};
