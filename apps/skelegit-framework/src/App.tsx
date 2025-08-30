

export function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Skelegit Framework
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A powerful toolkit for building Git interfaces and backends with a 
            plugin-based architecture and modern React components.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Plugin System
            </h2>
            <p className="text-gray-600">
              Connect to multiple git ecosystems with configurable plugins for
              GitHub, GitLab, and self-hosted solutions.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              React Components
            </h2>
            <p className="text-gray-600">
              Pre-built components for repository navigation, PR viewing, 
              file browsing, and status monitoring.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              CLI Tools
            </h2>
            <p className="text-gray-600">
              Command-line interface for project initialization, deployment,
              and interaction with isomorphic-git.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
