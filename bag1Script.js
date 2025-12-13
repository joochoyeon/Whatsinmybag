/* =================================================================
   1. [PC 전용] 스티커 아이템 호버 효과 (보내주신 코드 반영)
   ================================================================= */
(function () {
    // PC용 아이템(.sticker-item)만 선택
    const items = document.querySelectorAll(".sticker-item");
  
    items.forEach((item) => {
      const img = item.querySelector(".sticker-img");
      // 이미지나 데이터가 없으면 오류 방지를 위해 return
      if (!img) return; 

      const baseSrc = img.src; // 기본 이미지
      const lineSrc = img.dataset.line; // _line 이미지
  
      // 마우스 올렸을 때
      item.addEventListener("mouseenter", () => {
        if (lineSrc) img.src = lineSrc;
        item.classList.add("active");
      });
  
      // 마우스 뗐을 때
      item.addEventListener("mouseleave", () => {
        img.src = baseSrc;
        item.classList.remove("active");
      });
  
      // 키보드 접근성 (Tab키 이동)
      item.setAttribute("tabindex", "0");
  
      item.addEventListener("focus", () => {
        if (lineSrc) img.src = lineSrc;
        item.classList.add("active");
      });
  
      item.addEventListener("blur", () => {
        img.src = baseSrc;
        item.classList.remove("active");
      });
    });
  })();
  
  
/* =================================================================
   2. [PC 전용] UP 버튼 & Footer 겹침 방지 (보내주신 코드 수정)
   ================================================================= */
// HTML ID가 'to-top-pc'인지 'to-top'인지 확인 필요. 
// 안전하게 작동하도록 두 가지 경우를 다 고려해서 찾습니다.
const upButton = document.getElementById("to-top") || document.getElementById("to-top-pc");
const footer = document.querySelector("footer");

if (upButton) {
    // 클릭 시 맨 위로
    upButton.addEventListener("click", () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    });

    // 스크롤 시 푸터 겹침 방지 (PC화면에서만 작동하도록 조건 추가)
    window.addEventListener("scroll", () => {
        // 모바일 화면이거나 푸터가 없으면 실행 안 함
        if (window.innerWidth <= 1024 || !footer) return;

        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const overlap = windowHeight - footerRect.top;

        if (overlap > 0) {
        upButton.style.bottom = `${40 + overlap}px`;
        } else {
        upButton.style.bottom = "40px";
        }
    });
}


/* =================================================================
   3. [PC 전용] BACK 버튼 (보내주신 코드 반영)
   ================================================================= */
const backBtn = document.getElementById("to-back");
  
if (backBtn) {
    backBtn.addEventListener("click", () => {
        history.back();
    });
}


/* =================================================================
   4. [모바일 전용] 스크롤 시 아이템 페이드인 효과 (새로 추가된 기능)
   ================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    // 모바일용 아이템(.sticker-item-m)만 선택
    const mobileItems = document.querySelectorAll(".sticker-item-m");
    
    // Intersection Observer가 지원되는 브라우저인지 확인
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, {
            threshold: 0.1 // 10% 보이면 등장
        });

        mobileItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // 구형 브라우저면 그냥 다 보이게 처리
        mobileItems.forEach(item => item.classList.add("active"));
    }
});