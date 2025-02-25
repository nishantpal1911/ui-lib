import { useContext, useEffect, useState } from 'react';

import { OUTLET } from 'src/constants';
import { ToastContext } from 'src/context/Toast';

export const useOutlet = (outletKey: keyof typeof OUTLET) => {
  const { id, zIndex } = OUTLET[outletKey];
  const [outletElement, setOutletElement] = useState(() => document.getElementById(id));

  useEffect(() => {
    if (!outletElement) {
      // Create & attach outlet div if it doesn't exist.
      const [body] = document.getElementsByTagName('body');
      const div = document.createElement('div');
      div.id = id;
      div.style.zIndex = zIndex;
      div.style.position = 'absolute';
      div.style.top = '0';
      body.appendChild(div);
      setOutletElement(div);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return outletElement;
};

export const useToast = () => useContext(ToastContext);
