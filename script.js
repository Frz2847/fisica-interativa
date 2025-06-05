// Variáveis globais
let userName = "";
let quizScore = 0;
let totalQuestions = 0;

// Funções de inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se já existe um usuário salvo
    const savedName = localStorage.getItem('newton_user');
    if (savedName) {
        userName = savedName;
        login(true);
    }
});

// Função de login
function login(useSaved = false) {
    if (!useSaved) {
        userName = document.getElementById('nickname').value.trim();
        if (!userName) {
            alert('Por favor, digite seu apelido para continuar.');
            return;
        }
        // Salvar o nome do usuário
        localStorage.setItem('newton_user', userName);
    }
    
    // Atualizar nome na interface
    document.getElementById('user-nickname').textContent = userName;
    
    // Esconder página de login e mostrar conteúdo principal
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    // Mostrar a página do menu principal por padrão
    showPage('menu');
}

// Função para alternar entre páginas
function showPage(pageName) {
    // Esconder todas as páginas
    const pages = ['menu-page', 'laws-page', 'quiz-page', 'about-page', 'games-page'];
    pages.forEach(page => {
        document.getElementById(page).classList.add('hidden');
    });
    
    // Mostrar a página selecionada
    document.getElementById(pageName + '-page').classList.remove('hidden');
    
    // Ações específicas para cada página
    if (pageName === 'quiz') {
        resetQuiz();
    } else if (pageName === 'games') {
        resetGames();
    }
}

// Funções para o Quiz
function resetQuiz() {
    quizScore = 0;
    totalQuestions = 0;
    
    // Resetar todas as perguntas
    const questions = document.querySelectorAll('.quiz-question');
    questions.forEach(question => {
        question.classList.remove('correct', 'incorrect');
        
        // Resetar os botões
        const buttons = question.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('selected');
        });
    });
}

function checkAnswer(button, isYes) {
    const questionDiv = button.closest('.quiz-question');
    const correctAnswer = questionDiv.getAttribute('data-correct');
    
    // Desabilitar os botões após a resposta
    const buttons = questionDiv.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Marcar o botão selecionado
    button.classList.add('selected');
    
    // Verificar se a resposta está correta
    let isCorrect = false;
    if ((correctAnswer === 'yes' && isYes) || (correctAnswer === 'no' && !isYes)) {
        isCorrect = true;
        questionDiv.classList.add('correct');
        quizScore++;
    } else {
        questionDiv.classList.add('incorrect');
    }
    
    totalQuestions++;
    
    // Verificar se todas as perguntas foram respondidas na seção atual
    const section = questionDiv.closest('.quiz-section');
    const sectionQuestions = section.querySelectorAll('.quiz-question');
    let allAnswered = true;
    
    sectionQuestions.forEach(q => {
        if (!q.classList.contains('correct') && !q.classList.contains('incorrect')) {
            allAnswered = false;
        }
    });
    
    // Se todas as perguntas da seção foram respondidas, mostrar feedback
    if (allAnswered) {
        const sectionScore = section.querySelectorAll('.correct').length;
        const sectionTotal = sectionQuestions.length;
        
        if (sectionScore === sectionTotal) {
            showSuccessPopup();
        } else if (sectionScore >= sectionTotal * 0.7) {
            // Mais que 70% correto
            showSuccessPopup();
        } else {
            showFailurePopup();
        }
    }
    
    // Verificar se o quiz inteiro foi completado
    checkQuizCompletion();
}

function checkQuizCompletion() {
    const allQuestions = document.querySelectorAll('.quiz-question');
    let allAnswered = true;
    
    allQuestions.forEach(q => {
        if (!q.classList.contains('correct') && !q.classList.contains('incorrect')) {
            allAnswered = false;
        }
    });
    
    if (allAnswered) {
        const finalScore = (quizScore / allQuestions.length) * 100;
        
        setTimeout(() => {
            if (finalScore >= 70) {
                alert(`Parabéns ${userName}! Você completou o quiz com ${finalScore.toFixed(0)}% de acertos!`);
            } else {
                alert(`Você completou o quiz com ${finalScore.toFixed(0)}% de acertos. Continue estudando!`);
            }
        }, 1500);
    }
}

// Funções para os Jogos
function resetGames() {
    // Resetar o jogo 1
    const ball = document.getElementById('ball');
    if (ball) {
        ball.style.left = '10px';
    }
    
    // Resetar o jogo 2
    const small = document.getElementById('small');
    const large = document.getElementById('large');
    if (small) small.style.left = '10px';
    if (large) large.style.left = '10px';
    
    // Resetar o force slider
    const slider = document.getElementById('force-slider');
    if (slider) slider.value = 5;
    
    // Resetar o jogo 3
    const leftObject = document.getElementById('left-object');
    const rightObject = document.getElementById('right-object');
    if (leftObject) leftObject.style.left = '30%';
    if (rightObject) rightObject.style.left = '60%';
}

