import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputField from "../../components/InputField";

describe("<InputField />", () => {
  const defaultProps = {
    type: "text",
    id: "inputId",
    name: "inputName",
    value: "",
    onChangeHandler: jest.fn(),
    labelName: "Input Label",
    showLabel: true,
    required: true,
  };

  it("should renders the input field correctly", () => {
    const { getByLabelText } = render(<InputField {...defaultProps} />);
    const inputElement = getByLabelText("Input Label") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe("text");
    expect(inputElement.id).toBe("inputId");
    expect(inputElement.name).toBe("inputName");
    expect(inputElement.value).toBe("");
    expect(inputElement.required).toBeTruthy();
  });

  it('should calls the "onChangeHandler" when input changes', () => {
    const { getByLabelText } = render(<InputField {...defaultProps} />);
    const inputElement = getByLabelText("Input Label") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(defaultProps.onChangeHandler).toHaveBeenCalled();
  });

  it("should renders without a label when showLabel is false", () => {
    const { queryByLabelText } = render(
      <InputField {...defaultProps} showLabel={false} />
    );
    const inputElement = queryByLabelText("Input Label");
    expect(inputElement).toBeNull();
  });

  it("should applies custom classes to the input field", () => {
    const { getByLabelText } = render(
      <InputField {...defaultProps} classes="custom-class" />
    );
    const inputElement = getByLabelText("Input Label");
    expect(inputElement.classList.contains("custom-class")).toBe(true);
  });

  it("should displays the correct label name when provided", () => {
    const { getByLabelText } = render(
      <InputField {...defaultProps} labelName="Custom Label" />
    );
    const inputElement = getByLabelText("Custom Label") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
  });

  it("should not render the required attribute when required is false", () => {
    const { getByLabelText } = render(
      <InputField {...defaultProps} required={false} />
    );
    const inputElement = getByLabelText("Input Label") as HTMLInputElement;
    expect(inputElement.required).toBeFalsy();
  });
});
