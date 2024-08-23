const fs = require('fs');
const path = require('path');

const files = [
  {
    path: 'src/store.js',
    content: `
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './features/projects/projectSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
  },
});
`.trim(),
  },
  {
    path: 'src/features/projects/projectSlice.js',
    content: `
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
  },
});

export const { addProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;
`.trim(),
  },
  {
    path: 'src/components/ProjectList.js',
    content: `
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProjectCard from './ProjectCard';
import { deleteProject } from '../features/projects/projectSlice';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ListContainer = styled.div\`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
\`;

const ProjectList = () => {
  const projects = useSelector(state => state.projects.projects);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  return (
    <ListContainer>
      {projects.map((project) => (
        <motion.div key={project.id} whileHover={{ scale: 1.1 }}>
          <ProjectCard project={project} onDelete={handleDelete} />
        </motion.div>
      ))}
    </ListContainer>
  );
};

export default ProjectList;
`.trim(),
  },
  {
    path: 'src/components/ProjectCard.js',
    content: `
import React from 'react';
import { Card } from 'react-bootstrap';
import { Button } from '@mui/material';

const ProjectCard = ({ project, onDelete }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>{project.description}</Card.Text>
        <Button variant="contained" color="secondary" onClick={() => onDelete(project.id)}>
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
`.trim(),
  },
  {
    path: 'src/components/ProjectForm.js',
    content: `
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProject } from '../features/projects/projectSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled.form\`
  display: flex;
  flex-direction: column;
  gap: 15px;
\`;

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
      <input {...register('name')} placeholder="Nombre del Proyecto" required />
      <textarea {...register('description')} placeholder="Descripción" required />
      <Button type="submit" variant="contained" color="primary">
        Agregar Proyecto
      </Button>
    </FormContainer>
  );
};

export default ProjectForm;
`.trim(),
  },
  {
    path: 'src/pages/Home.js',
    content: `
import React from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

const Home = () => {
  return (
    <div>
      <h1>GestionaTusProyectos</h1>
      <ProjectForm />
      <ProjectList />
    </div>
  );
};

export default Home;
`.trim(),
  },
  {
    path: 'src/App.js',
    content: `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
`.trim(),
  },
  {
    path: 'src/index.js',
    content: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
`.trim(),
  },
  {
    path: 'src/components/ProjectForm.test.js',
    content: `
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectForm from './ProjectForm';
import { Provider } from 'react-redux';
import { store } from '../store';

test('renders ProjectForm and adds a project', () => {
  render(
    <Provider store={store}>
      <ProjectForm />
    </Provider>
  );
  
  fireEvent.change(screen.getByPlaceholderText(/Nombre del Proyecto/i), {
    target: { value: 'Nuevo Proyecto' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Descripción/i), {
    target: { value: 'Descripción del proyecto' },
  });

  fireEvent.click(screen.getByText(/Agregar Proyecto/i));

  expect(screen.getByText('Nuevo Proyecto')).toBeInTheDocument();
});
`.trim(),
  },
];

// Function to create directories recursively
const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Function to create files with content
const createFiles = () => {
  files.forEach((file) => {
    createDirectory(path.dirname(file.path));
    fs.writeFileSync(file.path, file.content, 'utf8');
    console.log(`Created ${file.path}`);
  });
};

// Create the files and directories
createFiles();
