//랜덤 번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호 < 유저번호 Down!!!
// 랜덤번호 > 유저번호 Up!!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disabled)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다. 
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다. 


let computerNum = 0;
let playButton = document.getElementById('play-button'); // 'Go' 버튼
let userInput = document.getElementById('user-input'); // 사용자 입력 부분
let resultArea = document.getElementById('result-area'); // 결과창
let resetButton = document.getElementById('reset-button'); // 초기화 버튼
let chancesArea = document.getElementById('chances-area'); //남은 기회
let chances = 5; // 남은 기회 5번 셋팅
let gameOver = false; // 5번의 기회 소진 시 boolean 'false'값으로 셋팅
let guessedNumbers = []; // 이미 입력한 숫자

//console.log(playButton);

playButton.addEventListener('click',play); //함수가 매개변수로 들어가려면 play() x => play
resetButton.addEventListener('click',reset); // 'Reset' 버튼 클릭 시 기존 '사용자 입력' 창 내용 초기화

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1; //0~99에서 1~100이 되는 마법 
    console.log("정답", computerNum);
}

function play(){
    if (gameOver) {
        return;
    }

    let userValue = parseInt(userInput.value); //텍스트 값(String)으로 입력되기보다는 차라리 처음부터 숫자로 셋팅(parseInt) 메서드 사용
    console.log(userValue);

    if (isNaN(userValue) || userValue < 1 || userValue > 100) {
        resultArea.textContent = '1과 100 사이의 숫자를 입력하세요!';
        return;
    }

    if (guessedNumbers.includes(userValue)) { 
        resultArea.textContent = '이미 입력한 숫자입니다!';
        return;
    }
    
    guessedNumbers.push(userValue);

    if (userValue < computerNum) {
        console.log('Up!!')
        resultArea.textContent = 'Up!!';
    } else if (userValue > computerNum) {
        console.log('Down!!')
        resultArea.textContent = 'Down!!';
    } else {
        resultArea.textContent = '맞추셨습니다!!';
        gameOver = true;
        playButton.disabled = true; // 게임이 끝나면 버튼을 비활성화
    }

    chances--;
    chancesArea.textContent = `남은 기회: ${chances}`;
    if (chances === 0 && !gameOver) {
        gameOver = true;
        resultArea.textContent = `게임 오버! 정답은 ${computerNum}였습니다`;
        playButton.disabled = true;
    }
}
function reset(){ 
    userInput.value = ''; // user input 창이 깨끗하게 정리되고 : 초기화
    resultArea.textContent = '';
    chances = 5;
    guessedNumbers = [];
    gameOver = false;
    playButton.disabled = false; // 버튼 다시 활성화
    chancesArea.textContent = `남은 기회: ${chances}`;
    pickRandomNum();
}
pickRandomNum();