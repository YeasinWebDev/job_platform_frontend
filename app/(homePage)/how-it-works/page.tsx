export const dynamic = 'force-dynamic';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It <span className="text-primary">Works</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Find your dream job in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#111110] border border-gray-800 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 border border-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Create Account</h3>
            <p className="text-gray-300">
              Sign up for free and create your professional profile in minutes
            </p>
          </div>

          <div className="bg-[#111110] border border-gray-800 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 border border-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Search Jobs</h3>
            <p className="text-gray-300">
              Browse through thousands of job listings from top companies
            </p>
          </div>

          <div className="bg-[#111110] border border-gray-800 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 border border-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Apply & Get Hired</h3>
            <p className="text-gray-300">
              Apply to jobs that match your skills and land your dream role
            </p>
          </div>
        </div>

        <div className="bg-[#111110] border border-gray-800 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Why Choose <span className="text-primary">HirePeople</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Verified Companies</h4>
                <p className="text-gray-300 text-sm">All employers are verified to ensure legitimate opportunities</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Easy Application Process</h4>
                <p className="text-gray-300 text-sm">Apply to multiple jobs with just a few clicks</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Job Alerts</h4>
                <p className="text-gray-300 text-sm">Get notified about new jobs that match your preferences</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Career Resources</h4>
                <p className="text-gray-300 text-sm">Access tips, guides, and resources to advance your career</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}