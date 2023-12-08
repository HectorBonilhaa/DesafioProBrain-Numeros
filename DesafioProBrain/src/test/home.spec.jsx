// home.spec.js
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import HomePage from "../pages/home";

describe("Home Page", () => {
  it("should render Home page", () => {
    const { getByText } = render(<HomePage />);
    expect(
      getByText(/Clique no gif abaixo e escolha seu game/i)
    ).toBeInTheDocument();
  });

  it("should open modal when image is clicked", () => {
    const { getByAltText, getByTestId } = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Localiza a imagem pelo texto alternativo e simula um clique nela
    fireEvent.click(getByAltText(/GIF/i));

    // Verifica se o modal está presente no DOM após o clique na imagem
    expect(getByTestId("modal")).toBeInTheDocument();
  });
});
