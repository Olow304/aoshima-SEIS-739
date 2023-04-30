import { render, screen } from '@testing-library/react';
import UpdatePage from './UpdatePage';

describe('UpdatePage', () => {
    test('renders the component', () => {
        render(<UpdatePage />);
        const heading = screen.getByText(/Page title/i);
        expect(heading).toBeInTheDocument();
    });
});
