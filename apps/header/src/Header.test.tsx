import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header", () => {
  it("renders the main navigation", () => {
    render(<Header />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Inicio" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Produtos" })).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
  it("opens the mobile menu", async () => {
    const user = userEvent.setup();

    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contato" })).toHaveLength(2);
  });
});
