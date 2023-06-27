"strict";
//getting all required elements
const input_btn = document.querySelector(".input_btn");
const enter_btn = document.querySelector(".enter_btn");
const pipes_cisterns = document.querySelector(".pipes_cisterns");
const probability = document.querySelector(".probability");
const problemsonages = document.querySelector(".problemsonages");
const profit_loss = document.querySelector(".profit_loss");
const question_page = document.querySelector(".question_page");
const Userdetails = document.querySelector(".Userdetails");
const option_list = document.querySelector(".option_list");
const timeCount = document.querySelector(".timer");
const resultPage = document.querySelector(".quiz_result");

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let userScore = 0;
let timeTaken = 0;
let attempted = 0;

let userName = "";
enter_btn.onclick = () => {
  userName = input_btn.value;
};

//if category button is click
pipes_cisterns.onclick = () => {
  question_page.classList.add("activequestion"); // show the question page
  Userdetails.classList.add("inactivedisplay"); // hide main page
  showQuestions(0);
  queCounter(1);
  startTimer(15);
};
probability.onclick = () => {
  question_page.classList.add("activequestion");
  Userdetails.classList.add("inactivedisplay");
};
problemsonages.onclick = () => {
  question_page.classList.add("activequestion");
  Userdetails.classList.add("inactivedisplay");
};
profit_loss.onclick = () => {
  question_page.classList.add("activequestion");
  Userdetails.classList.add("inactivedisplay");
};

const next_btn = document.querySelector(".next_btn");
const quiz_result = document.querySelector(".quiz_result");
const start_again = document.querySelector(".start_again");
const goto_home = document.querySelector(".goto_home");

start_again.onclick = () => {
  Userdetails.classList.add("inactivedisplay");
  quiz_result.classList.remove("activeresult");
  question_page.classList.add("activequestion");
  que_count = 0;
  que_numb = 1;
  counter;
  timeTaken = 0;
  timeValue = 15;
  userScore = 0;
  attempted = 0;
  setTextValue(".display_score", userScore);
  clearOption();
  showQuestions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  startTimer(timeValue);
  next_btn.style.display = "none";
};

goto_home.onclick = () => {
  window.location.reload();
};
// If next button is clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    clearOption();
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    next_btn.style.display = "none";
  } else {
    console.log("Questions completed");
    showResultBox();
  }
};
function clearOption() {
  let options = document.querySelectorAll(".option");
  for (let i = 0; i < 4; i++) {
    options[i].classList.remove("correct");
    options[i].classList.remove("incorrect");
    options[i].classList.remove("disabled");
  }
}
//getting questions and options from array
function showQuestions(index) {
  const que_text = document.querySelector(".question");

  let que_tag =
    "<span>" +
    questions[index].numb +
    "." +
    questions[index].question +
    "</span>";
  for (let i = 0; i < 4; i++) {
    option_list.children[i].innerHTML = questions[index].options[i];
  }
  // let option_tag = document.querySelector("");
  // '<button class="option"><span>' +
  // questions[index].options[0] +
  // "</span></button>" +
  // '<button class="option"><span>' +
  // questions[index].options[1] +
  // "</span><button>" +
  // '<button class="option"><span>' +
  // questions[index].options[2] +
  // "</span></button>" +
  // '<button class="option"><span>' +
  // questions[index].options[3] +
  // "</span></button>";
  que_text.innerHTML = que_tag;
  // option_list.innerHTML = option_tag;
  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
function optionSelected(answer) {
  clearInterval(counter);
  attempted += 1;
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;
  countTimeTaken(timeCount);

  if (userAns == correctAns) {
    userScore += 1;
    setTextValue(".display_score", userScore);
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is Correct");
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is Wrong");
    //if answer is incorrect then automatically select correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
      }
    }
  }

  //oncer user selected disabled all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function showResultBox() {
  question_page.classList.remove("activequestion"); // show the question page
  Userdetails.classList.add("inactivedisplay"); // hide main page
  quiz_result.classList.add("activeresult"); // show the quiz result page
  setTextValue(".user_name", userName);
  setTextValue(".result_time_value", timeTaken);
  const correct_scoreText = document.querySelector(".correct_result");
  let correct_scoreTag = "<span><p>Correct:" + userScore + "</p></span>";
  correct_scoreText.innerHTML = correct_scoreTag;
  const wrong_scoreText = document.querySelector(".wrong_result");
  let wrong_scoreTag = "<span><p>Wrong:" + (10 - userScore) + "</p></span>";
  wrong_scoreText.innerHTML = wrong_scoreTag;
  const percentage_scoreText = document.querySelector(".percentage");
  let percentage_scoreTag =
    "<span><p>Percentage:" + userScore * 10 + "%</p></span>";
  percentage_scoreText.innerHTML = percentage_scoreTag;
  setTextValue(".result_attempted", attempted);
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeTaken = timeTaken + 15;

      let correctAns = questions[que_count].answer;
      let allOptions = option_list.children.length;
      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].setAttribute("class", "option correct");
        }
      }
      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "block";
    }
  }
}

function queCounter(index) {
  const top_ques_counter = document.querySelector(".question_no");
  let question_noTag = "<p>" + index + "/10</p>";
  top_ques_counter.innerHTML = question_noTag;
}

function setTextValue(setClassAttribute, setValue) {
  const displayScore = document.querySelector(setClassAttribute);
  displayScore.textContent = setValue;
}

function countTimeTaken(timeCount) {
  timeLeftPerQuestion = timeCount.textContent;
  timeTaken = timeTaken + (15 - Number.parseInt(timeLeftPerQuestion));
}
