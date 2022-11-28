import HomeSection from '../(components)/HomeSection';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('../../utils/createBirdBackground');
describe('home section', () => {
  it('should render without crashing', () => {
    render(<HomeSection />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render a heading', () => {
    render(<HomeSection />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(
      "Hello there, I'm Luca Garavello. I'm a full-stack web developer."
    );
  });

  it('should render a button', () => {
    render(<HomeSection />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('View my portfolio');
  });
});
