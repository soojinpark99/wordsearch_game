const form = document.getElementById("maker-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = "/game.html";
});

// input 자동완성 해제
document.querySelectorAll("input").forEach(function (input) {
  input.setAttribute("autocomplete", "off");
});

async function handleSubmitForm(event) {
  event.preventDefault();

  // formdata가 서버에 업로드되는 로직 구현하기
}

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

form.addEventListener("submit", handleSubmitForm);
