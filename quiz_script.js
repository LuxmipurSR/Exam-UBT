// Selecting all required elements
const Reading_start_btn = document.querySelector(".Reading_start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// If startQuiz button clicked
Reading_start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // Show info box
}

// If exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // Hide info box
}

// If continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    showQuestions(0); // Calling showQuestions function
    queCounter(1); // Passing 1 parameter to queCounter
    startTimer(15); // Calling startTimer function
    startTimerLine(0); // Calling startTimerLine function
}

// If restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    result_box.classList.remove("activeResult"); // Hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); // Calling showQuestions function
    queCounter(que_numb); // Passing que_numb value to queCounter
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    startTimer(timeValue); // Calling startTimer function
    startTimerLine(widthValue); // Calling startTimerLine function
    timeText.textContent = "Time Left"; // Change the text of timeText to Time Left
    next_btn.classList.remove("show"); // Hide the next button
}

// If quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); // Reload the current window
}

// If Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ // If question count is less than total question length
        que_count++; // Increment the que_count value
        que_numb++; // Increment the que_numb value
        showQuestions(que_count); // Calling showQuestions function
        queCounter(que_numb); // Passing que_numb value to queCounter
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        startTimer(timeValue); // Calling startTimer function
        startTimerLine(widthValue); // Calling startTimerLine function
        timeText.textContent = "Time Left"; // Change the timeText to Time Left
        next_btn.classList.remove("show"); // Hide the next button
    } else {
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        showResult(); // Calling showResult function
    }
}

// Getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");

    // Creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    let picture_tag = '<img src="' + questions[index].picture + '" alt="Question Picture">';
    que_text.innerHTML = que_tag + picture_tag; // Adding new span tag inside que_tag
    option_list.innerHTML = option_tag; // Adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // Set onclick attribute to all available options
    for(let i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// Creating the new div tags for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// If user clicked on option
// If user clicked on an option
// If user clicked on an option
// If user clicked on an option
function optionSelected(answer){
    // Clear timers
    clearInterval(counter);
    clearInterval(counterLine);

    // Get user's selected option and correct answer
    let userAns = answer.textContent.trim();
    let correctAns = questions[que_count].answer.trim();
    const allOptions = option_list.children.length;

    // Check if the selected option is correct
    if(userAns === correctAns){
        userScore++; // Increase score if correct
        answer.classList.add("correct"); // Add style for correct answer
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Add tick icon for correct answer
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); // Add style for incorrect answer
        answer.insertAdjacentHTML("beforeend", crossIconTag); // Add cross icon for incorrect answer
        console.log("Wrong Answer");

        // Highlight correct answer
        for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent.trim() === correctAns){
                option_list.children[i].classList.add("correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }

    // Disable all options after selection
    for(let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }

    // Show the next button after selecting an option
    next_btn.classList.add("show");

    // Add English translation next to Korean for all options
    for (let i = 0; i < allOptions; i++) {
        const optionText = option_list.children[i].textContent.trim();
        const engTranslation = questions[que_count].options[i].trim();
        option_list.children[i].insertAdjacentHTML("beforeend", '<span class="eng_translation" style="display: none;">' + engTranslation + '</span>');
    }
}

// Show result after completing the quiz
function showResult(){
    // Hide info and quiz box, show result box
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    // Display score
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = "";
    if (userScore > 3) {
        scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    } else if(userScore > 1) {
        scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    } else {
        scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    }
    scoreText.innerHTML = scoreTag;

    // Add English translation for all answers after showing the result
    const options = option_list.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        const engTranslation = questions[que_count].options[i].trim();
        options[i].insertAdjacentHTML("beforeend", '<span class="eng_translation">' + engTranslation + '</span>');
    }
}
