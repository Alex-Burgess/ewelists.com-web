import * as React from 'react';
import renderer from 'react-test-renderer';
import ListsInput from './ListsInput';

test('Renders ListsInput component with title prop.', () => {
  const tree = renderer
    .create(
      <ListsInput
        id="title"
        title
        inputProps={{
          placeholder: "Enter your title here...",
          defaultValue: "Default Title",
        }}
        formControlProps={{
          fullWidth: true
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders ListsInput component with description prop.', () => {
  const tree = renderer
    .create(
      <ListsInput
        id="description"
        description
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          placeholder: "Add your description here...",
          defaultValue: "Default description value",
          multiline: true,
          rows: 2
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
