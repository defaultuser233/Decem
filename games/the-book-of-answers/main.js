// 答案之书
class BookOfAnswers {
    constructor() {
        this.answers = [
            "是", "否", "也许", "毫无疑问", "迹象表明是", "前景不明", "绝对肯定", 
            "不建议", "时机成熟", "再等等", "跟随你的心", "谨慎行事", 
            "宇宙在微笑", "命运说是", "星星说不", "相信你的直觉", 
            "答案在你心中", "时机未到", "勇敢前进", "保持耐心",
            "这是你的选择", "命运掌握在你手中", "顺其自然",
            "需要更多思考", "听取朋友建议", "享受过程",
            "答案即将揭晓", "保持积极态度", "准备迎接变化",
            "专注于当下", "相信自己的能力", "机会即将来临",
            "需要更多努力", "坚持就是胜利", "改变带来成长",
            "行动胜于空谈", "学习带来智慧", "爱是最强力量",
            "向前看", "退一步海阔天空","值得尝试", "三思而后行",
            "慢也好，步子小也好，只要往前走就好",
            "把握现在", "未来可期", "静待花开", "享受痛苦",
            "绳未断，自打转", "船到桥头自然直", "塞翁失马，焉知非福",
            "冰冻三尺非一日之寒", "天道酬勤","柳暗花明又一村",
            "心态决定一切", "用行动说话", "坚持就是胜利",
            "保持好奇", "勇于探索", "乐于分享", "善待自己", "珍惜眼前",
            "学会放下", "拥抱变化", "积极面对", "相信未来", "追求卓越",
            "享受过程", "感恩生活", "创造机会", "挑战自我", "超越极限",
            "梦想成真", "心想事成", "好运连连", "幸福满满", "成功在望",
            "你已急哭", "你没急吧", "我已急哭", "急你太美",
            "干嘛", "应该干嘛", "我也不知道干嘛", "刚才在干嘛",
            "想干嘛", "不想干嘛", "到底要干嘛", "问就是没干嘛",
            "狗蛙", "你是真的狗蛙", "蛙，你是真的狗", "呱唧呱唧汪汪汪",
            "喵喵喵", "汪汪汪", "嗷呜～", "嗷呜，嗷呜",
            "行", "哦哟", "咪的天", "咪", "咪咪", "咪咪咪"
        ];
        
        this.answeredCount = 0;
        this.currentQuestion = '';
        this.isFlipping = false;
        this.history = [];
        
        this.init();
    }

    init() {
        this.loadData();
        this.updateCount();
        this.bindEvents();
        this.showWelcome();
    }

    loadData() {
        try {
            const savedCount = localStorage.getItem('answeredCount');
            const savedHistory = localStorage.getItem('answerHistory');
            
            this.answeredCount = savedCount ? parseInt(savedCount) : 0;
            this.history = savedHistory ? JSON.parse(savedHistory) : [];
        } catch (error) {
            console.warn('xwx 无法加载本地数据，使用默认值');
            this.answeredCount = 0;
            this.history = [];
        }
    }

    saveData() {
        try {
            localStorage.setItem('answeredCount', this.answeredCount.toString());
            localStorage.setItem('answerHistory', JSON.stringify(this.history.slice(-50)));
        } catch (error) {
            console.warn('xwx 无法保存数据到本地存储');
        }
    }

    updateCount() {
        const countElement = document.getElementById('answeredCount');
        if (countElement) {
            countElement.textContent = this.answeredCount;
        }
    }

