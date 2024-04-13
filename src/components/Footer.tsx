import React from "react";
import HeaderItems from "./Header-items";
import { PiNotebookLight } from "react-icons/pi";
export default function Footer() {
  return (
    <footer className="w-full bg-slate-200 dark:bg-gray-700 p-4 mt-5 mb-auto sticky top-[100vh]">
    {/*<footer className="w-full bg-slate-200 dark:bg-gray-700 p-4 mt-5 mb-auto flex fixed bottom-0"> */}
      <HeaderItems title="terms" address="/terms" Icon={PiNotebookLight} />
    </footer>
  );
}
