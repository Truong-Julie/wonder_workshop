import React from 'react';
import ProjectsView from './projectsView.js';

let testData = [
  {
    name: 'project 1',
    description: 'New desk'
  },
  {
    name: 'Project 2',
    description: 'Shelving unit'
  }
];

const Search = () => {
  return (
    <div className='container'>
      <header className='header'> 
        <h1 className='brand'>search results</h1>
        <input className='search-input' type='text' placeholder='type in your search'/> 
      </header>
      <div className='projects'>
        <h1>This is my search page</h1>
        <ProjectsView projects={testData} />
      </div>
    </div>
  );
};

export default Search;