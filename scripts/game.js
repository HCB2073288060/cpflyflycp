/**
 * 主游戏逻辑
 */
class Game {
    constructor() {
        // 初始化游戏组件
        this.spinner = new Spinner();
        this.initializeElements();
        this.initializeEvents();
        this.setupSpinnerCallback();
    }

    /**
     * 初始化DOM元素
     */
    initializeElements() {
        this.resultModal = document.getElementById('result-modal');
        this.taskResultElement = document.getElementById('task-result');
        this.closeModalButton = document.getElementById('close-modal');
        this.newTaskButton = document.getElementById('new-task-button');
    }

    /**
     * 初始化事件监听器
     */
    initializeEvents() {
        if (this.closeModalButton) {
            this.closeModalButton.addEventListener('click', () => this.hideResult());
        }

        if (this.newTaskButton) {
            this.newTaskButton.addEventListener('click', () => {
                this.hideResult();
                // 延迟一点时间再允许旋转，让用户体验更自然
                setTimeout(() => {
                    if (this.spinner && this.spinner.spinButton) {
                        this.spinner.spinButton.disabled = false;
                    }
                }, 500);
            });
        }

        // 点击模态框外部关闭模态框
        window.addEventListener('click', (event) => {
            if (event.target === this.resultModal) {
                this.hideResult();
            }
        });

        // 监听键盘事件
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.resultModal.style.display === 'flex') {
                this.hideResult();
            }
        });
    }

    /**
     * 设置转盘回调函数
     */
    setupSpinnerCallback() {
        // 覆盖Spinner类的onTaskSelected方法
        this.spinner.onTaskSelected = (task) => {
            this.showResult(task);
        };
    }

    /**
     * 显示游戏结果
     * @param {string} task 选中的任务
     */
    showResult(task) {
        if (this.taskResultElement) {
            this.taskResultElement.textContent = task;
        }

        if (this.resultModal) {
            // 添加动画效果
            this.resultModal.style.display = 'flex';
            
            // 给模态框内容添加动画
            const modalContent = this.resultModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(-20px)';
                modalContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translateY(0)';
                }, 50);
            }
        }
    }

    /**
     * 隐藏游戏结果
     */
    hideResult() {
        if (this.resultModal) {
            const modalContent = this.resultModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    this.resultModal.style.display = 'none';
                }, 300);
            } else {
                this.resultModal.style.display = 'none';
            }
        }
    }

    /**
     * 重置游戏
     */
    reset() {
        this.hideResult();
        if (this.spinner) {
            this.spinner.reset();
        }
    }
}

/**
 * 页面加载完成后初始化游戏
 */
document.addEventListener('DOMContentLoaded', () => {
    // 创建游戏实例
    const game = new Game();
    
    // 添加一些全局辅助函数
    window.resetGame = () => {
        if (game && typeof game.reset === 'function') {
            game.reset();
        }
    };
    
    // 适配移动设备的触摸事件
    if ('ontouchstart' in window) {
        // 优化触摸体验
        document.body.classList.add('touch-device');
        
        // 为旋转按钮添加触摸反馈
        const spinButton = document.getElementById('spin-button');
        if (spinButton) {
            spinButton.addEventListener('touchstart', () => {
                spinButton.style.transform = 'scale(0.95)';
            });
            
            spinButton.addEventListener('touchend', () => {
                spinButton.style.transform = '';
            });
        }
    }
});

/**
 * 导出模块
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Game;
}