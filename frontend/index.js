const form = document.getElementById("maker-form");

// input 자동완성 해제
document.querySelectorAll("input").forEach(function (input) {
  input.setAttribute("autocomplete", "off");
});

// Enter 눌렀을 때 Submit 되는 걸 방지
document.addEventListener(
  "keydown",
  function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  },
  true
);

// title, description input 값 유효성 체크
function validateInput(event, input, err) {
  event.preventDefault();

  const inputField = document.querySelector(input);
  const errBox = document.querySelector(err);

  if (inputField.value.trim() == "") {
    errBox.style.display = "flex";
  } else {
    errBox.style.display = "none";
  }
}

// word list input 값 유효성 체크
function validateWordInput(event) {
  event.preventDefault();

  const wordInputs = document.querySelectorAll(".word-input");
  const wordErr = document.querySelector(".word.input-err");
  const engErr = document.querySelector(".eng.input-err");

  // 비어있는 word input field 및 영어가 아닌 값 확인
  let filledCount = 0;
  for (let i = 0; i < wordInputs.length; i++) {
    const inputValue = wordInputs[i].value.trim();

    if (inputValue !== "") {
      filledCount++;

      if (!/^[a-zA-Z]+$/.test(inputValue)) {
        engErr.style.display = "flex";
        return false; // 제출 차단
      } else {
        engErr.style.display = "none";
      }
    }
  }

  if (filledCount < 10) {
    wordErr.style.display = "flex";
  } else {
    wordErr.style.display = "none";
  }
}

form.addEventListener("submit", function (event) {
  validateInput(event, ".title-input", ".title.input-err");
  validateInput(event, ".description-input", ".description.input-err");
  validateWordInput(event);
});

// formdata가 서버에 업로드되는 로직 구현하기
