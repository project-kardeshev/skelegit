import { useBranches } from '../hooks/use-branches';

export interface BranchSelectorProps {
  owner: string;
  repo: string;
  currentBranch?: string;
  clientName?: string;
  onBranchChange?: (branch: string) => void;
  className?: string;
}

export function BranchSelector({
  owner,
  repo,
  currentBranch,
  clientName,
  onBranchChange,
  className = '',
}: BranchSelectorProps) {
  const { branches, loading, error } = useBranches(owner, repo, clientName);

  if (loading) {
    return <div className={`p-4 ${className}`}>Loading branches...</div>;
  }

  if (error) {
    return (
      <div className={`p-4 text-red-600 ${className}`}>
        Error loading branches: {error.message}
      </div>
    );
  }

  return (
    <select
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      value={currentBranch || ''}
      onChange={(e) => onBranchChange?.(e.target.value)}
    >
      <option value="">Select a branch</option>
      {branches.map((branch) => (
        <option key={branch.name} value={branch.name}>
          {branch.name}
          {branch.isDefault && ' (default)'}
          {branch.isProtected && ' 🔒'}
        </option>
      ))}
    </select>
  );
}
