import { render } from "@testing-library/react";
import { Routes } from "./routes";

test("Routes snapshot", () => {
  const component = render(<Routes />);

  expect(component.container).toMatchSnapshot();
});

test("Router render", () => {
  const div = document.createElement("div");
  render(<Routes />, div);
});
