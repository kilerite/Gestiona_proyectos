// src/components/CarouselCards.js
import React from 'react';
import Slider from 'react-slick';
import ProjectCard from './ProjectCard';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  margin: 40px 0; /* Separación del formulario */
  .slick-slide {
    padding: 10px; /* Espaciado alrededor de cada tarjeta */
  }
`;

const CarouselCards = () => {
  const projects = useSelector(state => state.projects.projects);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Mostrar 3 tarjetas por vez
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // 1 tarjeta por vez en pantallas pequeñas
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // 2 tarjetas por vez en pantallas medianas
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {projects.slice(0, 5).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default CarouselCards;
