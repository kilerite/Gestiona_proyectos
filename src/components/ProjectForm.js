// src/components/ProjectForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProject } from '../features/projects/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Reducir el espacio entre los elementos */
  padding: 15px; /* Reducir el espacio alrededor del formulario */
  background-color: #f9f9f9; /* Fondo suave para el formulario */
  border-radius: 8px; /* Esquinas redondeadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  max-width: 400px; /* Limitar el ancho máximo del formulario */
  margin: auto; /* Centrar el formulario horizontalmente */
`;

const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: #3f51b5;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #c4c4c4;
    }
    &:hover fieldset {
      border-color: #3f51b5;
    }
    &.Mui-focused fieldset {
      border-color: #3f51b5;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #007bff;
    color: #fff;
    padding: 8px 16px; /* Reducir el tamaño del botón */
    font-size: 14px; /* Reducir el tamaño del texto */
    border-radius: 6px; /* Ajustar las esquinas redondeadas */
    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ProjectForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const newProject = { id: uuidv4(), ...data };
    dispatch(addProject(newProject));
    reset();
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <StyledTextField 
        {...register('name')} 
        label="Nombre del Proyecto" 
        variant="outlined" 
        required 
      />
      <StyledTextField 
        {...register('description')} 
        label="Descripción" 
        variant="outlined" 
        required 
        multiline 
        rows={3} /* Reducir la altura del campo de texto */
      />
      <StyledButton type="submit" variant="contained" color="primary">
        AGREGAR PROYECTO
      </StyledButton>
    </FormContainer>
  );
};

export default ProjectForm;
