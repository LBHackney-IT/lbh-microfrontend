import React from "react";

import { render, testA11y } from "@hackney/mfe-test-utils";

import { FormGroup, Input } from "..";
import { Fieldset } from "./fieldset";

test("it renders correctly", async () => {
  const { container } = render(
    <Fieldset heading="Group name">
      <FormGroup id="test" label="Test" name="test">
        <Input />
      </FormGroup>
    </Fieldset>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it renders correctly with an h tag", async () => {
  const { container } = render(
    <Fieldset heading={<h1>Heading</h1>}>
      <FormGroup id="test" label="Test" name="test">
        <Input />
      </FormGroup>
    </Fieldset>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it applies the correct variant styling", () => {
  const { container } = render(
    <Fieldset variant="large" heading={<h1>Heading</h1>}>
      <FormGroup id="test" label="Test" name="test">
        <Input />
      </FormGroup>
    </Fieldset>,
  );
  expect(container).toMatchSnapshot();
});

test("it applies aria-hidden to legend with variant hidden", () => {
  const { container } = render(
    <Fieldset variant="hidden" heading="Text">
      <FormGroup id="test" label="Test" name="test">
        <Input />
      </FormGroup>
    </Fieldset>,
  );

  expect(container).toMatchSnapshot();
});

test("it applies an error", async () => {
  const { container } = render(
    <Fieldset variant="large" heading="heading" error="This is an error">
      <FormGroup id="test" label="Test" name="test">
        <Input />
      </FormGroup>
    </Fieldset>,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});
