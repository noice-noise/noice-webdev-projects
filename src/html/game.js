console.log("Hello, world from game!");

const question = document.getElementById("question");
console.log(question);
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const progressBarFull = document.getElementById("progressBarFull");

console.log("Choices:");
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Who is the first servant of God in the Bible?",
    choice1: "Moses",
    choice2: "Abraham",
    choice3: "Isaiah",
    choice4: "Jesus Christ",
    answer: 1,
  },
  {
    question: "Who is the second servant of God in the Bible?",
    choice1: "Moses",
    choice2: "Abraham",
    choice3: "Isaiah",
    choice4: "Jesus Christ",
    answer: 1,
  },
  {
    question: "Who is the third servant of God in the Bible?",
    choice1: "Moses",
    choice2: "Abraham",
    choice3: "Isaiah",
    choice4: "Jesus Christ",
    answer: 1,
  },
  {
    question: "Who is the fourth servant of God in the Bible?",
    choice1: "Moses",
    choice2: "Abraham",
    choice3: "Isaiah",
    choice4: "Jesus Christ",
    answer: 1,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  //   console.log("available: ");
  //   console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS)
    return window.location.assign("end.html");

  //   console.log(availableQuestions.length);
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  //   console.log(questionIndex);
  currentQuestion = availableQuestions[questionIndex];
  //   console.log(currentQuestion);
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    // console.log(choice);
    // console.log("choice" + number);
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const isCorrect = selectedAnswer == currentQuestion.answer;

    const classToApply =
      selectedAnswer == isCorrect ? "bg-green-500" : "bg-red-500";

    if (isCorrect) {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
