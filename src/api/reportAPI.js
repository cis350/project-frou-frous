/**
* @jest-environment jsdom
*/

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // eslint-disable-line

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const coms = [
    {
        userId: 'Friend 1 Id',
        commentString: 'lol skipping again',
    },
    {
        userId: 'Friend 2 Id',
        commentString: 'Lorem ipsum',
    },
];

// const pathRegex = new RegExp('\/reports\/*'); // eslint-disable-line
// mock.onGet(pathRegex).reply(200, {
//     comments: coms,
// });

mock.onGet('/reports/0').reply(200, {
    comments: coms,
})

const postRegex = new RegExp('\/reportId\/send\/*'); // eslint-disable-line
mock.onPost(postRegex).reply(200, {});

export async function getReportComments(reportId) {
    const res = await axios.get(`/reports/${reportId}`);
    return res.data;
}

export async function sendComment(commentString) {
    const res = await axios.post(`/reportId/send/${commentString}`);
    coms.push({
        userId: 'Your Username',
        commentString,
    });
    return res.data;
}