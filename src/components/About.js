import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-classic-black">About Autosolve</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-deep-blue">Overview</h2>
        <p className="mb-4 text-classic-black">
          Autosolve is an AI-powered application that helps developers solve programming problems automatically. 
          It uses advanced language models to understand your problem, identify necessary dependencies, and 
          execute the solution steps until your problem is completely resolved.
        </p>
        <p className="text-classic-black">
          Whether you're stuck on a coding challenge, need help setting up a development environment, or 
          troubleshooting errors, Autosolve is designed to make your development workflow smoother and more efficient.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-deep-blue">How It Works</h2>
        <ol className="list-decimal pl-5 space-y-3 text-classic-black">
          <li>
            <strong>Describe your problem</strong> - Provide a clear description of what you're trying to accomplish or the issue you're facing.
          </li>
          <li>
            <strong>AI analysis</strong> - Our LLM analyzes your problem and determines the best approach to solve it.
          </li>
          <li>
            <strong>Dependency management</strong> - Autosolve identifies and installs any required libraries or tools.
          </li>
          <li>
            <strong>Solution execution</strong> - The solution is executed step by step, with real-time feedback in the terminal.
          </li>
          <li>
            <strong>Verification</strong> - The system verifies that the problem has been solved correctly before completion.
          </li>
        </ol>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-deep-blue">Technical Details</h2>
        <p className="mb-4 text-classic-black">
          Autosolve is built using Electron and React, with a modern UI powered by Tailwind CSS. The problem-solving 
          functionality is powered by a custom-trained language model specifically designed to understand programming 
          concepts and generate accurate solutions.
        </p>
        <p className="text-classic-black">
          For questions, feedback, or support requests, please contact us at 
          <a href="mailto:support@autosolve.app" className="text-deep-blue ml-1 hover:underline">
            support@autosolve.app
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
