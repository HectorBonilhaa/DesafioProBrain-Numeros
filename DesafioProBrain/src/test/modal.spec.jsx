import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ModalGames from "../components/ModalGames/modalGames";
import EvenOrOdd from "../pages/EvenOrOdd/evenOrOdd";
import PrimeNumber from "../pages/PrimeNumber/primeNumber";
import Fibonacci from "../pages/FibonacciSequence/fibonacci";
import FourPin from "../pages/FourPin/fourPin";

describe("ModalGames Component", () => {
  it("should render modal component with the game options", () => {
    const { getByText } = render(
      <BrowserRouter>
        <ModalGames />
      </BrowserRouter>
    );

    expect(getByText(/Escolha um jogo:/i)).toBeInTheDocument();
    expect(getByText(/Ímpar \/ Par/i)).toBeInTheDocument();
    expect(getByText(/Número Primo/i)).toBeInTheDocument();
    expect(getByText(/Sequência Fibonacci/i)).toBeInTheDocument();
    expect(getByText(/Múltiplos 4 Pin/i)).toBeInTheDocument();
    expect(getByText(/Fechar/i)).toBeInTheDocument();
  });

  it("should close modal when Fechar button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <ModalGames onClose={onCloseMock} />
      </BrowserRouter>
    );

    fireEvent.click(getByText(/Fechar/i));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should render EvenOrOdd page when clicking on Ímpar / Par button", async () => {
    render(
      <BrowserRouter>
        <ModalGames />
        <EvenOrOdd />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Ímpar \/ Par/i));

    await waitFor(() => {
      expect(screen.getByText(/Game Par ou Ímpar/i)).toBeInTheDocument();
    });
  });

  it("should render PrimeNumber page when clicking on Número Primo", async () => {
    render(
      <BrowserRouter>
        <ModalGames />
        <PrimeNumber />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Número Primo/i));

    await waitFor(() => {
      expect(screen.getByText(/Game Números Primos/i)).toBeInTheDocument();
    });
  });
  it("should render Fibonacci page when clicking on Sequência Fibonacci", async () => {
    render(
      <BrowserRouter>
        <ModalGames />
        <Fibonacci />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Sequência Fibonacci/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Game Sequência de Fibonacci/i)
      ).toBeInTheDocument();
    });
  });

  it("should render FourPin page when clicking on Múltiplos 4 Pin", async () => {
    render(
      <BrowserRouter>
        <ModalGames />
        <FourPin />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Múltiplos 4 Pin/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Game Múltiplos de 4 = Pin/i)
      ).toBeInTheDocument();
    });
  });
});
