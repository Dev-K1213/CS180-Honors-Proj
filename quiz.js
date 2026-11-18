//QUESTIONS
const QUIZ_QUESTIONS = [

    {
        question: "Which statement correctly describes primitive types in Java?",
        options: [
            "All Java variables are objects.",
            "int and double are primitive types, while String is a reference type.",
            "String and Integer are both primitive types.",
            "Java does not distinguish between primitive and reference types."
        ],
        answer: 1,
        explanation: "Java has primitive types such as int, double, and boolean. String and Integer are reference types."
    },

    {
        question: "What happens when a Java method receives an ArrayList and reassigns its parameter to a new ArrayList?",
        options: [
            "The original ArrayList is automatically replaced.",
            "The original ArrayList is deleted.",
            "Only the method's local reference changes.",
            "Java throws an error."
        ],
        answer: 2,
        explanation: "Java passes arguments by value. The method receives a copy of the reference, so reassigning it does not change the caller's reference."
    },

    {
        question: "Which operator should you use to compare the contents of two Java Strings?",
        options: [
            "==",
            "=",
            "!=",
            ".equals()"
        ],
        answer: 3,
        explanation: "String.equals() compares the contents of two strings. The == operator compares whether two references point to the same object."
    },

    {
        question: "What happens when you concatenate two Java Strings?",
        options: [
            "The original String is modified.",
            "A new String is created.",
            "The String becomes an ArrayList.",
            "Java automatically changes it into a char array."
        ],
        answer: 1,
        explanation: "Java Strings are immutable. Concatenation produces a new String rather than modifying the original."
    },

    {
        question: "What happens if you declare a variable inside an if block in Java and try to access it outside that block?",
        options: [
            "The variable becomes static.",
            "The variable automatically becomes public.",
            "The code will not compile because the variable is out of scope.",
            "The variable receives a default value."
        ],
        answer: 2,
        explanation: "Java uses block scope. A local variable declared inside an if block cannot be accessed outside that block."
    },

    {
        question: "Which statement about Java variable initialization is correct?",
        options: [
            "All local variables automatically receive a value of 0.",
            "All variables automatically receive null.",
            "Instance fields receive default values, but local variables must be initialized before use.",
            "Java never initializes variables automatically."
        ],
        answer: 2,
        explanation: "Java automatically initializes instance fields. Local variables do not receive default values and must be initialized before use."
    },

    {
        question: "Which Java type is best suited for storing a floating-point number with double precision?",
        options: [
            "int",
            "boolean",
            "char",
            "double"
        ],
        answer: 3,
        explanation: "double is Java's standard double-precision floating-point type. int stores whole numbers."
    },

    {
        question: "What is method overloading in Java?",
        options: [
            "Defining multiple methods with the same name but different parameter lists.",
            "Calling a method multiple times in a loop.",
            "Changing a method's return value while it runs.",
            "Using a method without declaring its parameters."
        ],
        answer: 0,
        explanation: "Method overloading allows multiple methods to share a name as long as their parameter lists differ."
    },

    {
        question: "Which statement about checked exceptions in Java is correct?",
        options: [
            "Every exception must be caught.",
            "Checked exceptions must be caught or declared with throws.",
            "Unchecked exceptions must always be declared with throws.",
            "Java does not support exception handling."
        ],
        answer: 1,
        explanation: "Checked exceptions must be caught or declared with throws. Unchecked exceptions do not have this requirement."
    },

    {
        question: "What is the difference between a static variable and an instance variable in Java?",
        options: [
            "Static variables belong to individual objects, while instance variables belong to the class.",
            "Both are always shared between every object.",
            "Static variables belong to the class, while instance variables belong to individual objects.",
            "Static variables can only store integers."
        ],
        answer: 2,
        explanation: "A static variable is shared at the class level. Each object has its own separate instance variables."
    }

];


// Keep track of the current question and score.
let currentQuestion = 0;
let score = 0;
let answered = false;


// Connect JavaScript to the HTML elements.
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");

const questionCount = document.getElementById("question-count");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

const nextButton = document.getElementById("next-button");

const quizContent = document.getElementById("quiz-content");
const resultsSection = document.getElementById("results");

const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");

const restartButton = document.getElementById("restart-button");


// Display the current question.
function displayQuestion() {

    answered = false;

    const question = QUIZ_QUESTIONS[currentQuestion];

    questionElement.textContent = question.question;

    questionCount.textContent =
        `Question ${currentQuestion + 1} of ${QUIZ_QUESTIONS.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${(currentQuestion / QUIZ_QUESTIONS.length) * 100}%`;

    // Clear the previous question's answer choices and feedback.
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";
    feedbackElement.className = "quiz-feedback";

    nextButton.disabled = true;

    // Create a button for each answer choice.
    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        optionsElement.appendChild(button);
    });

    // Change the button text on the final question.
    if (currentQuestion === QUIZ_QUESTIONS.length - 1) {
        nextButton.textContent = "See Results";
    } else {
        nextButton.textContent = "Next Question →";
    }
}


// Check whether the selected answer is correct.
function checkAnswer(selectedIndex) {

    // Prevent answering the same question multiple times.
    if (answered) {
        return;
    }

    answered = true;

    const question = QUIZ_QUESTIONS[currentQuestion];

    const optionButtons =
        document.querySelectorAll(".quiz-option");

    // Check whether the selected answer is correct.
    const correct = selectedIndex === question.answer;

    if (correct) {
        score++;

        feedbackElement.textContent =
            "Correct! " + question.explanation;

        feedbackElement.classList.add("correct");
    } else {
        feedbackElement.textContent =
            "Not quite. " + question.explanation;

        feedbackElement.classList.add("incorrect");
    }

    // Update the displayed score.
    scoreElement.textContent = `Score: ${score}`;

    // Disable all choices after an answer is selected.
    optionButtons.forEach((button, index) => {

        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct-answer");
        } else if (index === selectedIndex) {
            button.classList.add("wrong-answer");
        }

    });

    // Allow the user to continue.
    nextButton.disabled = false;
}


// Move to the next question or show final results.
function nextQuestion() {

    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < QUIZ_QUESTIONS.length) {
        displayQuestion();
    } else {
        showResults();
    }
}


// Display the final score.
function showResults() {

    quizContent.hidden = true;
    resultsSection.hidden = false;

    progressBar.style.width = "100%";

    finalScore.textContent =
        `You scored ${score} out of ${QUIZ_QUESTIONS.length}!`;

    const percentage =
        (score / QUIZ_QUESTIONS.length) * 100;

    if (percentage === 100) {
        finalMessage.textContent =
            "Perfect score! You've mastered these Python-to-Java concepts.";
    } else if (percentage >= 80) {
        finalMessage.textContent =
            "Great job! You have a strong understanding of the differences.";
    } else if (percentage >= 60) {
        finalMessage.textContent =
            "Good effort! Review a few traps and try again.";
    } else {
        finalMessage.textContent =
            "Keep practicing! The field guide can help you understand these concepts.";
    }

    questionCount.textContent = "Quiz completed";
    scoreElement.textContent = `Final Score: ${score}`;
}


// Restart the quiz from the beginning.
function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;

    resultsSection.hidden = true;
    quizContent.hidden = false;

    displayQuestion();
}


// Connect the buttons to their functions.
nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", restartQuiz);


// Start the quiz.
displayQuestion();
