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

    fireEvent.click(getByAltText(/GIF/i));

    expect(getByTestId("modal")).toBeInTheDocument();
  });
});
