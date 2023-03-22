import axios from 'axios';
import { getUserHistory } from '../api/userProfileAPI';

jest.mock('../api/userProfileAPI.js');

const mockUser = {
    username: 'MockUsername',
    pfp: '../assets/ria_laugh.png',
    skipHistory: [
        { 
            timestamp: 1679326514, // see convertTimestamp in: ChatPeopleComponent.jsx
            class: 'ABC 101'
        },
        { 
            timestamp: 1679326514,
            class: 'XYZ 101'
        },
        { 
            timestamp: 1679326514,
            class: 'XYZ 101'
        },
        { 
            timestamp: 1679326514,
            class: 'ABC 101'
        },
        { 
            timestamp: 1679326514,
            class: 'XYZ 101'
        }
    ],
    classes: [
        {
            title: 'ABC 101',
            days: ['Wed', 'Fri'],
            start: 1300,
            end: 1430
        },
        {
            title: 'XYZ 101',
            days: ['Wed'],
            start: 1500,
            end: 1700
        },
        {
            title: 'ABC 201',
            days: ['Tue', 'Thu'],
            start: 1300,
            end: 1430
        }
    ]
};

getUserHistory.mockResolvedValue(mockUser)

test('usernameCorrect', async () => {
    const data = await getUserHistory();
    expect(data.username).toBe('MockUsername');
});

test('skipHistoryCorrect', async () => {
    const data = await getUserHistory();
    expect(data.skipHistory.length).toBe(5);
});

test('numClassesCorrect', async () => {
    const data = await getUserHistory();
    expect(data.classes.length).toBe(3);
});

test('getUserHistory', async () => {
    return expect(getUserHistory()).resolves.toBe(mockUser);
})