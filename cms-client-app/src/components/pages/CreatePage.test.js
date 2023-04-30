import { render, screen } from '@testing-library/react';
import CreatePage from './CreatePage';

describe('CreatePage', () => {
    test('renders the component', () => {
        render(<CreatePage />);
        const heading = screen.getByText(/Page title/i);
        expect(heading).toBeInTheDocument();
    });
});
