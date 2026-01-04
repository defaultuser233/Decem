const questions = [
    {
        question: "初雪降临时，你会？",
        options: [
            { text: "冲出去拍照，记录这美好瞬间", value: "fire" },
            { text: "窝在窗边喝热可可，享受宁静", value: "water" },
            { text: "约上好友打雪仗，共享欢乐", value: "air" },
            { text: "静静欣赏雪花飘落，思考人生", value: "earth" }
        ]
    },
    {
        question: "面对困难时，你的第一反应是？",
        options: [
            { text: "勇往直前，直面挑战", value: "fire" },
            { text: "冷静分析，寻找最佳解决方案", value: "water" },
            { text: "寻求朋友帮助，集思广益", value: "air" },
            { text: "稳扎稳打，制定详细计划", value: "earth" }
        ]
    },
    {
        question: "理想的周末是怎样的？",
        options: [
            { text: "户外冒险，挑战极限运动", value: "fire" },
            { text: "在家读书，享受宁静时光", value: "water" },
            { text: "聚会社交，结识新朋友", value: "air" },
            { text: "整理规划，为未来做准备", value: "earth" }
        ]
    },
    {
        question: "选择一种颜色代表自己？",
        options: [
            { text: "热情似火的红色", value: "fire" },
            { text: "深邃宁静的海洋蓝", value: "water" },
            { text: "轻盈飘逸的天空蓝", value: "air" },
            { text: "踏实稳重的大地棕", value: "earth" }
        ]
    },
    {
        question: "如果拥有一种超能力，你希望是？",
        options: [
            { text: "操控火焰的力量", value: "fire" },
            { text: "与水流沟通的能力", value: "water" },
            { text: "自由翱翔于天空", value: "air" },
            { text: "让植物快速生长", value: "earth" }
        ]
    },
    {
        question: "在社交场合中，你通常是？",
        options: [
            { text: "活跃气氛的焦点", value: "fire" },
            { text: "安静观察的倾听者", value: "water" },
            { text: "善于交际的桥梁", value: "air" },
            { text: "稳重可靠的伙伴", value: "earth" }
        ]
    },
    {
        question: "面对新环境，你会？",
        options: [
            { text: "立刻探索，充满好奇", value: "fire" },
            { text: "先观察，适应后再行动", value: "water" },
            { text: "结交新朋友快速融入", value: "air" },
            { text: "建立自己的舒适区", value: "earth" }
        ]
    },
    {
        question: "你最喜欢的时间是？",
        options: [
            { text: "充满活力的清晨", value: "fire" },
            { text: "宁静的深夜", value: "water" },
            { text: "温暖的午后", value: "air" },
            { text: "稳定有序的工作时间", value: "earth" }
        ]
    },
    {
        question: "选择一种音乐类型？",
        options: [
            { text: "激昂的摇滚乐", value: "fire" },
            { text: "舒缓的古典乐", value: "water" },
            { text: "轻松的流行乐", value: "air" },
            { text: "稳定的民谣", value: "earth" }
        ]
    },
    {
        question: "你的决策风格是？",
        options: [
            { text: "果断迅速，相信直觉", value: "fire" },
            { text: "深思熟虑，权衡利弊", value: "water" },
            { text: "参考多方意见", value: "air" },
            { text: "遵循传统和经验", value: "earth" }
        ]
    }
];

