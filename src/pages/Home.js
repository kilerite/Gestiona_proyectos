// src/pages/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import CarouselCards from '../components/CarouselCards';
import StaticCards from '../components/StaticCards';
import { fetchProjectsFromAPI } from '../features/projects/projectSlice';

const Home = () => {
  const dispatch = useDispatch();
  const projectStatus = useSelector((state) => state.projects.status);

  useEffect(() => {
    if (projectStatus === 'idle') {
      dispatch(fetchProjectsFromAPI());
    }
  }, [projectStatus, dispatch]);

  return (
    <div>
      <h1>GestionaTusProyectos</h1>
      <ProjectForm />
      <CarouselCards /> {/* Integración del Carrusel */}
      <StaticCards /> {/* Integración de las Tarjetas Estáticas */}
      <ProjectList />
    </div>
  );
};

export default Home;
