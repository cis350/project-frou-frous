import { getFriendReports, getPfp, getReport } from '../api/userPageAPI';

jest.mock('../api/userPageAPI.js');

const mockReportIds = {
    reportIds: [1, 2, 3],
};

const mockReport = {
    username: 'John',
    picture: 'https://i1.sndcdn.com/artworks-5fyeRojbMeUUbmbT-qqZ5NQ-t500x500.jpg',
}

const mockPfp = {
    pfp: 'https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg',
}

getFriendReports.mockResolvedValue(mockReportIds);
getPfp.mockResolvedValue(mockPfp);
getReport.mockResolvedValue(mockReport);

test('gettingReportIds', async () => {
    const data = await getFriendReports();
    expect(data.reportIds).toStrictEqual([1, 2, 3]);
});

test('gettReportIds', async () => {
    return expect(getFriendReports()).resolves.toBe(mockReportIds);
});

test('gettingReportInfo', async () => {
    const { username, picture } = await getReport();
    expect(username).toBe('John');
    expect(picture).toBe('https://i1.sndcdn.com/artworks-5fyeRojbMeUUbmbT-qqZ5NQ-t500x500.jpg');
});

test('getReportInfo', async () => {
    return expect(getReport()).resolves.toBe(mockReport);
});

test('gettingPfpLink', async () => {
    const data = await getPfp();
    expect(data.pfp).toBe('https://s-i.huffpost.com/gen/1224269/images/o-ANGRY-STOCK-PHOTOS-facebook.jpg');
});

test('getPfp', async () => {
    return expect(getPfp()).resolves.toBe(mockPfp);
});