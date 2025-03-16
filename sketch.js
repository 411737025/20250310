let radio;
let submitButton;
let resultP;
let questionP;
let input;
let questions;
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  // 使用 loadTable 讀取 CSV 檔案
  questions = loadTable("questions.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(153, 20, 73);

  // 題目
  questionP = createP('');
  questionP.position(windowWidth / 2 - 150, windowHeight / 2 - 150);

  // 選項
  radio = createRadio();
  radio.position(windowWidth / 2 - 150, windowHeight / 2 - 100);

  // 填充題輸入框
  input = createInput();
  input.position(windowWidth / 2 - 150, windowHeight / 2 - 100);
  input.hide();

  // 送出按鈕
  submitButton = createButton('送出');
  submitButton.position(windowWidth / 2 - submitButton.width / 2, windowHeight / 2 - 50);
  submitButton.mousePressed(checkAnswer);

  // 結果顯示
  resultP = createP('');
  resultP.position(windowWidth / 2 - 150, windowHeight / 2 + 100);

  // 顯示第一題
  showQuestion();
}

function draw() {
  background(220);
  textSize(20);
  text("答對題數:"+ correctCount, 10, 30);
  text("答錯題數:"+ incorrectCount, 10, 60);
  text("目前題數:"+ currentQuestionIndex, 10, 90);
  text("總題數:"+ questions.getRowCount(), 10, 120);
  text("411737025蔡秉翰", 10, 150);
}

function showQuestion() {
  if (currentQuestionIndex < questions.getRowCount()) {
    let q = questions.getRow(currentQuestionIndex);
    let type = q.getString("type");
    questionP.html(q.getString("question"));
    if (type === "choice") {
      radio.show();
      input.hide();
      radio.html('');
      radio.option(q.getString("optionA"));
      radio.option(q.getString("optionB"));
      radio.option(q.getString("optionC"));
      radio.option(q.getString("optionD"));
    } else if (type === "fill") {
      radio.hide();
      input.show();
      input.value('');
    }
  } else {
    // 顯示測驗結果
    questionP.html('測驗結束！');
    radio.hide();
    input.hide();
    submitButton.hide();
    resultP.html(`答對題數：${correctCount}，答錯題數：${incorrectCount}`);
  }
}

function checkAnswer() {
  let q = questions.getRow(currentQuestionIndex);
  let type = q.getString("type");
  let correctAnswer = q.getString("correct");
  let answer;
  if (type === "choice") {
    answer = radio.value();
  } else if (type === "fill") {
    answer = input.value();
  }
  if (answer === correctAnswer) {
    correctCount++;
    resultP.style('color', 'green');
    resultP.html('答對了！');
  } else {
    incorrectCount++;
    resultP.style('color', 'red');
    resultP.html('答錯了，請再試一次。');
  }
  currentQuestionIndex++;
  showQuestion();
}