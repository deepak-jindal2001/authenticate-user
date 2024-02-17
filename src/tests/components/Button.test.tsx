import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../../components/Button";

describe("<Button />", () => {
  it("renders the button correctly", () => {
    const { getByText } = render(
      <Button type="button" btnText="Click me" onClick={() => {}} />
    );
    const buttonElement = getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should handle the click event", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button type="button" btnText="Click me" onClick={handleClick} />
    );
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });

  it("should disable the button when loading", () => {
    const { getByText } = render(
      <Button type="button" btnText="Click me" isLoading />
    );
    const buttonElement = getByText("Click me") as HTMLButtonElement;
    expect(buttonElement.disabled).toBeTruthy();
  });
});
