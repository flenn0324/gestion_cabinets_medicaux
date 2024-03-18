import {render,screen,cleanup} from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Cliniques from '../../pages/AdminPanel/Clinique/Cliniques';
import AddClinique from '../../pages/AdminPanel/Clinique/AddClinique';
import ReadClinique from '../../pages/AdminPanel/Clinique/ReadClinique';
import UpdateClinique from '../../pages/AdminPanel/Clinique/UpdateClinique';

afterEach(()=>{
    cleanup();
})

test('should render the clinique component',()=>{
    render(<BrowserRouter><Cliniques /></BrowserRouter>
     );
    const MedecinElement = screen.getByTestId('medecin');
    expect(MedecinElement).toBeInTheDocument();
});

test('should render the add clinique component',()=>{
    render(<BrowserRouter><AddClinique /></BrowserRouter>
     );
    const MedecinElement = screen.getByTestId('add-medecin');
    expect(MedecinElement).toBeInTheDocument();  
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Preserve original functionalities
    useLocation: jest.fn(), // Mock useLocation
  }));

test('should render the read clinique component',()=>{
    useLocation.mockReturnValue({
        state: {
          medecin: {
            nom: 'Doe',
            prenom: 'John',
            date_naissance: '1990-01-01',
            lieu_naissance: 'City',
            adresse: '123 Main St',
            email: 'john.doe@example.com',
          },
        },
      });
    render(<BrowserRouter><ReadClinique /></BrowserRouter>
     );
    const MedecinElement = screen.getByTestId('read-medecin');
    expect(MedecinElement).toBeInTheDocument();  
});



  test('should render the update clinique component', () => {
    // Define what useLocation should return
    useLocation.mockReturnValue({
      state: {
        medecin: {
          nom: 'Doe',
          prenom: 'John',
          date_naissance: '1990-01-01',
          lieu_naissance: 'City',
          adresse: '123 Main St',
          email: 'john.doe@example.com',
        },
      },
    });
  
    render(
      <BrowserRouter>
        <UpdateClinique />
      </BrowserRouter>
    );
  
    const MedecinElement = screen.getByTestId('update-medecin');
    expect(MedecinElement).toBeInTheDocument();
  });