// src/features/projects/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'QxNjP9CRcKs0B54lWS_Molatl3ax1FPMEXJqcW-MRig'; // Reemplaza 'TU_UNSPLASH_ACCESS_KEY' con tu clave API de Unsplash

const initialState = {
  projects: [],
  status: 'idle',
  error: null,
};

// Thunk para cargar proyectos desde la API de Unsplash
export const fetchProjectsFromAPI = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      query: 'comida venezolana', // Puedes cambiar la palabra clave a cualquier otra categoría
      per_page: 10,
      client_id: UNSPLASH_ACCESS_KEY,
    },
  });

  return response.data.results.map((photo, index) => ({
    id: photo.id,
    name: `Comida  ${index + 1}`, // Nombres de proyectos generados
    description: photo.alt_description || 'Descripción no disponible', // Descripción de la imagen o mensaje predeterminado
    image: photo.urls.small, // Imagen de tamaño pequeño
  }));
});

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    editProject: (state, action) => {
      const { id, name, description } = action.payload;
      const existingProject = state.projects.find((project) => project.id === id);
      if (existingProject) {
        existingProject.name = name;
        existingProject.description = description;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsFromAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectsFromAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjectsFromAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProject, deleteProject, editProject } = projectSlice.actions;

export default projectSlice.reducer;
