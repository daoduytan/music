import { render } from "@testing-library/react";
import React from "react";
import { Signin } from "./signin";

test("Make snapshot", () => {
  const component = render(<Signin />);

  expect(component.container).toMatchSnapshot();
});

test("Render signin", () => {
  const div = document.createElement("div");

  render(<Signin />, div);
});
