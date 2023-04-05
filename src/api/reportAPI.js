/**
* @jest-environment jsdom
*/

export async function getReportData(reportId) {
  try {
    const response = await fetch(`http://localhost:8000/report/${reportId}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const report = await response.json();
    console.log(report);
    return report;
  } catch (error) {
    return error;
  }
}

export async function sendComment(reportId, newComment) {
  try {
    const response = await getReportData(reportId);
    response.comments.push(newComment);
    console.log('new comments');
    console.log(response.comments);
    console.log(response);
    const result = await fetch(`http://localhost:8000/report/${reportId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(response),
    }).json();
    return result;
  } catch (error) {
    return error;
  }
}
