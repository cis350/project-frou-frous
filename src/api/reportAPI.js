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

export async function getReportData(reportId) {
  // debugger; //eslint-disable-line
  let response = await fetch(`http://localhost:5000/Reports/${reportId}/getReportData`, {
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
    // const response = await getReportData(reportId);
    // response.comments.push(JSON.stringify(newComment));
    // console.log('new comments');
    // console.log(response.comments);
    // console.log(response);
    const result = await fetch(`http://localhost:5000/Reports/${reportId}/sendComment`, {
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

// export async function sendComment(reportId, newComment) {
//   const response = await fetch(`http://localhost:5000/Reports/${reportId}/sendComment`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     mode: 'cors',
//     cache: 'default',
//     body: JSON.stringify(newComment),
//   });
//   console.log(response);
//   return response;
// }

export async function updateLikes(reportId, userId) {
  try {
    const result = await fetch(`http://localhost:5000/Reports/${reportId}/updateLikes`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      // cache: 'default',
      body: JSON.stringify({ userId, reportId }),
      mode: 'cors',
    });
    console.log('update likes json');
    const resultjson = await result.json();
    console.log(resultjson);
    return resultjson;
  } catch (error) {
    console.log('wario is scared of weemen');
    console.log(error);
    return error;
  }
}
