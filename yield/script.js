// 良率数据
const yieldData = {
  6: [93, 92, 88, 85],
  8: [90, 85, 80, 75],
  10: [90, 82, 75, 72],
  12: [90, 80, 65, 55]
};

// 计算UPP函数
function calculateUPP(x, y) {
  const constant = 246.2 - 5 * 2 + 0.3;
  const xPart = Math.floor(constant / (x + 0.3));
  const yPart = Math.floor(constant / (y + 0.3));
  return xPart * yPart * 4;
}

function calculate() {
  // 获取输入值
  const x = parseFloat(document.getElementById('x-size').value);
  const y = parseFloat(document.getElementById('y-size').value);
  const layers = parseInt(document.getElementById('layers').value);
  
  // 输入验证
  if (isNaN(x) || x <= 0 || isNaN(y) || y <= 0) {
    alert('请输入有效的尺寸（大于0）');
    return;
  }
  
  if (isNaN(layers) || ![6, 8, 10, 12].includes(layers)) {
    alert('请输入有效的层数');
    return;
  }

  // 计算UPP
  const upp = calculateUPP(x, y);

  // 判断尺寸范围
  let sizeRange;
  if (upp > 400) {
    sizeRange = '小尺寸';
  } else if (upp > 64) {
    sizeRange = '中尺寸';
  } else if (upp >= 16) {
    sizeRange = '大尺寸';
  } else {
    sizeRange = '超大尺寸';
  }

  // 获取对应良率
  const yields = yieldData[layers];
  let yieldValue;
  switch(sizeRange) {
    case '小尺寸':
      yieldValue = yields[0];
      break;
    case '中尺寸':
      yieldValue = yields[1];
      break;
    case '大尺寸':
      yieldValue = yields[2];
      break;
    case '超大尺寸':
      yieldValue = yields[3];
      break;
  }

  // 计算样品和量产良率
  const sampleYield = Math.round(yieldValue * 0.8);
  const massYield = yieldValue;

  // 更新表格显示
  document.getElementById('sample-yield').textContent = `${sampleYield}%`;
  document.getElementById('mass-yield').textContent = `${massYield}%`;
  
  // 显示结果表格
  document.getElementById('result-table').style.display = 'table';
}
