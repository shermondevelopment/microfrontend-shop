import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Cart } from "@microfrontend/types";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

const mockCartQuery = (
  overrides: Partial<UseQueryResult<Cart, Error>> = {},
): UseQueryResult<Cart, Error> =>
  ({
    data: {
      id: 1,
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: 1,
      totalProducts: 2,
      totalQuantity: 2,
    },
    isLoading: false,
    isError: false,
    error: null,
    ...overrides,
  }) as UseQueryResult<Cart, Error>;

describe("Header", () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReturnValue(mockCartQuery());
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

  it("shows badge skeleton while loading", () => {
    vi.mocked(useQuery).mockReturnValue(
      mockCartQuery({
        data: undefined,
        isLoading: true,
      }),
    );

    render(<Header />);

    expect(screen.getByTestId("cart-badge-skeleton")).toBeInTheDocument();

    expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();
  });
});
