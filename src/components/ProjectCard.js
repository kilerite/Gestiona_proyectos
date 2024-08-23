// src/components/ProjectCard.js
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Button, TextField, Dialog, DialogContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteProject, editProject } from '../features/projects/projectSlice';
import styled from 'styled-components';

const CardContainer = styled(Card)`
  width: 300px; /* Ancho fijo */
  height: 400px; /* Alto fijo */
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden; /* Ocultar cualquier contenido que se desborde */
`;

const Image = styled(Card.Img)`
  height: 150px; /* Altura fija para la imagen */
  object-fit: cover;
  cursor: pointer; /* Mostrar que la imagen es clickeable */
`;

const ContentContainer = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const Title = styled(Card.Title)`
  font-size: 1.2em;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Agregar puntos suspensivos si el texto es demasiado largo */
`;

const Description = styled(Card.Text)`
  font-size: 0.9em;
  flex-grow: 1;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis; /* Agregar puntos suspensivos si la descripción es demasiado larga */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const EnlargedImage = styled.img`
  width: 100%;
  height: auto;
`;

const ProjectCard = ({ project }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProject, setEditedProject] = useState({
    name: project.name,
    description: project.description,
  });

  const handleDelete = () => {
    dispatch(deleteProject(project.id));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedProject({
      name: project.name,
      description: project.description,
    });
  };

  const handleChange = (e) => {
    setEditedProject({
      ...editedProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(editProject({ id: project.id, ...editedProject }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProject({
      name: project.name,
      description: project.description,
    });
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardContainer>
        <Image 
          variant="top" 
          src={project.image} 
          alt="Imagen del proyecto" 
          onClick={handleImageClick} 
        />
        <ContentContainer>
          {isEditing ? (
            <>
              <TextField
                label="Nombre del Proyecto"
                name="name"
                value={editedProject.name}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Descripción"
                name="description"
                value={editedProject.description}
                onChange={handleChange}
                fullWidth
                margin="dense"
                multiline
                rows={4}
              />
              <ButtonGroup>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Guardar
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancelar
                </Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <Title>{project.name}</Title>
              <Description>{project.description}</Description>
              <ButtonGroup>
                <Button variant="contained" color="primary" onClick={handleEditToggle}>
                  Editar
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleDelete}>
                  Eliminar
                </Button>
              </ButtonGroup>
            </>
          )}
        </ContentContainer>
      </CardContainer>

      {/* Modal para mostrar la imagen ampliada */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent>
          <EnlargedImage src={project.image} alt="Imagen ampliada del proyecto" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
