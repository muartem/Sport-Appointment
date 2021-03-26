import { render } from '@testing-library/react';
import CRUDButtons from './CRUDButtons';

describe('CRUDButtons', () => {
  it('should show all buttons', () => {
    const props = {
      isCreateButtonVisible: true,
      isUpdateButtonVisible: true,
      isDeleteButtonVisible: true,
    };
    const { container } = render(<CRUDButtons {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should show no buttons', () => {
    const props = {
      isCreateButtonVisible: false,
      isUpdateButtonVisible: false,
      isDeleteButtonVisible: false,
    };
    const { container } = render(<CRUDButtons {...props} />);

    expect(container).toMatchSnapshot();
  });
});
