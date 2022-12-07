import AboutSection from '../(components)/AboutSection';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('about section', () => {
  it('should render without crashing', () => {
    render(<AboutSection />);
  });

  it('should render a heading', () => {
    render(<AboutSection />);

    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
      })
    ).toHaveTextContent('ABOUT');
  });

  it('should render a subheading', () => {
    render(<AboutSection />);

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'A little bit about me'
    );
  });

  it('should render two paragraphs', () => {
    render(<AboutSection />);

    expect(screen.getAllByTestId('para')).toHaveLength(2);
  });

  it('should render an image', () => {
    render(<AboutSection />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
