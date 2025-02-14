import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Question from './Question';

const mockOptions = [
  { left: 'Option 1', right: 'Option 2', correct: 'Option 2' },
  { left: 'Option 3', right: 'Option 4', correct: 'Option 3' },
];

const mockOnSelectionChange = jest.fn();

describe('Question Component', () => {
  test('renders the question title', () => {
    render(
      <Question
        title='Sample Question'
        options={mockOptions}
        selections={['left', 'left']}
        locked={false}
        onSelectionChange={mockOnSelectionChange}
      />
    );
    expect(screen.getByText('Sample Question')).toBeInTheDocument();
  });

  test('renders the correct options', () => {
    render(
      <Question
        title='Sample Question'
        options={mockOptions}
        selections={['left', 'left']}
        locked={false}
        onSelectionChange={mockOnSelectionChange}
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Option 4')).toBeInTheDocument();
  });

  test('allows selection of options and updates the state', () => {
    render(
      <Question
        title='Sample Question'
        options={mockOptions}
        selections={['left', 'left']}
        locked={false}
        onSelectionChange={mockOnSelectionChange}
      />
    );
    const option2Button = screen.getByText('Option 2');
    fireEvent.click(option2Button);
    expect(option2Button).toHaveClass('selected');
  });

  test('displays correct message when all selections are correct', () => {
    render(
      <Question
        title='Sample Question'
        options={mockOptions}
        selections={['right', 'left']}
        locked={true}
        onSelectionChange={mockOnSelectionChange}
      />
    );
    expect(screen.getByText('The answer is correct')).toBeInTheDocument();
  });

  test('displays incorrect message when not all selections are correct', () => {
    render(
      <Question
        title='Sample Question'
        options={mockOptions}
        selections={['left', 'left']}
        locked={false}
        onSelectionChange={mockOnSelectionChange}
      />
    );
    expect(screen.getByText('The answer is incorrect')).toBeInTheDocument();
  });

  test('calls onSelectionChange when selections change', () => {
    render(
      <Question
        title='Sample Question'
        options={mockOptions}
        selections={['left', 'left']}
        locked={false}
        onSelectionChange={mockOnSelectionChange}
      />
    );
    const option2Button = screen.getByText('Option 2');
    fireEvent.click(option2Button);
    expect(mockOnSelectionChange).toHaveBeenCalled();
  });

  test('updates state correctly when navigating between questions', () => {
    const { rerender } = render(
      <Question
        title='Sample Question 1'
        options={mockOptions}
        selections={['left', 'left']}
        locked={false}
        onSelectionChange={mockOnSelectionChange}
      />
    );
    rerender(
      <Question
        title='Sample Question 2'
        options={mockOptions}
        selections={['right', 'left']}
        locked={true}
        onSelectionChange={mockOnSelectionChange}
      />
    );
    expect(screen.getByText('Sample Question 2')).toBeInTheDocument();
    expect(screen.getByText('The answer is correct')).toBeInTheDocument();
  });
});
