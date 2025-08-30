import { useRepositories } from '../hooks/use-repository';
import { Repository } from '@skelegit/core';

export interface RepositoryListProps {
  owner?: string;
  clientName?: string;
  onRepositorySelect?: (repository: Repository) => void;
  className?: string;
}

export function RepositoryList({
  owner,
  clientName,
  onRepositorySelect,
  className = '',
}: RepositoryListProps) {
  const { repositories, loading, error } = useRepositories(owner, clientName);

  if (loading) {
    return <div className={`p-4 ${className}`}>Loading repositories...</div>;
  }

  if (error) {
    return (
      <div className={`p-4 text-red-600 ${className}`}>
        Error loading repositories: {error.message}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {repositories.map((repository) => (
        <div
          key={repository.id}
          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => onRepositorySelect?.(repository)}
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {repository.name}
          </h3>
          {repository.description && (
            <p className="text-gray-600 mt-1">{repository.description}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>{repository.isPrivate ? '🔒 Private' : '🌐 Public'}</span>
            <span>Branch: {repository.defaultBranch}</span>
            <span>Updated: {repository.updatedAt.toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
