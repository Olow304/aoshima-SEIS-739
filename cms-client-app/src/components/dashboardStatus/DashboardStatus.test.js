import { render, screen } from '@testing-library/react';
import DashboardStatus from './DashboardStatus';

describe('DashboardStatus', () => {
    test('renders the component', () => {
        render(<DashboardStatus />);
        const heading = screen.getByText(/Last 30 days/i);
        expect(heading).toBeInTheDocument();
    });
});
