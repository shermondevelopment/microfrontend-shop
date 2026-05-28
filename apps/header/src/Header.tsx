import "./index.css";
import { Bell, Menu, User, X } from "lucide-react";
import { useState } from "react";
import logo from "./assets/logo.svg";

const navItems = [
  { label: "Inicio", path: "#inicio" },
  { label: "Sobre", path: "#sobre" },
  { label: "Serviços", path: "#servicos" },
  { label: "Produtos", path: "#produtos" },
  { label: "Contato", path: "#contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("#inicio");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-14 object-contain" />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = path === item.path;

            return (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setPath(item.path)}
                className={`
          relative text-sm font-medium transition-colors
          ${
            isActive
              ? "text-primary text-text-hover"
              : "text-text-primary hover:text-text-hover"
          }
        `}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-background-tinted shadow-sm transition hover:scale-105 hover:shadow-sm">
            <Bell className="h-5 w-5 text-text-primary" />

            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
              2
            </span>
          </button>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-background-tinted shadow-sm transition hover:scale-105 hover:shadow-sm">
            <User className="h-5 w-5 text-text-primary" />
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm md:hidden"
          >
            {open ? (
              <X className="h-5 w-5 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0  h-screen z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* sidebar */}
          <aside className="fixed right-0 top-0 z-50 flex h-screen w-[280px] flex-col bg-white p-6 shadow-2xl md:hidden animate-slide-in">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-800">Menu</span>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-gray-700 transition hover:text-black"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}
