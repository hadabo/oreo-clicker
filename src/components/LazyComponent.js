import React, { lazy, Suspense } from 'react';

// Helper function to create lazy-loaded components with a loading fallback
export function createLazyComponent(importFunc, fallback = null) {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Example usage:
// const LazyGadgetsList = createLazyComponent(() => import('./GadgetsList'));
