import { render, screen } from '@testing-library/react';
import RegisterComponent from './RegisterComponent';

describe('RegisterComponent', () => {
    test('renders the component', () => {
        render(<RegisterComponent />);
        const heading = screen.getByText(/Sign in to your account/i);
        expect(heading).toBeInTheDocument();
    });
});
