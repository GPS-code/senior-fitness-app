import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'वरिष्ठ नागरिक फिटनेस जांच | Senior Citizen Fitness Assessment',
  description: 'ICMR Guidelines के अनुसार भारतीय वरिष्ठ नागरिकों के लिए व्यापक स्वास्थ्य और फिटनेस आकलन ऐप।',
  keywords: ['fitness', 'health', 'seniors', 'India', 'ICMR', 'wellness', 'nutrition'],
  authors: [{ name: 'Gaurav | Central Square Foundation' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="font-sans antialiased text-slate-800">
        {children}
      </body>
    </html>
  );
}