// Funções para o Jogo 1 (Primeira Lei - Inércia)
function startGame1() {
    const ball = document.getElementById('ball');
    ball.style.transition = 'left 2s';
    
    // Animar a bola para mostrar diferentes tipos de atrito
    ball.style.left = 'calc(100% - 50px)';
    
    // Trocar superfícies após cada demonstração
    setTimeout(() => {
        ball.style.transition = 'none';
        ball.style.left = '10px';
        document.getElementById('surface1').classList.add('active');
        document.getElementById('surface2').classList.remove('active');
        document.getElementById('surface3').classList.remove('active');
        
        setTimeout(() => {
            ball.style.transition = 'left 1s';
            ball.style.left = 'calc(50% - 25px)';
        }, 500);
    }, 2500);
    
    // Segunda superfície (médio atrito)
    setTimeout(() => {
        ball.style.transition = 'none';
        ball.style.left = '10px';
        document.getElementById('surface1').classList.remove('active');
        document.getElementById('surface2').classList.add('active');
        document.getElementById('surface3').classList.remove('active');
        
        setTimeout(() => {
            ball.style.transition = 'left 1.5s';
            ball.style.left = 'calc(75% - 25px)';
        }, 500);
    }, 5000);
    
    // Terceira superfície (baixo atrito)
    setTimeout(() => {
        ball.style.transition = 'none';
        ball.style.left = '10px';
        document.getElementById('surface1').classList.remove('active');
        document.getElementById('surface2').classList.remove('active');
        document.getElementById('surface3').classList.add('active');
        
        setTimeout(() => {
            ball.style.transition = 'left 2s';
            ball.style.left = 'calc(100% - 50px)';
        }, 500);
    }, 7500);
}

// Funções para o Jogo 2 (Segunda Lei - Força e Aceleração)
function applyForce() {
    const forceValue = parseInt(document.getElementById('force-slider').value);
    const smallObject = document.getElementById('small');
    const largeObject = document.getElementById('large');
    
    // Calcular a distância com base na força e massa
    // A bola menor (menos massa) deve percorrer mais distância
    const smallDistance = forceValue * 8; // Mais aceleração por ter menos massa
    const largeDistance = forceValue * 4; // Menos aceleração por ter mais massa
    
    // Animar os objetos
    smallObject.style.transition = `left ${2/forceValue}s ease-out`;
    largeObject.style.transition = `left ${3/forceValue}s ease-out`;
    
    smallObject.style.left = `calc(10px + ${smallDistance}%)`;
    largeObject.style.left = `calc(10px + ${largeDistance}%)`;
    
    // Exibir explicação
    setTimeout(() => {
        alert(`Demonstração da Segunda Lei de Newton:\n\nMesma força aplicada em massas diferentes produz acelerações diferentes.\n\nO objeto menor (menos massa) moveu-se mais rápido e mais longe que o objeto maior (mais massa).`);
        
        // Resetar posição após alguns segundos
        setTimeout(() => {
            smallObject.style.transition = 'none';
            largeObject.style.transition = 'none';
            smallObject.style.left = '10px';
            largeObject.style.left = '10px';
        }, 2000);
    }, 2000);
}

// Funções para o Jogo 3 (Terceira Lei - Ação e Reação)
function showActionReaction() {
    const leftObject = document.getElementById('left-object');
    const rightObject = document.getElementById('right-object');
    
    // Preparar para colisão
    leftObject.style.transition = 'left 1s ease-in';
    rightObject.style.transition = 'left 1s ease-in';
    
    // Mover objetos para colidir
    leftObject.style.left = '45%';
    rightObject.style.left = '45%';
    
    // Mostrar efeito de colisão e separação
    setTimeout(() => {
        // Adicionar classe de colisão
        leftObject.classList.add('collision');
        rightObject.classList.add('collision');
        
        // Mostrar setas de força
        document.querySelector('.left-arrow').classList.add('visible');
        document.querySelector('.right-arrow').classList.add('visible');
        
        // Afastar após colisão
        setTimeout(() => {
            leftObject.style.transition = 'left 0.8s ease-out';
            rightObject.style.transition = 'left 0.8s ease-out';
            leftObject.style.left = '25%';
            rightObject.style.left = '65%';
            
            // Remover efeitos após animação
            setTimeout(() => {
                leftObject.classList.remove('collision');
                rightObject.classList.remove('collision');
                document.querySelector('.left-arrow').classList.remove('visible');
                document.querySelector('.right-arrow').classList.remove('visible');
                
                // Mostrar explicação
                alert(`Demonstração da Terceira Lei de Newton:\n\nPara cada ação há uma reação igual em intensidade e direção, mas em sentido oposto.\n\nQuando os objetos colidem, ambos exercem força um no outro e se afastam.`);
                
                // Resetar posição após a explicação
                setTimeout(() => {
                    leftObject.style.transition = 'none';
                    rightObject.style.transition = 'none';
                    leftObject.style.left = '30%';
                    rightObject.style.left = '60%';
                }, 500);
            }, 1000);
        }, 1000);
    }, 1000);
}

// Funções para os popups
function showSuccessPopup() {
    document.getElementById('success-popup').classList.add('visible');
    createConfetti();
}

function showFailurePopup() {
    document.getElementById('failure-popup').classList.add('visible');
}

function closePopup() {
    document.getElementById('success-popup').classList.remove('visible');
    document.getElementById('failure-popup').classList.remove('visible');
}

// Função para criar efeito de confete
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        // Cores aleatórias para os confetes
        const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.backgroundColor = randomColor;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        
        confettiContainer.appendChild(confetti);
    }
}