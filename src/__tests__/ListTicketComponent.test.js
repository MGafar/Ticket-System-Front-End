import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import mockAxios from 'axios';
import ListTicketComponent from '../components/ListTicketComponent';
import {whenStable, sampleGetDepartments, sampleReadDataJson, sampleMarkAsInProgressJson, sampleDeleteDataJson, sampleGetTopics} from '../test-utils/Utils'

const mockProps = { history: { push: jest.fn() } };

describe('TicketsList', () => {
  test('test Create ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();
    userEvent.click(screen.getByText('Create Ticket'));
    expect(mockProps.history.push).toBeCalledWith('/create/new');
  });

  test('test Edit ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();
    userEvent.click(screen.getByTestId('updatebutton1'));
    expect(mockProps.history.push).toBeCalledWith('/create/1');
  });

  test('test Delete ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();

    mockAxios.delete.mockImplementationOnce(() => Promise.resolve(sampleDeleteDataJson));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));

    userEvent.click(screen.getByTestId('deletebutton1'));
    await whenStable();
  });

  test('test change department/topic filter', async () => {
    // Initial setup
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(3);

    // Set filter as None
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    userEvent.selectOptions(screen.getByTestId('select-filter'), 'None');
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(4);

    // Set filter mode to departments
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    userEvent.selectOptions(screen.getByTestId('select-filter'), 'Departments');
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(5);

    // Select a department
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    userEvent.selectOptions(screen.getByTestId('select-department-topic'), '1');
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(6);

    // Set filter mode to topics
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    userEvent.selectOptions(screen.getByTestId('select-filter'), 'Topics');
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(7);

    // Select a topic
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    userEvent.selectOptions(screen.getByTestId('select-department-topic'), '1');
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(8);

    // Select any topic
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    userEvent.selectOptions(screen.getByTestId('select-department-topic'), 'All');
    await whenStable();
    expect(mockAxios.get).toHaveBeenCalledTimes(9);
  });

  test('test Mark as In Progress', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();

    mockAxios.put.mockImplementationOnce(() => Promise.resolve(sampleMarkAsInProgressJson));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));

    userEvent.click(screen.getByTestId('statusbutton1'));
    await whenStable();
  });

  test('test Add solution ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetTopics));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();

    userEvent.click(screen.getByTestId('statusbutton2'));
    expect(mockProps.history.push).toBeCalledWith(expect.objectContaining({
      pathname : '/solution/2'
    }));
  });
});