    bindEvents() {
        const seekBtn = document.getElementById('seekBtn');
        const questionInput = document.getElementById('questionInput');
        const book = document.getElementById('book');
        const returnBtn = document.getElementById('returnBtn');

        if (seekBtn) {
            seekBtn.addEventListener('click', () => this.seekAnswer());
        }
        
        if (questionInput) {
            questionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.seekAnswer();
                }
            });

            questionInput.addEventListener('focus', () => {
                questionInput.style.transform = 'scale(1.02)';
            });

            questionInput.addEventListener('blur', () => {
                questionInput.style.transform = 'scale(1)';
            });
        }

        if (returnBtn) {
            returnBtn.addEventListener('click', () => this.returnToCover());
        }

        if (book) {
            book.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'transform' && this.isFlipping) {
                    setTimeout(() => {
                        this.showAnswer();
                    }, 300);
                }
            });
        }

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.returnToCover();
            }
            if (e.key === 'Enter' && e.ctrlKey) {
                this.seekAnswer();
            }
        });

        // 触摸支持
        this.setupTouchSupport();
    }

    setupTouchSupport() {
        let touchStartY = 0;
        let touchStartTime = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();
            const diff = touchStartY - touchEndY;
            const duration = touchEndTime - touchStartTime;

            // 快速向上滑动触发答案
            if (diff > 50 && duration < 300) {
                this.seekAnswer();
            }
            // 快速向下滑动返回封面
            else if (diff < -50 && duration < 300) {
                this.returnToCover();
            }
        }, { passive: true });
    }

    seekAnswer() {
        if (this.isFlipping) return;

        const questionInput = document.getElementById('questionInput');
        const question = questionInput ? questionInput.value.trim() : '';
        
        if (!question) {
            this.showMessage('请先输入你的问题', 'warning');
            this.animateInputError();
            return;
        }

        this.currentQuestion = question;
        this.isFlipping = true;
        
        // 禁用按钮并显示加载状态
        const seekBtn = document.getElementById('seekBtn');
        const btnText = document.getElementById('btnText');
        const loadingDots = document.getElementById('loadingDots');
        
        if (seekBtn) seekBtn.disabled = true;
        if (btnText) btnText.textContent = '寻找答案中';
        if (loadingDots) loadingDots.style.display = 'inline-block';

        // 播放音效
        this.playSound('pageFlipSound');
        
        // 添加视觉效果
        this.createWindEffect();
        this.createParticles();
        this.createPageFlipGlow();
        
        // 翻页
        const book = document.getElementById('book');
        if (book) {
            book.classList.add('flipped');
        }

        // 显示返回按钮
        const returnBtn = document.getElementById('returnBtn');
        if (returnBtn) {
            returnBtn.classList.add('show');
        }

        // 清空输入框
        if (questionInput) {
            setTimeout(() => {
                questionInput.value = '';
            }, 300);
        }
    }

    showAnswer() {
        const answerDisplay = document.getElementById('answerDisplay');
        const questionDisplay = document.getElementById('questionDisplay');
        const randomAnswer = this.answers[Math.floor(Math.random() * this.answers.length)];
        
        // 显示问题
        if (questionDisplay) {
            questionDisplay.textContent = `问题：${this.currentQuestion}`;
        }
        
        // 保存到历史
        this.history.push({
            question: this.currentQuestion,
            answer: randomAnswer,
            timestamp: new Date().toISOString()
        });
        
        // 打字机效果显示答案
        if (answerDisplay) {
            this.typeWriterEffect(answerDisplay, randomAnswer, () => {
                // 重新启用按钮
                const seekBtn = document.getElementById('seekBtn');
                const btnText = document.getElementById('btnText');
                const loadingDots = document.getElementById('loadingDots');
                
                if (seekBtn) seekBtn.disabled = false;
                if (btnText) btnText.textContent = '✨ 寻求答案 ✨';
                if (loadingDots) loadingDots.style.display = 'none';
                this.isFlipping = false;

                // 更新计数并保存
                this.answeredCount++;
                this.updateCount();
                this.saveData();
            });
        }
    }

    typeWriterEffect(element, text, callback) {
        element.textContent = '';
        let i = 0;
        const speed = 50 + Math.random() * 30;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (callback) setTimeout(callback, 500);
            }
        }, speed);
    }

    createWindEffect() {
        const book = document.getElementById('book');
        if (!book) return;
        
        const wind = document.createElement('div');
        wind.className = 'wind-effect';
        book.appendChild(wind);
        
        // 播放风声
        setTimeout(() => {
            this.playSound('windSound');
        }, 200);
        
        setTimeout(() => {
            wind.remove();
        }, 1200);
    }

    createParticles() {
        const book = document.getElementById('book');
        if (!book) return;
        
        const rect = book.getBoundingClientRect();
        
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 6 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * rect.width}px`;
                particle.style.top = `${Math.random() * rect.height}px`;
                
                particle.style.animationDelay = `${Math.random() * 0.5}s`;
                book.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 1800);
            }, i * 80);
        }
    }

    createPageFlipGlow() {
        const container = document.querySelector('.container');
        if (!container) return;
        
        const glow = document.createElement('div');
        glow.className = 'page-flip-glow';
        container.appendChild(glow);
        
        setTimeout(() => {
            if (glow.parentNode) {
                glow.remove();
            }
        }, 1200);
    }

    playSound(soundId) {
        try {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0;
                sound.volume = 0.3;
                sound.play().catch(e => {
                    console.log('音频播放被阻止:', e);
                });
            }
        } catch (error) {
            console.log('音频播放失败:', error);
        }
    }

    animateInputError() {
        const input = document.getElementById('questionInput');
        if (!input) return;
        
        input.style.animation = 'shake 0.5s';
        
        setTimeout(() => {
            input.style.animation = '';
            input.focus();
        }, 500);
    }

    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message-toast';
        messageDiv.textContent = message;
        
        // 根据类型设置不同样式
        if (type === 'warning') {
            messageDiv.style.background = 'rgba(255, 165, 0, 0.9)';
        } else if (type === 'success') {
            messageDiv.style.background = 'rgba(46, 204, 113, 0.9)';
        }
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 2500);
    }

    returnToCover() {
        if (this.isFlipping) return;
        
        const book = document.getElementById('book');
        if (book && book.classList.contains('flipped')) {
            // 播放返回音效
            this.playSound('pageFlipSound');
            
            book.classList.remove('flipped');
            
            const returnBtn = document.getElementById('returnBtn');
            if (returnBtn) {
                returnBtn.classList.remove('show');
            }
            
            // 清空显示
            setTimeout(() => {
                const answerDisplay = document.getElementById('answerDisplay');
                const questionDisplay = document.getElementById('questionDisplay');
                
                if (answerDisplay) answerDisplay.textContent = '答案即将显现...';
                if (questionDisplay) questionDisplay.textContent = '';
            }, 600);
        }
    }

    showWelcome() {
        if (this.answeredCount === 0) {
            setTimeout(() => {
                this.showMessage('✨ 欢迎来到答案之书！输入你的问题，让智慧指引你 ✨', 'info');
            }, 800);
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    const bookOfAnswers = new BookOfAnswers();
    
    // 暴露到全局，方便调试
    window.bookOfAnswers = bookOfAnswers;
    
    // 页面可见性变化处理
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            const sounds = document.querySelectorAll('audio');
            sounds.forEach(sound => sound.pause());
        }
    });
    
    // 防止页面滚动（移动端）
    document.addEventListener('touchmove', (e) => {
        if (e.target.classList.contains('question-input')) return;
        e.preventDefault();
    }, { passive: false });
});