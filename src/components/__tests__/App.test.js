import {render,cleanup} from '@testing-library/react'
import '@testing-library/jest-dom';
import App from '../../App';

afterEach(()=>{
    cleanup();
})

test('should render an app',()=>{
    render(<App /> );
    expect(true).toBeTruthy()
});