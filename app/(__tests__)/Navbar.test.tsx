import Navbar from '../(components)/Navbar';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

describe('Navbar', () => {
  beforeAll(() => {});
  it('should render without crashing', async () => {
    await render(<Navbar />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render a list of 5 buttons', async () => {
    await render(<Navbar />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
    expect(screen.getByText('SKILLS')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  it('should render 6 buttons if screen orientation is portrait ', async () => {
    await render(<Navbar />);

    await act(async () => {
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 2000,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getAllByRole('button')).toHaveLength(6);
  });
});
