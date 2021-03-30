import { render, waitFor, screen, fireEvent} from '@testing-library/react';
import Form from '../todo/form.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'

test('renders form with functionality', async () => {
  let handleUpdate = jest.fn();
  render(<Form  addItem={handleUpdate} />);



  let textField = screen.getByTestId('toDoItem')
  userEvent.type(textField, 'Wash Dishes');
  let button = screen.getByText('Add Item');

  expect(button).toBeInTheDocument();

  fireEvent.click(button);

await waitFor(() => expect(handleUpdate).toHaveBeenCalled())
});