import { useState, Dispatch, SetStateAction, useEffect } from "react";

type PersistedProps<T> = [T, Dispatch<SetStateAction<T>>];

export default function usePersistedStorage<T>(
  key: string,
  initialState: T
): PersistedProps<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) return JSON.parse(storageValue) as T;
    else return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
