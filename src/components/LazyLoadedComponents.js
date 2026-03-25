import { createLazyComponent } from './LazyComponent';

// Lazy load components for better code splitting
export const LazyGadgetsList = createLazyComponent(() => import('./GadgetsList'));
export const LazyTrophies = createLazyComponent(() => import('./Trophies'));
export const LazyStats = createLazyComponent(() => import('./Stats'));
