import React from "react";

import { render, testA11y } from "@hackney/mfe-test-utils";

import { Spinner } from "./spinner";

test("it renders correctly", async () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
