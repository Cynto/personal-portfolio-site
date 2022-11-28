import Navbar from '../(components)/Navbar';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';

describe('Navbar', () => {
  beforeAll(() => {});
  it('should render without crashing', async () => {
    await render(<Navbar />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render a list of 4 links', async () => {
    await render(<Navbar />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getAllByRole('link')).toHaveLength(4);
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  it('should navigate to the correct section when a link is clicked', async () => {
    await render(<Navbar />);

    const homeLink = screen.getByText('HOME');
    const aboutLink = screen.getByText('ABOUT');
    const portfolioLink = screen.getByText('PORTFOLIO');
    const contactLink = screen.getByText('CONTACT');

    await userEvent.click(homeLink);

    expect(window.location.hash).toBe('#home');

    await userEvent.click(aboutLink);

    expect(window.location.hash).toBe('#about');

    await userEvent.click(portfolioLink);

    expect(window.location.hash).toBe('#portfolio');

    await userEvent.click(contactLink);

    expect(window.location.hash).toBe('#contact');
  });
  it('should render a hamburger menu instead of a ul if the screen is portrait', async () => {
    await render(<Navbar />);

    await act(async () => {
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 2000,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
