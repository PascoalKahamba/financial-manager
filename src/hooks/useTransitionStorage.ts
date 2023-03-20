import { useState, Dispatch, SetStateAction } from "react";

type TransitionProps<S> = [S, Dispatch<SetStateAction<S>>];

export default function useTransitionStorage<S>(
  key: "transition",
  initialState: S
): TransitionProps<S> {
  const [state, setState] = useState(() => {
    const transitionStorage = localStorage.getItem(key);
    if (transitionStorage) return JSON.parse(transitionStorage) as S;
    else return initialState;
  });

  return [state, setState];
}
