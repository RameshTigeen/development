import React from 'react';

import {getUniqueId} from 'react-native-device-info';

export default function useDevice() {
  const [state, setState] = React.useState({
    deviceUniqueId: '',
  });

  React.useEffect(() => {
    getUniqueId().then(id =>
      setState(prev => ({
        ...prev,
        deviceUniqueId: `${id}`,
      })),
    );
  }, []);

  return {
    ...state,
    setState,
  };
}
