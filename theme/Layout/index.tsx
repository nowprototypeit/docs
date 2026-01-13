import React, { ReactNode } from 'react';
import './layout.css';          // your single stylesheet
import { Head } from '@docusaurus/Head';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/style.css" />
      </Head>
      <body className="nowprototypeit-page">
        <header className="nowprototypeit-header">
          <h3 className="nowprototypeit-brand-header">
            <a href="/">
              <img src="/assets/design-system/images/logo.png" alt="Now Prototype It" />
            </a>
            <span className="nowprototypeit-brand-sub-text">Documentation</span>
          </h3>
        </header>

        <nav>
          <ul className="nowprototypeit-manage-prototype-navigation__list">
            <li><a href="/latest/prototyping">Prototyping</a></li>
            <li><a href="/latest/setup">Setup</a></li>
            <li><a href="/latest/plugins">Plugins</a></li>
            <li><a href="/latest/try-demo-prototype">Try Demo Prototype</a></li>
            <li><a href="/latest/variants">Variants</a></li>
          </ul>
        </nav>

        <main>
          <div className="docs-page">
            <aside className="docs-sidebar">
              {/* Docusaurus injects the sidebar here via DocSidebar */}
              {children}
            </aside>
            <main className="docs-content">
              {/* Docusaurus injects breadcrumbs and MDX here */}
              {children}
            </main>
          </div>
        </main>

        <footer className="nowprototypeit-footer">
          <p className="nowprototypeit-footer-copyright">
            <small>©2024 Now Prototype It</small>
          </p>
        </footer>
      </body>
    </>
  );
}