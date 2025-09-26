document.addEventListener('DOMContentLoaded', function() {
    // 功能卡片切换
    const cards = document.querySelectorAll('.card');
    const tabContents = document.querySelectorAll('.tab-content');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            cards.forEach(c => c.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 数据管理标签页切换
    const dataTabs = document.querySelectorAll('.tab-btn');
    const dataTabContents = document.querySelectorAll('.data-tab-content');
    
    dataTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-data-tab');
            
            // 移除所有活动状态
            dataTabs.forEach(t => t.classList.remove('active'));
            dataTabContents.forEach(tc => tc.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 目标选择按钮切换
    const targetButtons = document.querySelectorAll('.target-selection .btn-outline');
    targetButtons.forEach(button => {
        button.addEventListener('click', function() {
            targetButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 上传区域交互
    const uploadArea = document.getElementById('uploadArea');
    const recognitionResult = document.getElementById('recognitionResult');
    
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            // 模拟文件上传和OCR识别过程
            setTimeout(() => {
                uploadArea.style.display = 'none';
                recognitionResult.style.display = 'block';
            }, 1500);
        });
    }
    
    // 任务处理按钮
    const taskButtons = document.querySelectorAll('.task-actions .btn');
    taskButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.textContent.trim();
            
            switch(action) {
                case '开始处理':
                    // 切换到表格识别页面
                    document.querySelector('[data-tab="upload"]').click();
                    break;
                case '查看进度':
                    // 切换到数据管理页面
                    document.querySelector('[data-tab="data"]').click();
                    break;
                case '查看结果':
                    // 切换到数据管理页面的村级大表
                    document.querySelector('[data-tab="data"]').click();
                    setTimeout(() => {
                        document.querySelector('[data-data-tab="village"]').click();
                    }, 100);
                    break;
            }
        });
    });
    
    // 发送通知按钮
    const sendNotifyBtn = document.querySelector('.btn-large');
    if (sendNotifyBtn) {
        sendNotifyBtn.addEventListener('click', function() {
            // 模拟发送通知
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> 发送成功';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    // 切换到数据管理页面查看结果
                    document.querySelector('[data-tab="data"]').click();
                }, 1000);
            }, 2000);
        });
    }
    
    // 确认字段按钮
    const confirmFieldsBtn = document.querySelector('.recognition-result .btn-primary');
    if (confirmFieldsBtn) {
        confirmFieldsBtn.addEventListener('click', function() {
            // 切换到村民通知页面
            document.querySelector('[data-tab="notify"]').click();
        });
    }
    
    // 表格行点击效果
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // 移除其他行的选中状态
            tableRows.forEach(r => r.classList.remove('selected'));
            // 添加当前行的选中状态
            this.classList.add('selected');
        });
    });
    
    // 进度条动画
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // 页面加载时触发进度条动画
        setTimeout(() => {
            progressFill.style.width = '68%';
        }, 500);
    }
    
    // 统计数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue);
        }, 30);
    });
    
    // 添加一些交互提示
    const interactiveElements = document.querySelectorAll('.btn, .card, .task-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// 添加表格行选中样式
const style = document.createElement('style');
style.textContent = `
    tbody tr.selected {
        background-color: #e8f5e8 !important;
        border-left: 3px solid #4CAF50;
    }
    
    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .card:hover {
        animation: pulse 0.3s ease;
    }
`;
document.head.appendChild(style);