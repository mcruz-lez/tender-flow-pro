import { Link } from "react-router-dom";

const ComingSoon = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div className="text-center p-8 rounded-2xl shadow-2xl bg-white/80 backdrop-blur-xl border border-blue-100 animate-fade-in">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Coming Soon</h1>
      <p className="text-lg text-gray-700 mb-6">
        This feature is under development and will be available soon.
        <br />
        Stay tuned for updates!
      </p>
      <Link
        to="/"
        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
      >
        Return to Home
      </Link>
    </div>
  </div>
);

export default ComingSoon;
