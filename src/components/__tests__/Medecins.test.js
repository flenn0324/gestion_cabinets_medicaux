import {render,screen,cleanup} from '@testing-library/react'
import '@testing-library/jest-dom';
import Medecins from '../../pages/AdminPanel/Medecin/Medecins';
import { BrowserRouter } from 'react-router-dom';
import AddMedecin from '../../pages/AdminPanel/Medecin/AddMedecin';
import ReadMedecin from '../../pages/AdminPanel/Medecin/ReadMedecin';
import UpdateMedecin from '../../pages/AdminPanel/Medecin/UpdateMedecin';
import { useLocation } from 'react-router-dom';
import { store } from "./store";


afterEach(()=>{
    cleanup();
})


test('should render the medecin component',()=>{
    render(<Provider store={store}><BrowserRouter><Medecins /></BrowserRouter> </Provider>
     );
    const MedecinElement = screen.getByTestId('medecin');
    expect(MedecinElement).toBeInTheDocument();
});

test('should render the add medecin component',()=>{
    render(<BrowserRouter><AddMedecin /></BrowserRouter>
     );
    const MedecinElement = screen.getByTestId('add-medecin');
    expect(MedecinElement).toBeInTheDocument();  
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Preserve original functionalities
    useLocation: jest.fn(), // Mock useLocation
  }));

test('should render the read medecin component',()=>{
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
    render(<BrowserRouter><ReadMedecin /></BrowserRouter>
     );
    const MedecinElement = screen.getByTestId('read-medecin');
    expect(MedecinElement).toBeInTheDocument();  
});



  test('should render the update medecin component', () => {
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
        <UpdateMedecin />
      </BrowserRouter>
    );
  
    const MedecinElement = screen.getByTestId('update-medecin');
    expect(MedecinElement).toBeInTheDocument();
  });