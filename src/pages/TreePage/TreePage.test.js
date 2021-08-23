const { render, screen, fireEvent } = require('@testing-library/react');
const { AddFamilyMemberModal } = require('./Components');
const { default: TreePage } = require('./TreePage');

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

test('has default node and edge added to data', () => {
  render(<TreePage testContainer={modalRoot} />);
  fireEvent.click(screen.getByText('Add Edge'));
  screen.getAllByText(/2/i);
  fireEvent.click(screen.getByText('Add Node'));
  screen.getAllByText(/test/i);
});

test('has new family member added to data', () => {
  render(<TreePage testContainer={modalRoot} />);
  fireEvent.click(screen.getByText('Add Family Member'));

  fireEvent.click(screen.getByText('Son'));

  fireEvent.change(screen.getByPlaceholderText('name'), { target: { value: 'John' } });

  fireEvent.click(screen.getByText('Submit'));

  screen.getByText(/John/i);
});
