import { useContext } from "react";
import { GlobalContext } from "../components/GlobalStorage";

export default function useGlobalContext() {
  const global = useContext(GlobalContext)!;
  return {
    global,
  };
}
