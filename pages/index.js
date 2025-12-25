import { useState } from 'react';
import styles from '../styles/Quiz.module.css';

const questions = [
  {
    question: "Em que data se comemora o Natal?",
    options: ["24 de dezembro", "25 de dezembro", "31 de dezembro"],
    correct: 1
  },
  {
    question: "Qual é a cor tradicional do Natal?",
    options: ["Azul e prata", "Vermelho e verde", "Roxo e dourado"],
    correct: 1
  },
  {
    question: "Quem traz os presentes no Natal?",
    options: ["Coelhinho da Páscoa", "Papai Noel", "Fada do dente"],
    correct: 1
  },
  {
    question: "Onde o Papai Noel mora?",
    options: ["Polo Norte", "Polo Sul", "Brasil"],
    correct: 0
  },
  {
    question: "O que as pessoas costumam montar no Natal?",
    options: ["Barraca de camping", "Árvore de Natal", "Castelo de areia"],
    correct: 1
  },
  {
    question: "Qual animal puxa o trenó do Papai Noel?",
    options: ["Cavalos", "Renas", "Cachorros"],
    correct: 1
  },
  {
    question: "O que se canta no Natal?",
    options: ["Marchinhas de carnaval", "Cantigas de roda", "Canções natalinas"],
    correct: 2
  },
  {
    question: "Qual é a comida típica do Natal no Brasil?",
    options: ["Pizza", "Chester ou Peru", "Feijoada"],
    correct: 1
  }
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleAnswerClick = (index) => {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.quiz}>
        <h1 className={styles.title}>🎄 Quiz de Natal 🎅</h1>

        {showScore ? (
          <div className={styles.scoreSection}>
            <h2>Você acertou {score} de {questions.length} perguntas!</h2>
            <p className={styles.scoreMessage}>
              {score === questions.length && "🎉 Perfeito! Você é expert em Natal!"}
              {score >= 6 && score < questions.length && "🎊 Muito bem! Você conhece bastante sobre o Natal!"}
              {score >= 4 && score < 6 && "👍 Bom trabalho! Continue aprendendo!"}
              {score < 4 && "🎁 Continue tentando! O espírito natalino está em você!"}
            </p>
            <button className={styles.restartButton} onClick={restartQuiz}>
              Jogar Novamente
            </button>
          </div>
        ) : (
          <>
            <div className={styles.questionSection}>
              <div className={styles.questionCount}>
                <span>Pergunta {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className={styles.questionText}>
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className={styles.answerSection}>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`${styles.answerButton} ${
                    answered
                      ? index === questions[currentQuestion].correct
                        ? styles.correct
                        : index === selectedAnswer
                        ? styles.incorrect
                        : ''
                      : ''
                  }`}
                  disabled={answered}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
