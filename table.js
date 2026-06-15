// table.js

// JSON 파일을 가져와서 테이블을 생성하는 함수
async function fetchJsonAndCreateTable(jsonFilePath) {
  try {
    // JSON 파일 fetch
    const response = await fetch(jsonFilePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const tableData = await response.json();

    // 테이블 생성
    const tableHTML = createTable(tableData);

    // DOM에 테이블 삽입
    const tableContainer = document.getElementById('tableContainer');
    if (tableContainer) {
      tableContainer.innerHTML = tableHTML;
    } else {
      console.error('tableContainer 요소를 찾을 수 없습니다.');
    }

  } catch (error) {
    console.error('JSON 파일을 불러오는 중 오류가 발생했습니다:', error);

    // 오류 메시지를 화면에 표시
    const tableContainer = document.getElementById('tableContainer');
    if (tableContainer) {
      tableContainer.innerHTML = `
        <div style="color: red; padding: 20px; text-align: center;">
          <h3>데이터를 불러오는 중 오류가 발생했습니다.</h3>
          <p>오류 내용: ${error.message}</p>
        </div>
      `;
    }
  }
}

// 테이블 생성 함수
function createTable(tableData) {
  let tableHTML = `
    <table border="1" style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 12px; text-align: center; font-weight: bold;">이 름/GitHub</th>
          <th style="padding: 12px; text-align: center; font-weight: bold;">Java코드</th>
          <th style="padding: 12px; text-align: center; font-weight: bold;">JSP코드</th>
          <th style="padding: 12px; text-align: center; font-weight: bold;">팀프로젝트</th>
        </tr>
      </thead>
      <tbody>
  `;

  // 각 데이터 행 생성
  tableData.forEach(function (item, index) {
    const nameAndGithub = item.name.split('/');
    const userName = nameAndGithub[0];
    const githubId = nameAndGithub[1];

    // 행의 배경색을 번갈아 가며 설정
    const rowBgColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';

    tableHTML += `
      <tr style="background-color: ${rowBgColor};">
        <td style="padding: 10px; text-align: center;">
          <strong>${userName}</strong><br>
          <a href="https://github.com/${githubId}" target="_blank" 
             style="color: #0066cc; text-decoration: none; font-size: 0.9em;">
            @${githubId}
          </a>
        </td>
        <td style="padding: 10px; text-align: center;">
          <strong>${userName}</strong><br>
          <a href="https://github.com/${githubId}/${item.link1}" target="_blank" 
             style="color: #0066cc; text-decoration: none; font-size: 0.9em;">
            ${item.link1}
          </a>
        </td>
        <td style="padding: 10px; text-align: center;">
          <strong>${userName}</strong><br>
          <a href="https://github.com/${githubId}/${item.link2}" target="_blank" 
             style="color: #0066cc; text-decoration: none; font-size: 0.9em;">
            ${item.link2}
          </a>
        </td>
        <td style="padding: 10px; text-align: center;">
          <strong>${userName}</strong><br>
          <a href="https://github.com/${githubId}/${item.link99}" target="_blank" 
             style="color: #0066cc; text-decoration: none; font-size: 0.9em;">
            ${item.link99}
          </a>
        </td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
    <div style="margin-top: 10px; font-size: 0.9em; color: #666; text-align: center;">
      총 ${tableData.length}명의 학생 프로젝트
    </div>
  `;

  return tableHTML;
}

// 호버 효과를 위한 CSS 스타일 추가
function addTableStyles() {
  const style = document.createElement('style');
  style.textContent = `
    table tr:hover {
      background-color: #e6f3ff !important;
    }
    
    table a:hover {
      background-color: #0066cc !important;
      color: white !important;
      text-decoration: none !important;
    }
    
    @media (max-width: 768px) {
      table {
        font-size: 0.8em;
      }
      
      table th, table td {
        padding: 6px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// DOM이 로드된 후 스타일 추가
document.addEventListener('DOMContentLoaded', function () {
  addTableStyles();
});