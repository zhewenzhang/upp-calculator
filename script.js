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
});

// 初始化
xSizeInput.value = '';
ySizeInput.value = '';
resultInput.value = '';
utilizationInput.value = '';
