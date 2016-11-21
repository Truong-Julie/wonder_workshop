import React from 'react';
import ProjectEntryView from './projectEntryView.js';

const ProjectsView = (props) => {
  return (
    <div>
      {props.projects.map((project, index) => 
        <ProjectEntryView 
          key={index} 
          {...project}
        />
      )}
    </div>
  );
};

export default ProjectsView;