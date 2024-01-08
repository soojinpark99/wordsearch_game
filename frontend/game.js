// ------ 게임 세팅 ------
const title = document.querySelector(".title");
title.innerText = "ANIMALS";
const description = document.querySelector(".description");
description.innerText = "General Animals";

// 단어 리스트
const wordList = ["DOG", "CAT", "FISH", "RABBIT", "BIRD"];
console.log(wordList);

// --- 알파벳을 채워넣는 함수 ---
function fillAlphabets() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const wordBlocks = document.querySelectorAll(".word-block");

  wordBlocks.forEach((block) => {
    // 만약 빈 칸이면 알파벳을 무작위로 선택하여 삽입
    if (!block.textContent.trim()) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      block.textContent = alphabet[randomIndex];
    }
  });
}

// --- 단어를 무작위로 배치하는 함수 ---
function placeRandomWord(word, board) {
  const wordBlocks = board.querySelectorAll(".word-block");
  const boardWidth = 12; // 가로 길이
  const maxAttempts = 100;

  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    const startIndex = Math.floor(Math.random() * wordBlocks.length);
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";

    if (tryPlaceWord(word, startIndex, direction, boardWidth, wordBlocks)) {
      return; // 단어가 성공적으로 배치되면 함수 종료
    }
  }

  console.log("최대 시도 횟수를 초과하여 배치에 실패했습니다.");
}

function tryPlaceWord(word, startIndex, direction, boardWidth, wordBlocks) {
  for (let i = 0; i < word.length; i++) {
    const index =
      direction === "horizontal" ? startIndex + i : startIndex + i * boardWidth;

    if (
      index >= wordBlocks.length ||
      (direction === "horizontal" && index % boardWidth === 0) ||
      wordBlocks[index].textContent.trim() !== ""
    ) {
      return false; // 실패 조건
    }

    wordBlocks[index].textContent = word[i];
  }

  return true; // 성공
}

// 무작위 단어를 삽입
wordList.forEach((word) =>
  placeRandomWord(word, document.querySelector(".word-block__board"))
);

// 알파벳을 채워넣음
fillAlphabets();

// ------ 게임 시작 ------

function gameStart() {
  const startBox = document.querySelector(".start-box");
  startBox.remove();

  // --- 타이머 기능 ---
  function startTimer() {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timer = document.querySelector(".timer");
      timer.innerText = `${분}:${초}`;
    }
    timeInterval = setInterval(setTime, 1000);
  }

  startTimer();

  // --- 드래그 이벤트 설정 ---
  const wordBlocks = document.querySelectorAll(".word-block");
  let isDragging = false;

  // 드래그 시작
  function handleDragStart(event) {
    isDragging = true;
    event.target.classList.add("selected");
  }

  // 드래그 중
  function handleDragOver(event) {
    if (isDragging) {
      event.preventDefault();
      event.target.classList.add("selected");
    }
  }

  // 드래그 종료
  function handleDragEnd() {
    isDragging = false;
    checkSelectedWord();
  }

  // --- 게임 종료 ---
  function gameOver() {
    clearInterval(timeInterval);

    const gameOverBox = document.querySelector(".game-over");
    const retryBtn = document.querySelector(".retry-btn");

    gameOverBox.style.display = "flex";

    retryBtn.addEventListener("click", () => {
      (location || window.location || document.location).reload();
    });
  }

  // --- 게임 종료 조건에 맞는지 확인 ---
  function checkGameEnd() {
    const wordListItems = document.querySelectorAll(".answer-word");
    const correctWordCount = Array.from(wordListItems).filter((item) =>
      item.style.textDecoration.includes("line-through")
    ).length;

    if (correctWordCount === wordList.length) {
      gameOver();
    }
  }

  // --- 선택된 단어 확인 ---
  function checkSelectedWord() {
    const selectedBlocks = document.querySelectorAll(".word-block.selected");
    const selectedWord = Array.from(selectedBlocks)
      .map((block) => block.textContent)
      .join("");

    // 정답 확인
    if (wordList.includes(selectedWord)) {
      // 정답인 경우 드래그를 유지하도록 처리
      selectedBlocks.forEach((block) => block.classList.add("correct"));

      const wordList = document.querySelector(".word-list");
      const wordListItems = wordList.querySelectorAll(".answer-word");

      wordListItems.forEach((wordItem) => {
        if (wordItem.textContent === selectedWord) {
          wordItem.style.textDecoration = "line-through";
        }
      });

      checkGameEnd();
    } else {
      // 정답이 아닌 경우 선택 해제
      selectedBlocks.forEach((block) => block.classList.remove("selected"));
    }

    // 선택 해제
    selectedBlocks.forEach((block) => block.classList.remove("selected"));
  }

  // 이벤트 리스너 등록
  wordBlocks.forEach((block) => {
    block.addEventListener("mousedown", handleDragStart);
    block.addEventListener("mouseenter", handleDragOver);
    block.addEventListener("mouseup", handleDragEnd);
  });
}

const startBtn = document.querySelector(".start-btn");

function mouseOver(event) {
  startBtn.style.textDecoration = "underline";
}

function mouseOut(event) {
  startBtn.style.textDecoration = "none";
}

startBtn.addEventListener("mouseover", mouseOver);
startBtn.addEventListener("mouseout", mouseOut);
startBtn.addEventListener("click", gameStart);
