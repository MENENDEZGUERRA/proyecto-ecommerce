import { useSignal } from "@preact/signals";
import Header from "../components/Header.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <Header></Header>
  );
}