const results = {
    fire: {
        title: "♈ 白羊座 · 烈焰战马",
        description: "你拥有如火焰般炽热的灵魂，充满激情与勇气。像烈焰战马一样，你勇往直前，无惧挑战，总是带领他人冲向新的征程。你的热情能点燃周围每个人的心，象征着新的开始和无限可能。"
    },
    water: {
        title: "♓ 双鱼座 · 深海灵鲸",
        description: "你的灵魂如深海般深邃神秘，拥有无限的包容与智慧。像深海灵鲸一样，你温柔而强大，能够感知他人的情绪，用温暖治愈周围的灵魂。你的直觉敏锐，富有同情心，是团队的疗愈者。"
    },
    air: {
        title: "♊ 双子座 · 风语灵雀",
        description: "你拥有如风般自由的灵魂，机智灵活，善于沟通。像风语灵雀一样，你带来欢乐与灵感，用你的智慧和幽默为世界增添色彩。你的思维敏捷，适应力强，总能找到新的视角和解决方案。"
    },
    earth: {
        title: "♑ 摩羯座 · 大地神龟",
        description: "你的灵魂如大地般稳重坚实，值得信赖。像大地神龟一样，你脚踏实地，坚持不懈，用你的耐心和毅力创造着持久的价值。你的责任感强，是团队中稳定的基石和值得依赖的力量。"
    }
};

let currentQuestion = 0;
let answers = [];

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    // 添加计数器
    const counter = document.createElement('span');
    counter.className = 'question-counter';
    counter.textContent = `问题 ${currentQuestion + 1} / ${questions.length}`;
    document.querySelector('.question').prepend(counter);
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
        button.onclick = () => selectOption(option.value);
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

function selectOption(value) {
    answers.push(value);
    
    // 添加选中效果
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    event.target.classList.add('selected');
    
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = progress + '%';
    
    // 添加进度条动画
    progressFill.style.transition = 'width 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

function showResult() {
    // 计算各元素得分
    const elementScores = { fire: 0, water: 0, air: 0, earth: 0 };
    answers.forEach(answer => {
        elementScores[answer]++;
    });
    
    // 找出最高分
    const dominantElement = Object.keys(elementScores).reduce((a, b) => 
        elementScores[a] > elementScores[b] ? a : b
    );
    
    const result = results[dominantElement];
    
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDescription').textContent = result.description;
    
    // 添加结果显示动画
    const resultCard = document.querySelector('.result-card');
    resultCard.style.animation = 'zoomIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
}

function downloadResult() {
    // 创建canvas元素
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    
    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(0.5, '#4ecdc4');
    gradient.addColorStop(1, '#45b7d1');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 添加装饰性元素
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 150 + 50,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
    
    // 绘制标题
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 85px Microsoft YaHei';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.fillText(document.getElementById('resultTitle').textContent, canvas.width / 2, 450);
    ctx.shadowBlur = 0;
    
    // 绘制装饰线
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(150, 520);
    ctx.lineTo(canvas.width - 150, 520);
    ctx.stroke();
    
    // 绘制描述文字
    ctx.fillStyle = '#ffffff';
    ctx.font = '45px Microsoft YaHei';
    ctx.textAlign = 'center';
    const description = document.getElementById('resultDescription').textContent;
    
    const maxWidth = canvas.width - 200;
    const lineHeight = 65;
    let y = 600;
    
    const words = description.split('');
    let line = '';
    
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i];
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line, canvas.width / 2, y);
            line = words[i];
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    
    if (line) {
        ctx.fillText(line, canvas.width / 2, y);
    }
    
    // 添加装饰元素
    ctx.font = 'italic 40px Microsoft YaHei';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('星座灵魂动物·究极版', canvas.width / 2, canvas.height - 120);
    
    // 添加二维码位置
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(canvas.width - 180, canvas.height - 180, 140, 140);
    ctx.fillStyle = '#ffffff';
    ctx.font = '25px Microsoft YaHei';
    ctx.fillText('扫描二维码', canvas.width - 110, canvas.height - 140);
    ctx.fillText('获取更多测试', canvas.width - 110, canvas.height - 100);
    
    // 下载图片
    const link = document.createElement('a');
    link.download = '我的星座灵魂动物.png';
    link.href = canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function restartQuiz() {
    currentQuestion = 0;
    answers = [];
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('progressFill').style.width = '0%';
    
    // 重置进度条动画
    const progressFill = document.getElementById('progressFill');
    progressFill.style.transition = 'none';
    setTimeout(() => {
        progressFill.style.transition = 'width 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }, 10);
    
    startQuiz();
}

// 初始化测试
document.addEventListener('DOMContentLoaded', startQuiz);