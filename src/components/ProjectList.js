// src/components/ProjectList.js
import React from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centrar las tarjetas horizontalmente */
  align-items: flex-start; /* Alinear las tarjetas al principio en vertical */
  gap: 20px; /* Espacio entre las tarjetas */
  padding: 20px;
`;

const ProjectList = () => {
  const projects = useSelector(state => state.projects.projects);

  return (
    <ListContainer>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ListContainer>
  );
};

export default ProjectList;
