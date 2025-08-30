import { usePullRequests } from '../hooks/use-pull-requests';
import { PullRequest } from '@skelegit/core';

export interface PullRequestListProps {
  owner: string;
  repo: string;
  state?: 'open' | 'closed' | 'all';
  clientName?: string;
  onPullRequestSelect?: (pullRequest: PullRequest) => void;
  className?: string;
}

export function PullRequestList({
  owner,
  repo,
  state = 'open',
  clientName,
  onPullRequestSelect,
  className = '',
}: PullRequestListProps) {
  const { pullRequests, loading, error } = usePullRequests(
    owner,
    repo,
    state,
    clientName
  );

  if (loading) {
    return <div className={`p-4 ${className}`}>Loading pull requests...</div>;
  }

  if (error) {
    return (
      <div className={`p-4 text-red-600 ${className}`}>
        Error loading pull requests: {error.message}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {pullRequests.map((pr) => (
        <div
          key={pr.id}
          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => onPullRequestSelect?.(pr)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              #{pr.number} {pr.title}
            </h3>
            <span
              className={`px-2 py-1 rounded text-sm ${
                pr.state === 'open'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {pr.state}
            </span>
          </div>
          {pr.description && (
            <p className="text-gray-600 mt-1">{pr.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>By {pr.author.username}</span>
            <span>
              {pr.sourceBranch} → {pr.targetBranch}
            </span>
            <span>Updated: {pr.updatedAt.toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
