import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Copy, PanelLeft, Search, Share, Plus, ShieldHalf, Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { blogData } from '#constants/blogData';

//React Started Content Component
const ReactStartedContent = () => (
  <>
    {/* Introduction */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-0">
        Introduction to React
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        React is a powerful JavaScript library for building user interfaces, 
        developed and maintained by Facebook. Since its release in 2013, React 
        has revolutionized the way developers build web applications, introducing 
        concepts like component-based architecture and declarative programming 
        that have become industry standards.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        In this comprehensive guide, we'll explore the fundamentals of React, 
        understand why it's become so popular, and build our first React component 
        together. Whether you're a beginner or looking to refresh your knowledge, 
        this article will provide you with a solid foundation.
      </p>
    </section>

    {/* Callout Box */}
    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-12">
      <p className="text-blue-900 font-medium mb-2">💡 What you'll learn</p>
      <ul className="text-blue-800 space-y-1 mb-0">
        <li>Core React concepts and philosophy</li>
        <li>How to create and compose components</li>
        <li>Managing state and props effectively</li>
        <li>Best practices for React development</li>
      </ul>
    </div>

    {/* Why React is Popular */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Why React is Popular
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        React's popularity isn't accidental. It offers several key advantages 
        that make it an excellent choice for modern web development:
      </p>

      <div className="space-y-6 mb-6">
        <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-0">
            ⚡ Virtual DOM for Performance
          </h3>
          <p className="text-gray-700 mb-0">
            React uses a Virtual DOM to efficiently update only the parts of 
            the page that change, resulting in blazing-fast performance even 
            for complex applications.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-0">
            🧩 Component-Based Architecture
          </h3>
          <p className="text-gray-700 mb-0">
            Build encapsulated components that manage their own state, then 
            compose them to create complex UIs. This promotes code reusability 
            and maintainability.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-0">
            🌐 Learn Once, Write Anywhere
          </h3>
          <p className="text-gray-700 mb-0">
            React's principles apply across platforms. Use React Native for 
            mobile apps, React for web, and even React for VR experiences.
          </p>
        </div>
      </div>
    </section>

    {/* Creating First Component */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Creating Your First Component
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Let's dive into creating a simple React component. A component is 
        essentially a JavaScript function that returns JSX (JavaScript XML), 
        which looks similar to HTML.
      </p>

      {/* Code Block */}
      <div className="bg-gray-900 rounded-xl overflow-hidden mb-6 shadow-lg">
        <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-700">
          <span className="text-gray-300 text-sm font-medium">Welcome.jsx</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        <pre className="p-6 overflow-x-auto">
          <code className="text-sm text-gray-100 leading-relaxed">
{`import React from 'react';

function Welcome(props) {
  return (
    <div className="welcome-container">
      <h1>Hello, {props.name}!</h1>
      <p>Welcome to React development.</p>
    </div>
  );
}

export default Welcome;`}
          </code>
        </pre>
      </div>

      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        This simple component accepts a <code className="bg-gray-100 px-2 py-1 rounded text-pink-600 text-base font-mono">name</code> prop 
        and displays a personalized greeting. You can use it like this:
      </p>
    </section>
  </>
);

// Modern Web Apps Content Component
const ModernWebAppsContent = () => (
  <>
    {/* Introduction */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-0">
        The Evolution of Web Development
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Modern web applications have come a long way from static HTML pages. 
        Today's web apps are dynamic, interactive, and provide experiences that rival 
        native desktop applications. The shift toward single-page applications (SPAs) 
        and progressive web apps (PWAs) has transformed how we think about web development.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        In this article, we'll explore the key technologies and patterns that 
        power modern web applications, from build tools to deployment strategies. 
        You'll learn how to create fast, scalable, and maintainable web applications 
        that users love.
      </p>
    </section>

    {/* Callout Box */}
    <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-12">
      <p className="text-purple-900 font-medium mb-2">🚀 What makes a web app modern?</p>
      <ul className="text-purple-800 space-y-1 mb-0">
        <li>Fast loading and responsive performance</li>
        <li>Offline capabilities and PWA features</li>
        <li>Component-based architecture</li>
        <li>Seamless user experience</li>
      </ul>
    </div>

    {/* Key Technologies */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Essential Technologies
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Building modern web apps requires a solid tech stack. Here are the core components:
      </p>

      <div className="space-y-6 mb-6">
        <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-0">
            📦 Build Tools & Bundlers
          </h3>
          <p className="text-gray-700 mb-0">
            Tools like Vite, Webpack, and esbuild optimize your code for production, 
            enabling features like code splitting, tree shaking, and hot module replacement.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-0">
            🎨 Styling Solutions
          </h3>
          <p className="text-gray-700 mb-0">
            From Tailwind CSS to CSS-in-JS libraries like styled-components, 
            modern styling solutions make it easy to create beautiful, responsive interfaces.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-0">
            🔄 State Management
          </h3>
          <p className="text-gray-700 mb-0">
            Libraries like Redux, Zustand, and Recoil help manage complex application 
            state, making your code more predictable and easier to debug.
          </p>
        </div>
      </div>
    </section>

    {/* Architecture Patterns */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Architecture Patterns
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Choosing the right architecture pattern is crucial for scalability and maintainability:
      </p>

      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 mb-8 bg-blue-50 rounded-r-lg">
        <p className="text-xl text-blue-900 italic font-medium mb-2">
          "The best architecture is the one that evolves with your application's needs."
        </p>
        <footer className="text-blue-700 text-sm">— Software Architecture Wisdom</footer>
      </blockquote>

      <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-6 border border-blue-100">
        <ul className="space-y-4 mb-0">
          <li className="flex items-start">
            <span className="text-2xl mr-3">🏗️</span>
            <div>
              <strong className="text-gray-900">Micro-Frontend Architecture</strong>
              <p className="text-gray-700 mt-1 mb-0">Split your application into smaller, independently deployable parts for better team scalability.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">⚡</span>
            <div>
              <strong className="text-gray-900">JAMstack Approach</strong>
              <p className="text-gray-700 mt-1 mb-0">JavaScript, APIs, and Markup for fast, secure, and scalable web applications.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🔐</span>
            <div>
              <strong className="text-gray-900">Server-Side Rendering</strong>
              <p className="text-gray-700 mt-1 mb-0">Improve SEO and initial load performance with frameworks like Next.js or Remix.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </>
);

// JavaScript Tips Content Component
const JSTipsContent = () => (
  <>
    {/* Introduction */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-0">
        Master JavaScript Like a Pro
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        JavaScript is the backbone of modern web development, and mastering its 
        nuances can significantly improve your development workflow. From ES6+ features 
        to performance optimization techniques, there's always something new to learn 
        in the ever-evolving JavaScript ecosystem.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        This guide compiles essential JavaScript tips and tricks that every 
        developer should know. Whether you're dealing with array methods, async patterns, 
        or browser APIs, these techniques will make your code cleaner and more efficient.
      </p>
    </section>

    {/* Callout Box */}
    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-12">
      <p className="text-green-900 font-medium mb-2">💡 Pro Tips Inside</p>
      <ul className="text-green-800 space-y-1 mb-0">
        <li>Modern ES6+ features</li>
        <li>Performance optimization tricks</li>
        <li>Clean code practices</li>
        <li>Common pitfalls to avoid</li>
      </ul>
    </div>

    {/* Array Methods */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Powerful Array Methods
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Modern JavaScript provides powerful array methods that can replace traditional loops:
      </p>

      {/* Code Block */}
      <div className="bg-gray-900 rounded-xl overflow-hidden mb-6 shadow-lg">
        <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-700">
          <span className="text-gray-300 text-sm font-medium">array-methods.js</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        <pre className="p-6 overflow-x-auto">
          <code className="text-sm text-gray-100 leading-relaxed">
{`// Transform arrays with map
const doubled = [1, 2, 3].map(n => n * 2);

// Filter elements
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0);

// Reduce to a single value
const sum = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0);

// Chain operations
const result = [1, 2, 3, 4, 5]
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0);`}
          </code>
        </pre>
      </div>
    </section>

    {/* Async Patterns */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Modern Async Patterns
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Handle asynchronous operations elegantly with async/await:
      </p>

      {/* Code Block */}
      <div className="bg-gray-900 rounded-xl overflow-hidden mb-6 shadow-lg">
        <div className="bg-gray-800 px-6 py-3 flex items-center justify-between border-b border-gray-700">
          <span className="text-gray-300 text-sm font-medium">async-patterns.js</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
        </div>
        <pre className="p-6 overflow-x-auto">
          <code className="text-sm text-gray-100 leading-relaxed">
{`// Clean async/await syntax
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}

// Parallel requests with Promise.all
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);`}
          </code>
        </pre>
      </div>

      <blockquote className="border-l-4 border-indigo-500 pl-6 py-4 mb-8 bg-indigo-50 rounded-r-lg">
        <p className="text-xl text-indigo-900 italic font-medium mb-2">
          "Always handle promises properly to avoid unhandled rejections."
        </p>
        <footer className="text-indigo-700 text-sm">— JavaScript Best Practices</footer>
      </blockquote>
    </section>

    {/* Modern Features */}
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        ES6+ Features You Should Use
      </h2>
      
      <div className="bg-linear-to-br from-yellow-50 to-orange-50 rounded-xl p-8 mb-6 border border-yellow-100">
        <ul className="space-y-4 mb-0">
          <li className="flex items-start">
            <span className="text-2xl mr-3">📦</span>
            <div>
              <strong className="text-gray-900">Destructuring</strong>
              <p className="text-gray-700 mt-1 mb-0">Extract values from objects and arrays with clean, concise syntax.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🔄</span>
            <div>
              <strong className="text-gray-900">Spread & Rest Operators</strong>
              <p className="text-gray-700 mt-1 mb-0">Manipulate arrays and objects immutably with the ... operator.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">🎯</span>
            <div>
              <strong className="text-gray-900">Optional Chaining & Nullish Coalescing</strong>
              <p className="text-gray-700 mt-1 mb-0">Safely access nested properties and provide default values.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="text-2xl mr-3">⚙️</span>
            <div>
              <strong className="text-gray-900">Template Literals</strong>
              <p className="text-gray-700 mt-1 mb-0">Create dynamic strings with embedded expressions and multiline support.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </>
);

const BlogArticle = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const blog = blogData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If blog not found, redirect to home
    if (!blog) {
      navigate('/');
    }
  }, [blog, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  // Return null while redirecting
  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 py-20 px-4">
      {/* Safari Window Container */}
      <div className="max-w-5xl mx-auto animate-fadeIn">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50">
          {/* Safari Top Bar - Full UI */}
          <div id="window-header">
            {/* Traffic Light Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={handleBack}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-200 hover:shadow-lg cursor-pointer"
                title="Close"
              />
              <button 
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 hover:shadow-lg cursor-pointer"
                title="Minimize"
              />
              <button 
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 hover:shadow-lg cursor-pointer"
                title="Maximize"
              />
            </div>

            <PanelLeft className="ml-10 icon shrink-0" onClick={handleBack} style={{ cursor: 'pointer' }} /> 

            <div className="flex items-center gap-1 ml-5 shrink-0">
              <ChevronLeft className="icon" onClick={handleBack} style={{ cursor: 'pointer' }} />
              <ChevronRight className="icon" />
            </div>

            <div className="flex-1 flex items-center gap-3 min-w-0">
              <ShieldHalf className="icon shrink-0" />

              <div className="search flex-1">
                <Search className="icon" />
                <input 
                  type="text" 
                  placeholder="Search or enter website name"
                  className="flex-1"
                  readOnly
                  value={blog.title}
                />
              </div>
            </div>

            <div className="flex items-center gap-5 shrink-0">
              <Share className="icon" />
              <Plus className="icon" />
              <Copy className="icon" />
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto px-8 sm:px-12 py-16">
              {/* Back Link */}
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 group transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">Back to Blog</span>
              </button>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-12 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
              </div>

              {/* Article Content */}
              <article className="prose prose-lg prose-gray max-w-none">
                {slug === 'react-started' && <ReactStartedContent />}
                {slug === 'modern-web-apps' && <ModernWebAppsContent />}
                {slug === 'js-tips' && <JSTipsContent />}
                
                {/* Common CTA Box */}
                <section className="mb-12">
                  <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center mt-12">
                    <h3 className="text-2xl font-bold mb-3 mt-0">Ready to Build Something Amazing?</h3>
                    <p className="text-blue-100 mb-6">
                      Start building your projects today and join millions of developers worldwide.
                    </p>
                    <button 
                      onClick={handleBack}
                      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-2xl transition-all duration-200 hover:-translate-y-1"
                    >
                      Read More Articles
                    </button>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        code {
          font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }

        pre {
          margin: 0;
          line-height: 1.7;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default BlogArticle;
