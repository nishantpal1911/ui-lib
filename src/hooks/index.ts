import { useContext, useEffect, useState } from 'react';

import { OUTLET } from 'src/constants';
import { IToastContext, ToastContext } from 'src/context/Toast';

export const useOutlet = (outletKey: keyof typeof OUTLET) => {
  const { id, zIndex } = OUTLET[outletKey];
  const [outletElement, setOutletElement] = useState(() => document.getElementById(id));

  useEffect(() => {
    if (outletElement) return;

    const timeout = setTimeout(() => {
      let div = document.getElementById(id);
      if (!div) {
        // Create & attach outlet div if it doesn't exist.
        const [body] = document.getElementsByTagName('body');
        div = document.createElement('div');
        div.id = id;
        div.style.zIndex = zIndex;
        div.style.position = 'absolute';
        div.style.top = '0';
        body.appendChild(div);
      }
      setOutletElement(div);
    });

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return outletElement;
};

export const useToast = (): IToastContext => useContext(ToastContext);
