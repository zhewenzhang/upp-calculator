function calculate() {
  // 获取输入值
  const layers = parseInt(document.getElementById('layers').value);
  
  // 输入验证
  if (isNaN(layers) || layers < 1) {
    alert('请输入有效的层数（大于等于1）');
    return;
  }
  
  // 检查是否为偶数
  if (layers % 2 !== 0) {
    alert('请输入正确的层数（必须是偶数）');
    return;
  }

  // 计算各项时间
  const coreTime = 5; // Core时间固定5天
  const buTime = layers / 2 * 4; // BU时间 = 层数/ 2× 6
  const beTime = 11; // BE时间固定11天
  const totalTime = coreTime + buTime + beTime;
  const totalWeeks = (totalTime / 7).toFixed(0); // 转换为周数，保留0位小数

  // 计算样品时间
  const coreSampleTime = coreTime * 1.5;
  const buSampleTime = buTime * 1.5;
  const beSampleTime = beTime * 1.5;
  const totalSampleTime = totalTime * 1.5;
  const totalSampleWeeks = (totalSampleTime / 7).toFixed(0);

  // 更新表格显示
  document.getElementById('core-time').textContent = `${coreTime} 天`;
  document.getElementById('core-sample-time').textContent = `${coreSampleTime} 天`;
  document.getElementById('bu-time').textContent = `${buTime} 天`;
  document.getElementById('bu-sample-time').textContent = `${buSampleTime} 天`;
  document.getElementById('be-time').textContent = `${beTime} 天`;
  document.getElementById('be-sample-time').textContent = `${beSampleTime} 天`;
  document.getElementById('total-time').textContent = `${totalTime} 天`;
  document.getElementById('total-sample-time').textContent = `${totalSampleTime} 天`;
  document.getElementById('total-weeks').textContent = `${totalWeeks} 周`;
  document.getElementById('total-sample-weeks').textContent = `${totalSampleWeeks} 周`;
  
  // 显示结果表格
  document.getElementById('result').style.display = 'table';
}
