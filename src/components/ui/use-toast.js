// src/components/ui/use-toast.js
import * as React from 'react';

const TOAST_LIMIT = 5;             // quantos toasts podem ficar visíveis
const TOAST_REMOVE_DELAY = 1000;   // delay p/ remover após fechar (ms)

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
};

let count = 0;
const genId = () => (++count).toString();

const toastTimeouts = new Map();
const listeners = [];
let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST: {
      const t = action.toast;
      return {
        ...state,
        toasts: [t, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }
    case actionTypes.UPDATE_TOAST: {
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    }
    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;
      // fecha específico ou todos
      const toasts = state.toasts.map((t) =>
        !toastId || t.id === toastId ? { ...t, open: false } : t
      );
      // agenda remoção
      (toastId ? [toastId] : toasts.map((t) => t.id)).forEach(addToRemoveQueue);
      return { ...state, toasts };
    }
    case actionTypes.REMOVE_TOAST: {
      if (!action.toastId) return { ...state, toasts: [] };
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }
    default:
      return state;
  }
}

function addToRemoveQueue(toastId) {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
}

export function toast(props) {
  const id = genId();

  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });
  const update = (patch) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...patch, id },
    });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      id,
      open: true,
      ...props, // title, description, action, duration, etc.
    },
  });

  return { id, dismiss, update };
}

export function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return {
    ...state,
    toast, // conveniência: permite chamar useToast().toast(...)
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}
