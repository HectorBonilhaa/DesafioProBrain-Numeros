import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FourPin from "../pages/FourPin/fourPin";
describe("FourPin Page", () => {
  it("should render FourPin Page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <FourPin />
      </BrowserRouter>
    );
    expect(getByText(/Game Múltiplos de 4 = Pin/i)).toBeInTheDocument();
  });

  it("should show the list of numbers when entering an number in the input", async () => {
    render(
      <BrowserRouter>
        <FourPin />
      </BrowserRouter>
    );

    const inputElement = screen.getByLabelText("Insira um número:");
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "8" } });

    // console.log("Valor atual do input:", inputElement.value);

    const verifyButton = screen.getByTestId("send-form");
    fireEvent.click(verifyButton);

    await waitFor(
      () => {
        const items = screen.getAllByTestId("result-items");
        // console.log(items);

        expect(items.length).toBeGreaterThan(7);
      },
      { timeout: 2000 }
    );
  });
});
