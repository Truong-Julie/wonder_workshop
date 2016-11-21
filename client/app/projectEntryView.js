import React from 'react'

const ProjectEntryView = ({ name, description }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  )
}

const { string } = React.PropTypes

ProjectEntryView.propTypes = {
  name: string,
  description: string
}

export default ProjectEntryView
