// src/components/StaticCards.js
import React from 'react';
import ProjectCard from './ProjectCard';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StaticCardsContainer = styled.div`
  display: flex;
  justify-content: center; /* Centrar las tarjetas */
  flex-wrap: wrap; /* Permitir que las tarjetas se envuelvan en filas */
  gap: 20px; /* Espacio entre las tarjetas */
  padding: 20px;
`;

const StaticCards = () => {
  const projects = useSelector(state => state.projects.projects);

  return (
    <StaticCardsContainer>
      {projects.slice(5, 10).map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </StaticCardsContainer>
  );
};

export default StaticCards;
