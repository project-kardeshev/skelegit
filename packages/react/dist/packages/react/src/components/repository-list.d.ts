import { Repository } from '../../../core/src/index.ts';

export interface RepositoryListProps {
    owner?: string;
    clientName?: string;
    onRepositorySelect?: (repository: Repository) => void;
    className?: string;
}
export declare function RepositoryList({ owner, clientName, onRepositorySelect, className }: RepositoryListProps): import("react/jsx-runtime").JSX.Element;
