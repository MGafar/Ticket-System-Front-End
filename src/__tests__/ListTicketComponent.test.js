import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import mockAxios from 'axios';
import ListTicketComponent from '../components/ListTicketComponent';
import {whenStable} from '../test-utils/Utils'

const sampleReadDataJson = {
  data: require('./readAll.json')
};

const sampleDeleteDataJson = {
  data: require('./delete.json')
};

const sampleGetDepartments = {
  data: require('./readDepartments.json')
}

const sampleMarkAsInProgressJson = {
  data: require('./markAsInProgress.json')
}

const mockProps = { history: { push: jest.fn() } };

describe('TicketsList', () => {
  test('test Create ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();
    userEvent.click(screen.getByText('Create Ticket'));
    expect(mockProps.history.push).toBeCalledWith('/create/new');
  });

  test('test Edit ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();
    userEvent.click(screen.getByTestId('updatebutton1'));
    expect(mockProps.history.push).toBeCalledWith('/create/1');
  });

  test('test Delete ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();

    mockAxios.delete.mockImplementationOnce(() => Promise.resolve(sampleDeleteDataJson));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));

    userEvent.click(screen.getByTestId('deletebutton1'));
    await whenStable();
  });

  test('test change department ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    userEvent.selectOptions(screen.getByTestId('select-department'), 'All');
    await whenStable();

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    userEvent.selectOptions(screen.getByTestId('select-department'), '1');
    await whenStable();
  });

  test('test Mark as In Progress', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleGetDepartments));
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
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();

    userEvent.click(screen.getByTestId('statusbutton2'));
    expect(mockProps.history.push).toBeCalledWith(expect.objectContaining({
      pathname : '/solution/2'
    }));
  });
});