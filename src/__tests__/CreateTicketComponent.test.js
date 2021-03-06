import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {whenStable, sampleGetDepartments, sampleGetTopics, sampleCreateResponseJson, sampleGetbyIDJson} from '../test-utils/Utils'
import CreateTicketComponent from '../components/CreateTicketComponent';
import mockAxios from 'axios';

describe('CreateTicketComponent', () => {
  test('test Cancel ticket', async () => {
    const mockProps = { history: { push: jest.fn() }, match: { params: { id : 'new'} } };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));

    render(<CreateTicketComponent {...mockProps}/>);
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(2);

    userEvent.click(screen.getByText('Cancel'));
    expect(mockProps.history.push).toBeCalledWith('/');
  });

  test('test Create ticket', async () => {
    const mockProps = { history: { push: jest.fn() }, match: { params: { id : 'new'} } };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(sampleCreateResponseJson));

    render(<CreateTicketComponent {...mockProps}/>);
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
    
    userEvent.type(screen.getByPlaceholderText("Title"), "Another one");
    userEvent.type(screen.getByPlaceholderText("Author"), "DJ Khalid");
    userEvent.type(screen.getByPlaceholderText("Description"), "We the best music!");
    userEvent.selectOptions(screen.getByTestId('select-department'), '1');
    userEvent.selectOptions(screen.getByTestId('select-topic'), '1');
    userEvent.click(screen.getByText('Create'));

    await whenStable();
    expect(mockProps.history.push).toBeCalledWith('/');
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });

  test('test Update ticket', async () => {
    const mockProps = { history: { push: jest.fn() }, match: { params: { id : 1} } };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetbyIDJson));

    render(<CreateTicketComponent {...mockProps}/>);
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(3);

    mockAxios.put.mockImplementationOnce(() => Promise.resolve(sampleCreateResponseJson));
    userEvent.click(screen.getByText('Save'));
    await whenStable();

    expect(mockProps.history.push).toBeCalledWith('/');
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
  });

  test('test Add solution ticket', async () => {
    const mockProps = { history: { push: jest.fn() }, match: { params: { id : 1} }, canAddSolution: true };
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetbyIDJson));

    render(<CreateTicketComponent {...mockProps}/>);
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(3);

    mockAxios.put.mockImplementationOnce(() => Promise.resolve(sampleCreateResponseJson));
    userEvent.type(screen.getByPlaceholderText("Solution"), "I don't know what I am doing!");
    userEvent.click(screen.getByText('Mark as Done'));
    await whenStable();

    expect(mockProps.history.push).toBeCalledWith('/');
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
  });
});
