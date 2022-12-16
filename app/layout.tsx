/* eslint-disable @next/next/no-head-element */
import './globals.scss';
import './cssReset.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
        <title>Luca Garavello</title>
        <meta
          name="description"
          content="Luca Garavello's personal website. Full-stack web developer."
        />
        <link
          rel={'icon'}
          href={'https://cdn-icons-png.flaticon.com/512/1666/1666094.png'}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
