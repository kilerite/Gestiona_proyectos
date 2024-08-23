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