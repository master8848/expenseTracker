import { useCallback, useState } from "react";

export function useToggle(
  bool = false
): [
  boolean,
  {
    setToggle: () => void;
    setFalse: () => void;
    setTrue: () => void;
    setTrueOrFalse: (curr: boolean) => void;
  },
] {
  const [state, setState] = useState<boolean>(bool);
  const setToggle = useCallback(() => setState((c) => !c), [setState]);
  const setFalse = useCallback(() => setState(false), [setState]);
  const setTrue = useCallback(() => setState(true), [setState]);
  const setTrueOrFalse = useCallback((c: boolean) => setState(c), [setState]);
  return [state, { setToggle, setFalse, setTrue, setTrueOrFalse }];
}
