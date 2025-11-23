import Link from 'next/link';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blog Header - 모든 blog 페이지에서 공통으로 보임 */}
      <header className="bg-purple-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">📝 My Blog</h1>
          
          <nav className="flex gap-4">
            <Link 
              href="/blog"
              className="hover:underline px-3 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/blog/posts"
              className="hover:underline px-3 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Posts
            </Link>
            <Link 
              href="/blog/about"
              className="hover:underline px-3 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Blog Content - children으로 각 페이지 내용이 들어감 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Blog Footer - 모든 blog 페이지에서 공통으로 보임 */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p>© 2025 My Blog. Layout이 모든 페이지에 적용됩니다.</p>
        </div>
      </footer>
    </div>
  );
}