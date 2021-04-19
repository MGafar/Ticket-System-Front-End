import { render, screen } from '@testing-library/react';
import App from '../App';
import mockAxios from 'axios';
import {whenStable} from '../test-utils/Utils'

const sampleReadDataJson = {
  data: require('./readAll.json')
};

const sampleListTicketComponentHtml = '<div data-testid="tickets"><div class="ticket"><div class="ticket-content-wrapper"><div class="ticket-left-column"><h2>VDI Issues</h2><p>The VDI has decided to stop working again fml</p></div><div class="ticket-right-column"><p>ID: 1</p><p>Author: Muhamad Gafar</p><p>Created: Tue, 13 Apr 2021 10:02:02 GMT</p><p>Updated: Tue, 13 Apr 2021 10:02:03 GMT</p></div></div></div><div class="ticket"><div class="ticket-content-wrapper"><div class="ticket-left-column"><h2>Symphony is being a douche</h2><p>My Symphony has stopped receiving messages</p></div><div class="ticket-right-column"><p>ID: 2</p><p>Author: Not Muhamad Gafar</p><p>Created: Tue, 13 Apr 2021 10:02:02 GMT</p><p>Updated: Tue, 13 Apr 2021 10:02:03 GMT</p></div></div></div></div>';

const mockProps = { history: { push: jest.fn() } };

describe('App Integration Test', () => {
  test('generates tickets from readAll.json', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDataJson));
    render(<App {...mockProps}/>);
    await whenStable();
    const sampleTickets = screen.getByTestId("tickets");
    expect(sampleTickets).toContainHTML(sampleListTicketComponentHtml);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});