import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {whenStable} from '../test-utils/Utils'
import CreateTicketComponent from '../components/CreateTicketComponent';
import mockAxios from 'axios';

const sampleCreateResponseJson = {
  data: require('./createResponse.json')
};

const sampleGetbyIDJson = {
  data: require('./getByIDResponse.json')
}

describe('CreateTicketComponent', () => {
  test('test Cancel ticket', async () => {
    const mockProps = { history: { push: jest.fn() }, match: { params: { id : 'new'} } };

    render(<CreateTicketComponent {...mockProps}/>);
    
    userEvent.click(screen.getByText('Cancel'));
    expect(mockProps.history.push).toBeCalledWith('/');
  });

  test('test Create ticket', async () => {
    const mockProps = { history: { push: jest.fn() }, match: { params: { id : 'new'} } };
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

  test('test Update ticket', async () => {
    const mockProps = { history: { push: jest.fn() }, match: { params: { id : 1} } };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetbyIDJson));

    render(<CreateTicketComponent {...mockProps}/>);
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    mockAxios.put.mockImplementationOnce(() => Promise.resolve(sampleCreateResponseJson));
    userEvent.click(screen.getByText('Save'));
    await whenStable();

    expect(mockProps.history.push).toBeCalledWith('/');
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
  });
});
