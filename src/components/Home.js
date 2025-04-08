import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-classic-black">Autosolve LLM Bot</h1>
        <p className="text-lg md:text-xl mb-8 text-warm-gray px-4">
          Let AI solve your programming problems and install dependencies automatically
        </p>
        <Link to="/solve" className="btn-primary inline-block">
          Get Started
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-6 md:py-8 px-4 md:px-0">
        <div className="bg-white p-5 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1">
          <h2 className="text-xl font-bold mb-3 text-deep-blue">Continuous Problem Solving</h2>
          <p className="text-warm-gray">
            Autosolve continuously works on your problem until it's completely resolved, handling errors along the way.
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1">
          <h2 className="text-xl font-bold mb-3 text-deep-blue">Real-Time Output</h2>
          <p className="text-warm-gray">
            Watch the solution unfold in real-time with a live terminal that shows exactly what's happening.
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1">
          <h2 className="text-xl font-bold mb-3 text-deep-blue">Automatic Dependencies</h2>
          <p className="text-warm-gray">
            Autosolve automatically identifies and installs any required dependencies for your project.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
