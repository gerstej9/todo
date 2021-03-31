import { render, waitFor, screen, fireEvent} from '@testing-library/react';
import App from '../../app.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'

test('renders entire page and full functionality', async () => {
  render(<App />);

  let textField = screen.getByTestId('toDoItem')
  userEvent.type(textField, 'Wash Dishes');
  let button = screen.getByText('Add Item');

  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  let chores = await screen.findByText('Wash Dishes', { exact: false });

  expect(chores).toBeInTheDocument();

});