import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Results from '../todo/list.js';


describe('Testing the list section', () => {
  it('Should display two chores', async () => {
    let handleComplete = jest.fn();
    render(<Results handleComplete={handleComplete} list={[{text: 'Do Stuff', _id: 1, assignee: 'Frank', complete:'false'}, {text: 'Do Other Stuff', _id: 2, assignee: 'Jim', complete:'true'} ]} />);
    
    let completed = screen.getByText('Do Stuff', { exact: false });
    fireEvent.click(completed);
    
    await waitFor(() => expect(screen.getByText('Do Stuff', { exact: false })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Do Other Stuff', { exact: false })).toBeInTheDocument());
    await waitFor(() => expect(handleComplete).toHaveBeenCalled())
  });
});

