import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button />", () => {
  it("should render the button with the text 'Load More'", () => {
    render(<Button text="Load More" />);
    // expect.assertions(1); // Comum em testes assíncronos
    // expect(button).toHaveAttribute("class", "button");

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it("should call function on button click", () => {
    const fn = jest.fn();
    render(<Button text="Load More" onClick={fn} />);

    const button = screen.getByRole("button", { name: /load more/i });

    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    render(<Button text="Load More" disabled={true} />);

    const button = screen.getByRole("button", { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it("should be enabled when enabled is false", () => {
    render(<Button text="Load More" disabled={false} />);

    const button = screen.getByRole("button", { name: /load more/i });

    expect(button).toBeEnabled();
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(
      <Button text="Load More" disabled={false} onClick={fn} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchSnapshot();
  });
});
