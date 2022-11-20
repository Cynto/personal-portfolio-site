import Navbar from '../(components)/Navbar';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('Navbar', () => {
  it('should render without crashing', () => {
    render(<Navbar />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render a list of 4 links', () => {
    render(<Navbar />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getAllByRole('link')).toHaveLength(4);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should navigate to the correct section when a link is clicked', async () => {
    render(<Navbar />);

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const portfolioLink = screen.getByText('Portfolio');
    const contactLink = screen.getByText('Contact');

    await userEvent.click(homeLink);

    expect(window.location.hash).toBe('#home');

    await userEvent.click(aboutLink);

    expect(window.location.hash).toBe('#about');

    await userEvent.click(portfolioLink);

    expect(window.location.hash).toBe('#portfolio');

    await userEvent.click(contactLink);

    expect(window.location.hash).toBe('#contact');
  });
});
