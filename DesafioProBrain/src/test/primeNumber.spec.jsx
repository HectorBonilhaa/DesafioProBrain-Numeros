import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PrimeNumber from "../pages/PrimeNumber/primeNumber";
import { BrowserRouter } from "react-router-dom";

describe("PrimeNumber Page", () => {
  it("should render PrimeNumber Page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <PrimeNumber />
      </BrowserRouter>
    );
    expect(getByText(/Game Números Primos/i)).toBeInTheDocument();
  });

  it("should show the message: O número é primo, when entering an prime number in the input", async () => {
    render(
      <BrowserRouter>
        <PrimeNumber />
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
        expect(text.textContent).toBe(" O número 13 é primo.");
      },
      { timeout: 2000 }
    );
  });

  it("should show the message: O número não é primo when entering an non prime number in the input", async () => {
    render(
      <BrowserRouter>
        <PrimeNumber />
      </BrowserRouter>
    );

    const inputElement = screen.getByLabelText("Insira um número (1-1000):");
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "14" } });

    // console.log("Valor atual do input:", inputElement.value);

    const verifyButton = screen.getByTestId("send-form");
    fireEvent.click(verifyButton);

    await waitFor(
      () => {
        const text = screen.getByTestId("result-text");
        // console.log(text);
        expect(text.textContent).toBe(" O número 14 não é primo.");
      },
      { timeout: 2000 }
    );
  });

  it("should show the message: Por favor, insira um número válido entre 1 e 1000. when entering an non number valid in the input", async () => {
    render(
      <BrowserRouter>
        <PrimeNumber />
      </BrowserRouter>
    );

    const inputElement = screen.getByLabelText("Insira um número (1-1000):");
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "0" } });

    // console.log("Valor atual do input:", inputElement.value);

    const verifyButton = screen.getByTestId("send-form");
    fireEvent.click(verifyButton);

    await waitFor(
      () => {
        const text = screen.getByTestId("result-text");
        // console.log(text);
        expect(text.textContent).toBe(
          " Por favor, insira um número válido entre 1 e 1000."
        );
      },
      { timeout: 2000 }
    );
  });
});
