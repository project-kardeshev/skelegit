import { GitFile } from '../../../core/src/index.ts';

export interface FileTreeProps {
    owner: string;
    repo: string;
    path?: string;
    ref?: string;
    clientName?: string;
    onFileSelect?: (file: GitFile) => void;
    className?: string;
}
export declare function FileTree({ owner, repo, path, ref, clientName, onFileSelect, className }: FileTreeProps): import("react/jsx-runtime").JSX.Element;
