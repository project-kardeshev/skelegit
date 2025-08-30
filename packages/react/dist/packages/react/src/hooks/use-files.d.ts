import { GitFile } from '../../../core/src/index.ts';

export declare function useFiles(owner: string, repo: string, path?: string, ref?: string, clientName?: string): {
    files: GitFile[];
    loading: boolean;
    error: Error | null;
};
