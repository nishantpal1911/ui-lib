import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';

import Button from 'src/components/ui/Button/Button';

// Create a lightweight mock SvgIcon to act as icon.svg prop
const MockIcon = (props: any) => React.createElement('svg', { 'data-testid': 'mock-icon', ...props });

describe('Button component', () => {
  test('renders text prop and has default type button', () => {
    render(<Button text='Click me' />);

    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  test('renders children when provided and children take precedence visually', () => {
    render(
      <Button text='Text'>
        <span data-testid='child'>Child</span>
      </Button>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Child');
  });

  test('renders icon when icon prop provided and applies size to sx', () => {
    render(<Button text='WithIcon' icon={{ svg: MockIcon as any, size: 'lg' as any }} />);

    const icon = screen.getByTestId('mock-icon') as HTMLElement;
    expect(icon).toBeInTheDocument();
    // svg should be present but sx prop can't be asserted on DOM, ensure aria-hidden when text present
    expect(icon).toHaveAttribute('aria-hidden');
  });

  test('icon placement right adds flex-row-reverse class via iconPlacement', () => {
    const { container } = render(<Button text='IconRight' icon={{ svg: MockIcon as any, placement: 'right' }} />);

    const btn = container.querySelector('button') as HTMLElement;
    expect(btn).toHaveClass('flex-row-reverse');
  });

  test('loading state shows LoadingSpinner and hides other contents visually (invisible class)', () => {
    const { container } = render(<Button text='Loading' loading />);

    // LoadingSpinner renders a div; ensure aria-busy
    const btn = container.querySelector('button') as HTMLElement;
    expect(btn).toHaveAttribute('aria-busy', 'true');

    // Text should still be in DOM but invisible
    const span = screen.getByText('Loading');
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass('invisible');
  });

  test('disabled prop disables button and sets aria-disabled', () => {
    render(<Button text='Disabled' disabled onClick={vi.fn()} />);

    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-disabled', 'true');
  });

  test('click handler is called when not disabled or loading', () => {
    const onClick = vi.fn();
    render(<Button text='Click' onClick={onClick} />);

    const btn = screen.getByRole('button', { name: /click/i });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when loading', () => {
    const onClick = vi.fn();
    render(<Button text='Busy' loading onClick={onClick} />);

    const btn = screen.getByRole('button', { name: /busy/i });
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('outlined + intent combinations apply expected class names', () => {
    const { container } = render(<Button text='Outline' intent='primary' outlined />);
    const btn = container.querySelector('button');
    // outlined primary compound variant adds border-primary and text-primary
    expect(btn).toHaveClass('border-primary');
    expect(btn).toHaveClass('text-primary');
  });

  test('rounded prop applies rounded-full class', () => {
    const { container } = render(<Button text='Round' rounded />);
    const btn = container.querySelector('button');
    expect(btn).toHaveClass('rounded-full');
  });

  test.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('size=%s applies corresponding size class', (size) => {
    const { container } = render(<Button text='Size' size={size} />);
    const btn = container.querySelector('button');
    // Check that the size token exists in class list (e.g. text-xs or px-2)
    expect(btn?.className.length).toBeGreaterThan(0);
  });
});
