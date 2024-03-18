import {render,cleanup} from '@testing-library/react'
import '@testing-library/jest-dom';
import SignInSide from '../../pages/authpages/login';

afterEach(()=>{
    cleanup();
})

test('should render the login page',()=>{
    render(<SignInSide /> );
    const LoginElement = screen.getByTestId('login');
    expect(LoginElement).toBeInTheDocument();
});