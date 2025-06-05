// Variável global para armazenar acertos
let correctAnswers = 0;
const totalQuestions = 10;

// Função modificada checkAnswer
function checkAnswer(questionName, correctAnswer, feedbackId) {
    const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
    const feedback = document.getElementById(feedbackId);
    
    if (!selectedAnswer) {
        feedback.innerHTML = "Por favor, selecione uma alternativa antes de verificar a resposta.";
        feedback.className = "feedback incorrect";
        feedback.style.display = "block";
        return;
    }
    
    // Verifica se a questão já foi respondida corretamente antes
    const wasCorrect = feedback.classList.contains('answered-correct');
    
    if (selectedAnswer.value === correctAnswer) {
        feedback.innerHTML = "✅ Correto! Excelente compreensão da lei de Newton.";
        feedback.className = "feedback correct answered-correct";
        
        // Só incrementa se não foi respondida corretamente antes
        if (!wasCorrect) {
            correctAnswers++;
            showCongratulations(); // Mostra mensagem de parabéns
        }
    } else {
        let explanation = "";
        
        switch(questionName) {
            case 'q1':
                explanation = "❌ Incorreto. Pela Lei da Inércia, um objeto em repouso tende a permanecer em repouso quando não há forças externas atuando sobre ele.";
                break;
            case 'q2':
                explanation = "❌ Incorreto. Pela Lei da Inércia, os passageiros tendem a continuar em movimento para frente quando o carro para abruptamente.";
                break;
            case 'q3':
                explanation = "❌ Incorreto. O astronauta flutuando no espaço demonstra a Primeira Lei de Newton (Inércia) - na ausência de forças externas, o corpo mantém seu estado de movimento ou repouso.";
                break;
            case 'q4':
                explanation = "❌ Incorreto. Pela Segunda Lei de Newton (F=ma), se a força dobra e a massa permanece constante, a aceleração também dobra.";
                break;
            case 'q5':
                explanation = "❌ Incorreto. Usando F=ma: 50N = 10kg × a, logo a = 5 m/s².";
                break;
            case 'q6':
                explanation = "❌ Incorreto. A pessoa empurrando o carrinho demonstra a Segunda Lei de Newton (F=ma) - a força aplicada produz aceleração proporcional à massa do objeto.";
                break;
            case 'q7':
                explanation = "❌ Incorreto. Pela Terceira Lei de Newton, quando o foguete empurra os gases para baixo (ação), os gases empurram o foguete para cima (reação).";
                break;
            case 'q8':
                explanation = "❌ Incorreto. Ao nadar, você empurra a água para trás (ação) e a água te empurra para frente (reação), pela Terceira Lei de Newton.";
                break;
            case 'q9':
                explanation = "❌ Incorreto. Ao jogar a bola, você aplica uma força na bola (ação) e a bola aplica uma força igual e oposta em sua mão (reação) - Terceira Lei de Newton.";
                break;
            case 'q10':
                explanation = "❌ Incorreto. O foguete empurra o solo com sua propulsão, fazendo-o subir. - o foguete empurra o chão (ação), e ele é empurrado na direção oposta (reação).";
                break;
        }
        
        feedback.innerHTML = explanation;
        feedback.className = "feedback incorrect";
        
        // Remove classe de correto se estava marcada antes
        if (wasCorrect) {
            correctAnswers--;
        }
    }
    
    feedback.style.display = "block";
    updateScoreDisplay();
}

// Função para mostrar mensagem de parabéns
function showCongratulations() {
    // Cria elemento de parabéns temporário
    const congratsElement = document.createElement('div');
    congratsElement.innerHTML = `🎉 Parabéns! Você acertou ${correctAnswers} ${correctAnswers === 1 ? 'questão' : 'questões'}! 🎉`;
    congratsElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #2ecc71, #27ae60);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: bounceIn 0.6s ease-out;
    `;
    
    // Adiciona animação CSS
    if (!document.getElementById('congrats-animation')) {
        const style = document.createElement('style');
        style.id = 'congrats-animation';
        style.textContent = `
            @keyframes bounceIn {
                0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(congratsElement);
    
    // Remove o elemento após 2 segundos
    setTimeout(() => {
        if (congratsElement.parentNode) {
            congratsElement.parentNode.removeChild(congratsElement);
        }
    }, 2000);
}

// Função para mostrar pontuação final
function updateScoreDisplay() {
    let scoreElement = document.getElementById('final-score');
    if (!scoreElement) {
        // Cria o elemento de pontuação se não existir
        scoreElement = document.createElement('div');
        scoreElement.id = 'final-score';
        scoreElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3498db;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
        `;
        document.body.appendChild(scoreElement);
    }
    
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    scoreElement.innerHTML = `
        <div>Acertos: ${correctAnswers}/${totalQuestions}</div>
        <div>Porcentagem: ${percentage}%</div>
    `;
    
    // Muda a cor baseada na performance
    if (percentage >= 80) {
        scoreElement.style.background = '#2ecc71'; // Verde
    } else if (percentage >= 60) {
        scoreElement.style.background = '#f39c12'; // Laranja
    } else {
        scoreElement.style.background = '#e74c3c'; // Vermelho
    }
}

// Função para mostrar resultado final detalhado
function showFinalResult() {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    let message = `🎯 Resultado Final do Quiz das Leis de Newton\n\n`;
    message += `Acertos: ${correctAnswers} de ${totalQuestions} questões\n`;
    message += `Porcentagem: ${percentage}%\n\n`;
    
    if (percentage >= 90) {
        message += "🏆 Excelente! Você domina as Leis de Newton!";
    } else if (percentage >= 70) {
        message += "👏 Muito bom! Você tem um bom entendimento das Leis de Newton.";
    } else if (percentage >= 50) {
        message += "📚 Regular. Recomendo revisar os conceitos das Leis de Newton.";
    } else {
        message += "📖 É importante estudar mais sobre as Leis de Newton.";
    }
    
    // Mensagem de parabéns adicional baseada no desempenho
    if (correctAnswers > 0) {
        message += `\n\n🎉 Parabéns por acertar ${correctAnswers} ${correctAnswers === 1 ? 'questão' : 'questões'}!`;
    }
    
    alert(message);
}

// Adiciona botão para ver resultado final
function addFinalResultButton() {
    const navigation = document.querySelector('.navigation');
    if (navigation && !document.getElementById('final-result-btn')) {
        const resultButton = document.createElement('li');
        resultButton.innerHTML = '<a href="#" id="final-result-btn">Ver Resultado Final</a>';
        navigation.insertBefore(resultButton, navigation.firstChild);
        
        document.getElementById('final-result-btn').addEventListener('click', function(e) {
            e.preventDefault();
            showFinalResult();
        });
    }
}

// Inicializa a funcionalidade quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    addFinalResultButton();
    updateScoreDisplay();
});