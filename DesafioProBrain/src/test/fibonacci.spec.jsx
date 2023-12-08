import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Fibonacci from "../pages/FibonacciSequence/fibonacci";
describe("Fibonacci Page", () => {
  it("should render Fibonacci Page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Fibonacci />
      </BrowserRouter>
    );
    expect(getByText(/Game Sequência de Fibonacci/i)).toBeInTheDocument();
  });

  it("should show the message: O número está na sequência de fibonacci, when entering an fibonacci number in the input", async () => {
    render(
      <BrowserRouter>
        <Fibonacci />
      </BrowserRouter>
    );

    const inputElement = screen.getByLabelText("Insira um número (1-1000):");
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "13" } });

    // console.log("Valor atual do input:", inputElement.value);

    const verifyButton = screen.getByTestId("send-form");
    fireEvent.click(verifyButton);

    await waitFor(
      () => {
        const text = screen.getByTestId("result-text");
        // console.log(text);
        expect(text.textContent).toBe(
          "O número 13 está na sequência de fibonacci"
        );
      },
      { timeout: 2000 }
    );
  });

  it("should show the message: O número não está na sequência de fibonacci, when entering an non fibonacci number in the input", async () => {
    render(
      <BrowserRouter>
        <Fibonacci />
      </BrowserRouter>
    );

    const inputElement = screen.getByLabelText("Insira um número (1-1000):");
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "15" } });

    // console.log("Valor atual do input:", inputElement.value);

    const verifyButton = screen.getByTestId("send-form");
    fireEvent.click(verifyButton);

    await waitFor(
      () => {
        const text = screen.getByTestId("result-text");
        // console.log(text);
        expect(text.textContent).toBe(
          "O número 15 não está na sequência de fibonacci"
        );
      },
      { timeout: 2000 }
    );
  });
});
