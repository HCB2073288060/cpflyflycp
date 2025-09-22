/**
 * 转盘逻辑处理
 */
class Spinner {
    constructor() {
        this.spinnerElement = document.getElementById('spinner');
        this.spinButton = document.getElementById('spin-button');
        this.isSpinning = false;
        this.taskCount = dareTasks.length;
        this.sectorAngle = 360 / this.taskCount;
        this.currentRotation = 0;
        this.initializeSpinner();
    }

    /**
     * 初始化转盘
     */
    initializeSpinner() {
        this.createSectors();
        this.addEventListeners();
    }

    /**
     * 创建转盘扇区
     */
    createSectors() {
        // 清空转盘内容
        this.spinnerElement.innerHTML = '';

        // 为每个任务创建扇区
        for (let i = 0; i < this.taskCount; i++) {
            const sector = document.createElement('div');
            sector.classList.add('spinner-section');
            
            // 设置扇区样式
            const rotation = i * this.sectorAngle;
            
            // 计算扇形的起始角度和结束角度
            const startAngle = rotation;
            const endAngle = rotation + this.sectorAngle;
            
            // 计算两点坐标（使用极坐标转换为笛卡尔坐标）
            // 这里我们使用百分比来确保响应式
            const centerX = 50; // 圆心X坐标（百分比）
            const centerY = 50; // 圆心Y坐标（百分比）
            const radius = 50; // 半径（百分比）
            
            // 计算起始点坐标（从圆心开始）
            const startRad = (startAngle - 90) * Math.PI / 180;
            const startX = centerX + radius * Math.cos(startRad);
            const startY = centerY + radius * Math.sin(startRad);
            
            // 计算结束点坐标
            const endRad = (endAngle - 90) * Math.PI / 180;
            const endX = centerX + radius * Math.cos(endRad);
            const endY = centerY + radius * Math.sin(endRad);
            
            // 使用clip-path创建从圆心开始的扇形
            // polygon格式：圆心坐标, 起始点坐标, 结束点坐标
            const clipPath = `polygon(${centerX}% ${centerY}%, ${startX}% ${startY}%, ${endX}% ${endY}%)`;
            
            // 设置扇区样式，确保从圆心开始均匀分布
            sector.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: ${generateRandomColor()};
                clip-path: ${clipPath};
            `;
            
            this.spinnerElement.appendChild(sector);
        }
    }

    /**
     * 添加事件监听器
     */
    addEventListeners() {
        if (this.spinButton) {
            this.spinButton.addEventListener('click', () => this.spin());
        }
    }

    /**
     * 旋转转盘
     */
    spin() {
        if (this.isSpinning) return;

        this.isSpinning = true;
        this.spinButton.disabled = true;

        // 计算随机旋转角度（至少3圈，最多6圈）
        const randomSpins = 3 + Math.random() * 3;
        const randomRotation = randomSpins * 360;
        
        // 确保旋转后有一个扇区正好对准箭头
        // 调整目标索引，确保箭头指向扇形的中心位置
        const targetIndex = Math.floor(Math.random() * this.taskCount);
        // 计算目标旋转角度，让箭头指向扇形的中心而不是边缘
        const targetRotation = (this.taskCount - targetIndex) * this.sectorAngle - this.sectorAngle / 2;
        
        // 总旋转角度
        const totalRotation = this.currentRotation + randomRotation + targetRotation;
        
        // 应用旋转动画
        this.spinnerElement.style.transform = `rotate(${totalRotation}deg)`;
        
        // 更新当前旋转角度
        this.currentRotation = totalRotation % 360;
        
        // 动画结束后获取结果
        setTimeout(() => {
            this.isSpinning = false;
            this.spinButton.disabled = false;
            
            // 获取选中的任务
            const selectedTask = dareTasks[targetIndex];
            
            // 触发任务选中事件
            this.onTaskSelected(selectedTask);
        }, 4000); // 与CSS中的transition时间一致
    }

    /**
     * 任务选中回调函数
     * 可以被子类或其他模块覆盖
     * @param {string} task 选中的任务
     */
    onTaskSelected(task) {
        // 默认实现，可以在game.js中覆盖
        console.log('选中的任务:', task);
    }

    /**
     * 重置转盘状态
     */
    reset() {
        this.currentRotation = 0;
        this.spinnerElement.style.transform = 'rotate(0deg)';
    }
}

/**
 * 导出模块
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Spinner;
}