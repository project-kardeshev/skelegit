import { useFiles } from '../hooks/use-files';
import { GitFile } from '@skelegit/core';

export interface FileTreeProps {
  owner: string;
  repo: string;
  path?: string;
  ref?: string;
  clientName?: string;
  onFileSelect?: (file: GitFile) => void;
  className?: string;
}

export function FileTree({
  owner,
  repo,
  path = '',
  ref,
  clientName,
  onFileSelect,
  className = '',
}: FileTreeProps) {
  const { files, loading, error } = useFiles(
    owner,
    repo,
    path,
    ref,
    clientName
  );

  if (loading) {
    return <div className={`p-4 ${className}`}>Loading files...</div>;
  }

  if (error) {
    return (
      <div className={`p-4 text-red-600 ${className}`}>
        Error loading files: {error.message}
      </div>
    );
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {files.map((file) => (
        <div
          key={file.path}
          className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded"
          onClick={() => onFileSelect?.(file)}
        >
          <span className="text-lg">
            {file.type === 'directory' ? '📁' : '📄'}
          </span>
          <span className="text-gray-900">{file.name}</span>
          {file.size && (
            <span className="text-sm text-gray-500 ml-auto">
              {formatFileSize(file.size)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}
