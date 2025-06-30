import React from 'react';

interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  link: string;
}

const posts: BlogPost[] = [
  { title: 'Industry Trends', date: '2025-06-01', excerpt: 'Explore the latest in procurement...', category: 'Insights', link: '#' },
  { title: 'Platform Update: New Bid Wizard', date: '2025-05-15', excerpt: 'See what’s new in our tender creation flow...', category: 'Updates', link: '#' },
  { title: 'Case Study: Vendor Success', date: '2025-04-20', excerpt: 'How one vendor won more contracts...', category: 'Case Studies', link: '#' }
];

const categories = ['All', 'Insights', 'Updates', 'Case Studies'];

export const BlogTemplate: React.FC = () => {
  const [current, setCurrent] = React.useState('All');
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-navy text-white py-8 text-center">
        <h1 className="text-3xl font-bold">TendProcure Insights</h1>
        <p className="text-lg">Best practices, industry news, and platform updates</p>
      </header>
      <div className="my-4 text-center">
        {categories.map(cat => (
          <button
            key={cat}
            className={`mx-2 px-4 py-2 rounded ${current === cat ? 'bg-cyan-500 text-white' : 'bg-slate-200 text-slate-700'}`}
            onClick={() => setCurrent(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <main className="max-w-2xl mx-auto">
        {posts.filter(p => current === 'All' || p.category === current).map((p, i) => (
          <article key={i} className="bg-white mb-6 p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-1">{p.title}</h2>
            <div className="text-slate-500 text-sm mb-2">{p.category} | {p.date}</div>
            <p>{p.excerpt}</p>
            <a href={p.link} className="text-cyan-700 underline">Read more</a>
          </article>
        ))}
      </main>
    </div>
  );
};

export default BlogTemplate;
