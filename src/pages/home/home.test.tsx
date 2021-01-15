import { render } from "@testing-library/react";
import React from "react";
import { Home } from "./home";

test("Home snapshot", () => {
  const component = render(<Home />);

  expect(component.container).toMatchSnapshot();
});

test("Render homepage", () => {
  const div = document.createElement("div");

  render(<Home />, div);
});
