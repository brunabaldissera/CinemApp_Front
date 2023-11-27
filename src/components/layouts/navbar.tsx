import React from "react";

export default function Navbar(props: any) {
  return (
    <nav className="font-sans flex flex-col sm:flex-row sm:justify-between items-center sm:items-baseline py-4 px-6 bg-transparent text-stone-100 shadow w-full">
      <div className="mb-2 sm:mb-0 text-2xl font-bold text-red-500">
        CinemApp
      </div>
      <div className="flex flex-col sm:flex-row mt-4 sm:mt-0">
        <a href="/" className="text-lg no-underline hover:text-red-500 mx-2">
          Home
        </a>
        <a href="/sessoes" className="text-lg no-underline hover:text-red-500 mx-2">
          Sessões
        </a>
        <a href="/users" className="text-lg no-underline hover:text-red-500 mx-2">
          Usuários
        </a>
      </div>
    </nav>
  );
}