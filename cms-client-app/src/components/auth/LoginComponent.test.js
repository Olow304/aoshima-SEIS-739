import { render, screen } from '@testing-library/react';
import LoginComponent from './LoginComponent';

describe('LoginComponent', () => {
    test('renders the component', () => {
        render(<LoginComponent />);
        const heading = screen.getByText(/Sign in to your account/i);
        expect(heading).toBeInTheDocument();
    });
});
