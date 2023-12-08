import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EvenOrOdd from "../pages/EvenOrOdd/evenOrOdd";
import { BrowserRouter } from "react-router-dom";

describe("EvenOrOdd Page", () => {
  it("should render EvenOrOdd Page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <EvenOrOdd />
      </BrowserRouter>
    );
    expect(getByText(/Game Par ou Ímpar/i)).toBeInTheDocument();
  });

  it("should show the message Par when entering an even number in the input", async () => {
    render(
      <BrowserRouter>
        <EvenOrOdd />
      </BrowserRouter>
    );

    const inputElement = screen.getByLabelText("Digite um número (1-1000):");
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "20" } });

    // console.log("Valor atual do input:", inputElement.value);

    const verifyButton = screen.getByTestId("send-form");
    fireEvent.click(verifyButton);

    await waitFor(
      () => {
        const span = screen.getByTestId("result-text");
        expect(span.textContent).toBe(" Par");
      },
      { timeout: 2000 }
    );
  });

  it("should show the message Ímpar when entering an odd number in the input", async () => {
    render(
      <BrowserRouter>
        <EvenOrOdd />
      </BrowserRouter>
    );

    const inputElement = screen.getByLabelText("Digite um número (1-1000):");
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: "21" } });

    // console.log("Valor atual do input:", inputElement.value);

    const verifyButton = screen.getByTestId("send-form");
    fireEvent.click(verifyButton);

    await waitFor(
      () => {
        // Verifique se a mensagem "Par" está presente no DOM
        const span = screen.getByTestId("result-text");
        expect(span.textContent).toBe(" Ímpar");
      },
      { timeout: 2000 }
    );
  });
});
