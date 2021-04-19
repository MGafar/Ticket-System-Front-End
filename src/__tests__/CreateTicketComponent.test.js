import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {whenStable} from '../test-utils/Utils'
import CreateTicketComponent from '../components/CreateTicketComponent';
import mockAxios from 'axios';

const sampleCreateResponseJson = {
  data: require('./createResponse.json')
};

describe('CreateTicketComponent', () => {
  test('test Cancel ticket', async () => {
    const mockProps = { history: { push: jest.fn() } };
    render(<CreateTicketComponent {...mockProps}/>);
    userEvent.click(screen.getByText('Cancel'));
    expect(mockProps.history.push).toBeCalledWith('/');
  });

  test('test Create ticket', async () => {
    const mockProps = { history: { push: jest.fn() } };
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(sampleCreateResponseJson));

    render(<CreateTicketComponent {...mockProps}/>);
    userEvent.type(screen.getByPlaceholderText("Title"), "Another one");
    userEvent.type(screen.getByPlaceholderText("Author"), "DJ Khalid");
    userEvent.type(screen.getByPlaceholderText("Description"), "We the best music!");
    userEvent.click(screen.getByText('Create'));

    await whenStable();
    expect(mockProps.history.push).toBeCalledWith('/');
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });
});