const questions = [
    {
        question: "What is the result of typeof null?",
        options: ["object", "null", "undefined", "number"],
        correctAnswer: 0,
        score: 10
    },
    {
        question: "Which of the following is not a valid JavaScript variable name?",
        options: ["_myVariable", "123variable", "$myVariable", "myVariable123"],
        correctAnswer: 1,
        score: 10
    },
    {
        question: "How do you declare a function in JavaScript?",
        options: ["function myFunction() {}", "var myFunction = function() {}", "const myFunction = () => {}", " All of the above"],
        correctAnswer: 3,
        score: 10
    },
    {
        question: `What will be logged to the console with the following code: console.log(2 + "2" + 2)?`,
        options: ["222", "4", "'4'", "NaN"],
        correctAnswer: 0,
        score: 10
    },
    {
        question: `What is the result of 3 === "3"?`,
        options: ["true", "false", "undefined", "NaN"],
        correctAnswer: 1,
        score: 10
    },
    {
        question: "Which method is used to add a new element to the end of an array in JavaScript?",
        options: ["push()", "add()", "append()", "concat()"],
        correctAnswer: 0,
        score: 10
    },
    {
        question: "What does the Array.map() method do in JavaScript?",
        options: ["Adds a new element to an array", "Removes elements from an array", "Applies a function to each element of an array and returns a new array", "Checks if all elements in an array pass a test"],
        correctAnswer: 2,
        score: 10
    },
    {
        question: "Which keyword is used to declare a constant variable in JavaScript?",
        options: ["var", "let", "const", "final"],
        correctAnswer: 2,
        score: 10
    },
    {
        question: "What will be the output of console.log(typeof NaN)?",
        options: ["number", "NaN", "undefined", "string"],
        correctAnswer: 0,
        score: 10
    },
    {
        question: "What does the setTimeout() function do in JavaScript?",
        options: ["Pauses the execution of code for a specified amount of time", "Executes a function after a specified amount of time", "Returns the current date and time", "Creates a new thread to run a function asynchronously"],
        correctAnswer: 1,
        score: 10
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;

    // Reset radio buttons for new question
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // Clear previous options

    q.options.forEach((option, index) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "option";
        radio.value = index;
        radio.addEventListener("change", () => {
            document.getElementById("submit-btn").disabled = false;
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement("br"));
    });

    document.getElementById("submit-btn").disabled = true;
    document.getElementById("next-btn").style.display = "none";
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option");
        return;
    }

    const answer = parseInt(selectedOption.value);
    const q = questions[currentQuestion];

    if (answer === q.correctAnswer) {
        score += q.score;
        document.getElementById("result").textContent = "Correct!";
    } else {
        document.getElementById("result").textContent = "Incorrect";
    }

    document.getElementById("score").textContent = score;
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("next-btn").style.display = "block";

    // Disable all radio buttons after submitting
    const radioButtons = document.querySelectorAll('input[name="option"]');
    radioButtons.forEach(button => {
        button.disabled = true;
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById("result").textContent = "";
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question").textContent = "Quiz Completed";
    document.getElementById("result").textContent = `Final Score: ${score}`;

    const correctAnswers = questions.map(q => q.options[q.correctAnswer]);
    alert(`Correct Answers:\n${correctAnswers.join("\n")}`);

    // Reset quiz for restart
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

// Initial load
loadQuestion();
