import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'To-Do App',
  description: 'Aplicación de lista de tareas con Next.js y TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

