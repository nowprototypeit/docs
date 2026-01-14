import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames, useThemeConfig} from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import type {Props} from '@theme/Navbar/Layout';

import styles from './styles.module.css';

export default function NavbarLayout({children}: Props): ReactNode {
  return (
	  <header className="navbar">
	    <h3><span className="visually-hidden">Now Prototype It</span> Documentation</h3>
	    {children}
	  </header>
  );
}
