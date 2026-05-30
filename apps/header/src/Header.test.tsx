import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { useCartStore } from "@microfrontend/shared";

vi.mock("@microfrontend/shared", () => ({
  useCartStore: vi.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.mocked(useCartStore).mockImplementation((selector) =>
      selector({
        products: [
          {
            id: 1,
            price: 100,
            title: "Product 1",
            quantity: 1,
            thumbnail: "",
            total: 100,
          },
          {
            id: 2,
            price: 200,
            title: "Product 2",
            quantity: 2,
            thumbnail: "",
            total: 400,
          },
        ],
        addProduct: () => {},
      }),
    );
  });

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

  it("marks the clicked navigation link as active", async () => {
    const user = userEvent.setup();

    render(<Header />);

    const inicioLink = screen.getByRole("link", { name: "Inicio" });
    const produtosLink = screen.getByRole("link", { name: "Produtos" });

    expect(inicioLink).toHaveClass("text-text-hover");
    expect(produtosLink).toHaveClass("text-text-primary");

    await user.click(produtosLink);

    expect(produtosLink).toHaveClass("text-text-hover");
    expect(inicioLink).toHaveClass("text-text-primary");
  });

  it("closes the mobile menu when a menu link is clicked", async () => {
    const user = userEvent.setup();

    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByText("Menu")).toBeInTheDocument();

    await user.click(screen.getAllByRole("link", { name: "Contato" })[1]);
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });

  it("shows cart quantity", () => {
    render(<Header />);

    expect(screen.getByTestId("cart-badge")).toHaveTextContent("2");
  });
});
