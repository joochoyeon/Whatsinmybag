/* =================================================================
   1. [PC 버전] 아이템 드래그 앤 드롭 기능 (새로 추가해 드렸습니다!)
   ================================================================= */
const draggables = document.querySelectorAll('.draggable');

draggables.forEach(item => {
    let isDragging = false;
    let shiftX, shiftY;

    // 마우스 눌렀을 때
    item.addEventListener('mousedown', function(event) {
        isDragging = true;

        // 클릭한 위치와 이미지 왼쪽 위 모서리 사이의 거리 계산
        shiftX = event.clientX - item.getBoundingClientRect().left;
        shiftY = event.clientY - item.getBoundingClientRect().top;

        // 드래그 중인 아이템을 맨 앞으로 가져오기 (z-index 높임)
        item.style.zIndex = 1000;
        item.style.cursor = 'grabbing'; // 커서 모양 변경
    });

    // 마우스 움직일 때 (문서 전체에서 감지)
    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        // 마우스 위치에 따라 이미지 이동
        item.style.left = (event.pageX - shiftX) + 'px';
        item.style.top = (event.pageY - shiftY) + 'px';
    });

    // 마우스 뗐을 때
    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            item.style.cursor = 'grab'; // 커서 모양 복구
            item.style.zIndex = ''; // 원래 z-index 순서로 (원하면 숫자 유지 가능)
        }
    });
});


/* =================================================================
   2. 버튼 클릭 효과 및 페이지 이동 (PC/모바일 통합)
   ================================================================= */

// PC용 버튼 (#welcomeBtn)과 모바일용 버튼 (.welcome-btn)을 모두 찾습니다.
const buttons = document.querySelectorAll('#welcomeBtn, .welcome-btn');

buttons.forEach(btn => {
    
    // 1) 누르는 순간 (마우스/터치)
    const pressAction = (e) => {
        // 모바일 버튼(링크)의 경우 바로 이동하는 것을 막음
        if(e.type === 'touchstart' || e.target.tagName === 'A') {
             // e.preventDefault(); // 필요 시 주석 해제 (링크 이동 막고 아래 JS로 이동)
        }
        btn.classList.add('pressed');
    };

    btn.addEventListener('mousedown', pressAction);
    btn.addEventListener('touchstart', pressAction, { passive: false });


    // 2) 떼는 순간 (페이지 이동)
    const releaseAction = (e) => {
        // 모바일의 경우 링크(href)가 있어서 충돌날 수 있으니 JS로 이동 처리
        e.preventDefault(); 

        setTimeout(() => {
            btn.classList.remove('pressed');
            // 이동할 페이지 주소 (여기를 원하는 파일명으로 바꾸세요)
            window.location.href = 'home.html'; 
        }, 150); // 0.15초 뒤 이동 (애니메이션 볼 시간 줌)
    };

    btn.addEventListener('mouseup', releaseAction);
    btn.addEventListener('touchend', releaseAction);
});


/* =================================================================
   3. [PC/모바일 통합] BACK 버튼 (수정됨)
   ================================================================= */
// PC용 버튼과 모바일용 버튼을 모두 찾습니다.
const backBtnPC = document.getElementById("to-back");
const backBtnMobile = document.querySelector(".header-back-btn");

// 공통 이동 함수: 무조건 home.html로 이동
function goHome(e) {
    e.preventDefault(); // 링크의 기본 동작(맨 위로 점프 등) 막기
    window.location.href = 'home.html'; // 명확하게 홈 파일로 이동
}

// PC 버튼이 있으면 기능 연결
if (backBtnPC) {
    backBtnPC.addEventListener("click", goHome);
}

// 모바일 버튼이 있으면 기능 연결
if (backBtnMobile) {
    backBtnMobile.addEventListener("click", goHome);
    // 모바일 터치 시 딜레이 없이 바로 이동하도록 설정
    backBtnMobile.addEventListener("touchstart", goHome, { passive: false });
}

/* =================================================================
   4. 뒤로가기 문제 해결 (캐시 방지)
   ================================================================= */
window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        console.log("뒤로가기 감지: 새로고침");
        location.reload();
    }
});