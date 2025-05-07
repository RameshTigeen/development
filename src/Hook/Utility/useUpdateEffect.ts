import React from 'react';

export default function useUpdateEffect(callback: () => void, dependencies: React.DependencyList) {
  const hasMountedRef = React.useRef(true);

  React.useEffect(() => {
    if (hasMountedRef.current) {
      hasMountedRef.current = false;
      return;
    }
    callback();
  }, [...dependencies]);
}
