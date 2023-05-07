// /**
// * @jest-environment jsdom
// */

// export async function getReportData(reportId) {
//   try {
//     const response = await fetch(`http://localhost:8000/report/${reportId}`, {
//       method: 'GET',
//       headers: { 'content-type': 'application/json' },
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not OK');
//     }
//     const report = await response.json();
//     console.log(report);
//     return report;
//   } catch (error) {
//     return error;
//   }
// }

// export async function sendComment(reportId, newComment) {
//   try {
//     const response = await getReportData(reportId);
//     response.comments.push(newComment);
//     console.log('new comments');
//     console.log(response.comments);
//     console.log(response);
//     const result = await fetch(`http://localhost:8000/report/${reportId}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify(response),
//     }).json();
//     return result;
//   } catch (error) {
//     return error;
//   }
// }
export async function getReportData(reportId) {
  debugger; //eslint-disable-line
  let response = await fetch(`/Reports/${reportId}/getReportData`, {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    mode: 'cors',
    cache: 'Default',
  });
  response = await response.json();
  return { reportData: response.data };
}

export async function getReportLikes(reportId) {
  const reportData = await getReportData(reportId);
  const { likes } = reportData.reportData.likes;
  return { reportLikes: likes };
}

export async function sendComment(reportId, newComment) {
  const response = await fetch(`/Reports/${reportId}/sendComment`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(newComment),
  });
  console.log(response);
  return response;
}

export async function updateLikes(reportId, userId) {
  const result = await fetch(`/Reports/${reportId}/updateLikes`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(userId),
  }).json();
  console.log(result);
  return result;
}
