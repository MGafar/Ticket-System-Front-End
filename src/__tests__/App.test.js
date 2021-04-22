import { render, screen } from '@testing-library/react';
import App from '../App';
import mockAxios from 'axios';
import {whenStable} from '../test-utils/Utils'

const sampleReadDepartmentsJson = {
  data: require('./readDepartments.json')
};

const sampleReadAllJson = {
  data: require('./readAll.json')
};

const sampleListTicketComponentHtml = '<div data-testid="tickets"><div class="ticket"><div class="ticket-content-wrapper"><div class="ticket-left-column"><h2><b>Title: </b>VDI Issues</h2><p><b>Description: </b>The VDI has decided to stop working again fml</p><p><b>Solution: </b></p></div><div class="ticket-right-column"><button class="btn btn-info" data-testid="updatebutton1">Update</button><button class="btn btn-danger" data-testid="deletebutton1">Delete</button><button class="btn btn-light" data-testid="statusbutton1">Start Work</button><p><b>ID:</b> 1</p><p><b>Department:</b> FX</p><p><b>Author:</b> Muhamad Gafar</p><p><b>Created:</b> Tue, 13 Apr 2021 10:02:02 GMT</p><p><b>Updated:</b> Tue, 13 Apr 2021 10:02:03 GMT</p></div></div></div><div class="ticket"><div class="ticket-content-wrapper"><div class="ticket-left-column"><h2><b>Title: </b>Symphony is being a douche</h2><p><b>Description: </b>My Symphony has stopped receiving messages</p><p><b>Solution: </b></p></div><div class="ticket-right-column"><button class="btn btn-info" data-testid="updatebutton2">Update</button><button class="btn btn-danger" data-testid="deletebutton2">Delete</button><button class="btn btn-light" data-testid="statusbutton2">Mark As Done</button><p><b>ID:</b> 2</p><p><b>Department:</b> CREDIT</p><p><b>Author:</b> Not Muhamad Gafar</p><p><b>Created:</b> Tue, 13 Apr 2021 10:02:02 GMT</p><p><b>Updated:</b> Tue, 13 Apr 2021 10:02:03 GMT</p></div></div></div><div class="ticket"><div class="ticket-content-wrapper"><div class="ticket-left-column"><h2><b>Title: </b>Titley McTitleFace</h2><p><b>Description: </b>Description McDescriptionFace</p><p><b>Solution: </b></p></div><div class="ticket-right-column"><button class="btn btn-info" data-testid="updatebutton3" disabled="">Update</button><button class="btn btn-danger" data-testid="deletebutton3" disabled="">Delete</button><button class="btn btn-light disabled" data-testid="statusbutton3" disabled="">Done</button><p><b>ID:</b> 3</p><p><b>Department:</b> FX</p><p><b>Author:</b> Author McAuthorFace</p><p><b>Created:</b> Tue, 13 Apr 2021 10:02:02 GMT</p><p><b>Updated:</b> Tue, 13 Apr 2021 10:02:03 GMT</p></div></div></div></div>';

const mockProps = { history: { push: jest.fn() } };

describe('App Integration Test', () => {
  test('generates tickets from readAll.json', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadDepartmentsJson));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(sampleReadAllJson));
    render(<App {...mockProps}/>);
    await whenStable();
    const sampleTickets = screen.getByTestId("tickets");
    expect(sampleTickets).toContainHTML(sampleListTicketComponentHtml);
    expect(mockAxios.get).toHaveBeenCalledTimes(2);
  });
});