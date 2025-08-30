import { PullRequest } from '../../../core/src/index.ts';

export interface PullRequestListProps {
    owner: string;
    repo: string;
    state?: 'open' | 'closed' | 'all';
    clientName?: string;
    onPullRequestSelect?: (pullRequest: PullRequest) => void;
    className?: string;
}
export declare function PullRequestList({ owner, repo, state, clientName, onPullRequestSelect, className, }: PullRequestListProps): import("react/jsx-runtime").JSX.Element;
