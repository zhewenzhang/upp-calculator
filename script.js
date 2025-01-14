// 获取DOM元素
const xSizeInput = document.getElementById('x-size');
const ySizeInput = document.getElementById('y-size');
const calculateBtn = document.getElementById('calculate-btn');
const resultInput = document.getElementById('result');
const utilizationInput = document.getElementById('utilization');

// 计算UPP函数
function calculateUPP(x, y) {
  const constant = 246.2 - 5 * 2 + 0.3;
  
  // 实现公式
  const xPart = Math.floor(constant / (x + 0.3));
  const yPart = Math.floor(constant / (y + 0.3));
  
  return xPart * yPart * 4;
}

// 计算排班利用率函数
function calculateUtilization(x, y, upp) {
  const utilization = (x * y * upp) / (510 * 515);
  return (utilization * 100).toFixed(2) + '%';
}

// 输入验证
function validateInput(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
}

// 计算尺寸范围结果
function calculateRangeResults(x, y) {
  const results = [];
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      const currentX = x + i;
      const currentY = y + j;
      if (currentX > 0 && currentY > 0) {
        const upp = calculateUPP(currentX, currentY);
        const utilization = calculateUtilization(currentX, currentY, upp);
        results.push({
          x: currentX,
          y: currentY,
          upp,
          utilization
        });
      }
    }
  }
  return results;
}

// 更新对比表格
function updateComparisonTable(results) {
  const table = document.getElementById('comparison-table');
  // 清空现有行
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // 找到最佳利用率
  let bestUtilization = 0;
  results.forEach(result => {
    const utilization = parseFloat(result.utilization);
    if (utilization > bestUtilization) {
      bestUtilization = utilization;
    }
  });

  // 添加新行
  results.forEach(result => {
    const row = document.createElement('tr');
    const isBest = parseFloat(result.utilization) === bestUtilization;
    
    const createCell = (value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      if (isBest) cell.classList.add('best-value');
      return cell;
    };

    row.appendChild(createCell(result.x));
    row.appendChild(createCell(result.y));
    row.appendChild(createCell(result.upp));
    row.appendChild(createCell(result.utilization));
    
    table.appendChild(row);
  });
}

// 事件监听
calculateBtn.addEventListener('click', () => {
  const x = parseFloat(xSizeInput.value);
  const y = parseFloat(ySizeInput.value);

  // 输入验证
  if (!validateInput(x) || !validateInput(y)) {
    resultInput.value = '请输入有效的尺寸';
    utilizationInput.value = '';
    return;
  }

  // 计算结果
  const upp = calculateUPP(x, y);
  const utilization = calculateUtilization(x, y, upp);
  
  resultInput.value = upp;
  utilizationInput.value = utilization;

  // 计算并显示尺寸范围结果
  const rangeResults = calculateRangeResults(x, y);
  updateComparisonTable(rangeResults);
});

// 初始化
xSizeInput.value = '';
ySizeInput.value = '';
resultInput.value = '';
utilizationInput.value = '';
