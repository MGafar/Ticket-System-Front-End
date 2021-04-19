import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import mockAxios from 'axios';
import ListTicketComponent from '../components/ListTicketComponent';
import {whenStable} from '../test-utils/Utils'

const sampleReadDataJson = {
  data: require('./readAll.json')
};

const mockProps = { history: { push: jest.fn() } };

describe('TicketsList', () => {
  test('test Create ticket', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<ListTicketComponent {...mockProps}/>);
    await whenStable();
    userEvent.click(screen.getByText('Create Ticket'));
    expect(mockProps.history.push).toBeCalledWith('/create');
  });
});