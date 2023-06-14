// /**
// * @jest-environment jsdom
// */

import { rootURL } from "../utils/utils";

export async function getReportData(reportId) {
  // debugger; //eslint-disable-line
  let response = await fetch(`${rootURL}/Reports/${reportId}/getReportData`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    mode: 'cors',
    // cache: 'Default',
  });
  response = await response.json();
  return { reportData: response.data };
}

export async function getReportLikes(reportId) {
  const reportData = await getReportData(reportId);
  return { reportLikes: reportData.reportData.likes };
}

export async function getComments(reportId) {
  const reportData = await getReportData(reportId);
  return { reportComments: reportData.reportData.comments };
}

export async function sendComment(reportId, newComment) {
  try {
    const result = await fetch(`${rootURL}/Reports/${reportId}/sendComment`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newComment),
      mode: 'cors',
    });
    return result.json();
  } catch (error) {
    return error;
  }
}

export async function updateLikes(reportId, userId, isLiked) {
  try {
    const result = await fetch(`${rootURL}/Reports/${reportId}/updateLikes`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      // cache: 'default',
      body: JSON.stringify({ userId, reportId, isLiked }),
      mode: 'cors',
    });
    const resultjson = await result.json();
    return resultjson;
  } catch (error) {
    console.log(error);
    return error;
  }
}
