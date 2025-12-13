/* =================================================================
   1. [PC 전용] 스티커 아이템 호버 & 키보드 접근성 (보내주신 코드)
   ================================================================= */
(function () {
    const items = document.querySelectorAll(".sticker-item");
  
    items.forEach((item) => {
      const img = item.querySelector(".sticker-img");
      // 에러 방지: 이미지가 없으면 실행 안 함
      if (!img) return;

      const baseSrc = img.getAttribute("src"); // 기본 이미지 (상대 경로 유지)
      const lineSrc = img.dataset.line; // _line 이미지
  
      // hover
      item.addEventListener("mouseenter", () => {
        if (lineSrc) img.src = lineSrc;
        item.classList.add("active");
      });
  
      item.addEventListener("mouseleave", () => {
        img.src = baseSrc;
        item.classList.remove("active");
      });
  
      // keyboard 접근성
      item.setAttribute("tabindex", "0");
  
      item.addEventListener("focusin", () => {
        if (lineSrc) img.src = lineSrc;
        item.classList.add("active");
      });
  
      item.addEventListener("focusout", () => {
        img.src = baseSrc;
        item.classList.remove("active");
      });
    });
  })();
  
/* =================================================================
   2. [PC 전용] UP 버튼 & Footer 겹침 방지 (보내주신 코드)
   ================================================================= */
const upButton = document.getElementById("to-top");
const footer = document.querySelector("footer");

if (upButton) {
    // 클릭 시 맨 위로
    upButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // 스크롤 시 푸터 겹침 방지
    window.addEventListener("scroll", () => {
        // 모바일 화면(1024px 이하)이거나 푸터가 없으면 실행 안 함 (충돌 방지)
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
   3. [PC 전용] BACK 버튼 (보내주신 코드)
   ================================================================= */
const backBtn = document.getElementById("to-back");
  
if (backBtn) {
    backBtn.addEventListener("click", () => {
        history.back();
    });
}

/* =================================================================
   4. [모바일 전용] 스크롤 시 아이템 페이드인 효과 (추가된 기능)
   ================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // 모바일용 아이템(.sticker-item-m)만 선택
    const mobileItems = document.querySelectorAll(".sticker-item-m");
    
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
        // 구형 브라우저 호환성
        mobileItems.forEach(item => item.classList.add("active"));
    }
});