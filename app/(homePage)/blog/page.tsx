export const dynamic = 'force-dynamic';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Writing a Standout Resume",
      excerpt: "Learn how to craft a resume that catches recruiters' attention and highlights your key achievements.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Career Tips"
    },
    {
      id: 2,
      title: "How to Ace Your Next Job Interview",
      excerpt: "Master the art of interviewing with these proven strategies and techniques from hiring experts.",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Interview Prep"
    },
    {
      id: 3,
      title: "Remote Work: The Future of Employment",
      excerpt: "Explore the benefits and challenges of remote work and how to thrive in a distributed team.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Work Trends"
    },
    {
      id: 4,
      title: "Negotiating Your Salary: A Complete Guide",
      excerpt: "Get the compensation you deserve with these salary negotiation tips and tactics.",
      date: "2024-01-01",
      readTime: "8 min read",
      category: "Career Tips"
    },
    {
      id: 5,
      title: "Building a Strong Professional Network",
      excerpt: "Discover how to expand your professional network and create meaningful connections.",
      date: "2023-12-28",
      readTime: "5 min read",
      category: "Networking"
    },
    {
      id: 6,
      title: "Career Change: How to Make a Successful Transition",
      excerpt: "Planning to switch careers? Here's everything you need to know to make a smooth transition.",
      date: "2023-12-20",
      readTime: "6 min read",
      category: "Career Growth"
    }
  ];

  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Career <span className="text-primary">Blog</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Expert insights, tips, and resources to help you advance your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#111110] border border-gray-800 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="mb-4">
                <span className="text-xs text-primary uppercase tracking-wider font-semibold">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-[#111110] border border-gray-800 rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay <span className="text-primary">Updated</span>
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest career tips and job opportunities delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black border border-gray-800 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}