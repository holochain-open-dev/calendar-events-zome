import { html, fixture, expect, waitUntil } from '@open-wc/testing';

import {
  CREATE_CALENDAR_EVENT,
  HodMyCalendar,
  setupApolloClientElement,
} from '../dist';
import { setupApolloClientMock } from './mocks';

describe('HodMyCalendar', () => {
  it('<hod-my-calendar> renders a newly created event', async () => {
    const client = await setupApolloClientMock();
    customElements.define(
      'hod-my-calendar',
      setupApolloClientElement(HodMyCalendar, client)
    );

    await client.mutate({
      mutation: CREATE_CALENDAR_EVENT,
      variables: {
        title: 'Event 1',
        startTime: Math.floor(Date.now() / 1000),
        endTime: Math.floor(Date.now() / 1000) + 10,
        location: null,
        invitees: [],
      },
    });

    const el = await fixture(html` <hod-my-calendar></hod-my-calendar> `);

    const fullCalendar = el.shadowRoot.querySelector('#calendar');
    await waitUntil(() => fullCalendar.innerHTML.includes('Event 1'));

    expect(fullCalendar.innerHTML).to.include('Event 1');
  });
});
