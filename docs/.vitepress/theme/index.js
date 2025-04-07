// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

import { inject } from '@vercel/analytics';
 
inject();

export default DefaultTheme
