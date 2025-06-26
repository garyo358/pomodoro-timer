class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.breakTime = 5 * 60; // 5分
        this.isWorking = true;
        this.isRunning = false;
        this.timer = null;
        this.pomodoroCount = 0; // ポモドーロ回数
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.resetButton = document.getElementById('reset');
        this.workInput = document.getElementById('work');
        this.breakInput = document.getElementById('break');
        this.pomodoroCountElement = document.getElementById('pomodoro-count');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        this.workInput.addEventListener('change', () => this.updateWorkTime());
        this.breakInput.addEventListener('change', () => this.updateBreakTime());
    }

    toggleTimer() {
        if (this.isRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        this.isRunning = true;
        this.startButton.textContent = '停止';
        
        this.timer = setInterval(() => {
            if (this.workTime > 0) {
                this.workTime--;
                this.updateDisplay();
            } else {
                this.stopTimer();
                // 作業セッションが終わったらカウントを増やす
                if (this.isWorking) {
                    this.pomodoroCount++;
                }
                this.isWorking = !this.isWorking;
                
                if (this.isWorking) {
                    this.workTime = this.workInput.value * 60;
                } else {
                    this.workTime = this.breakInput.value * 60;
                }
                this.updateDisplay();
                this.startTimer();
            }
        }, 1000);
    }

    stopTimer() {
        this.isRunning = false;
        this.startButton.textContent = '開始';
        clearInterval(this.timer);
    }

    resetTimer() {
        this.stopTimer();
        this.workTime = this.workInput.value * 60;
        this.isWorking = true;
        this.pomodoroCount = 0;
        this.updateDisplay();
    }

    updateWorkTime() {
        if (this.isWorking) {
            this.workTime = this.workInput.value * 60;
            this.updateDisplay();
        }
    }

    updateBreakTime() {
        if (!this.isWorking) {
            this.workTime = this.breakInput.value * 60;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.workTime / 60);
        const seconds = this.workTime % 60;
        this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        if (this.pomodoroCountElement) {
            this.pomodoroCountElement.textContent = `ポモドーロ回数: ${this.pomodoroCount}`;
        }
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();
