/* =================================================================
   1. [PC 전용] 스티커 아이템 인터랙션 (보내주신 최신 코드 반영)
   ================================================================= */
(function () {
    // PC용 아이템만 선택 (.sticker-item)
    const items = Array.from(document.querySelectorAll(".sticker-item"));
  
    items.forEach((item) => {
      const img = item.querySelector(".sticker-img");
      const desc = item.querySelector(".desc-box");
  
      // 이미지 경로 저장
      const baseSrc = img.getAttribute("data-base") || img.src;
      const lineSrc = img.getAttribute("data-line");
  
      // aria 초기값
      if (desc) desc.setAttribute("aria-hidden", "true");
  
      // FUNCTIONS ----------------
      function activate(el) {
        el.classList.add("active");
        const d = el.querySelector(".desc-box");
        if (d) d.setAttribute("aria-hidden", "false");
      }
    
      function deactivate(el) {
        el.classList.remove("active");
        const d = el.querySelector(".desc-box");
        if (d) d.setAttribute("aria-hidden", "true");
      }
    
      function toggle(el) {
        if (el.classList.contains("active")) deactivate(el);
        else {
          closeAllExcept(el);
          activate(el);
        }
      }
    
      function closeAll() {
        items.forEach((i) => {
          deactivate(i);
          const iImg = i.querySelector(".sticker-img");
          const iBase = iImg.getAttribute("data-base") || iImg.src;
          iImg.src = iBase;
        });
      }
    
      function closeAllExcept(exceptEl) {
        items.forEach((i) => {
          if (i !== exceptEl) {
            deactivate(i);
            const iImg = i.querySelector(".sticker-img");
            const iBase = iImg.getAttribute("data-base") || iImg.src;
            iImg.src = iBase;
          }
        });
      }

      // EVENT LISTENERS ----------

      // mouse enter
      item.addEventListener("mouseenter", () => {
        if (lineSrc) img.src = lineSrc;
        activate(item);
      });
  
      // mouse leave
      item.addEventListener("mouseleave", () => {
        img.src = baseSrc;
        deactivate(item);
      });
  
      // focus in/out (키보드)
      item.addEventListener("focusin", () => {
        if (lineSrc) img.src = lineSrc;
        activate(item);
      });
  
      item.addEventListener("focusout", () => {
        img.src = baseSrc;
        deactivate(item);
      });
  
      // keyboard toggle
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle(item);
          img.src = item.classList.contains("active") ? lineSrc : baseSrc;
        } else if (e.key === "Escape") {
          img.src = baseSrc;
          deactivate(item);
        }
      });
  
      // mobile touch (PC구조를 터치로 볼 때 대비)
      let touched = false;
      item.addEventListener(
        "touchend",
        (e) => {
          // 모바일 화면에서는 이 로직보다 아래의 '스크롤 애니메이션'이 우선이지만
          // 혹시 태블릿 등에서 PC버전으로 볼 때를 위해 남겨둡니다.
          if(window.innerWidth <= 1024) return; // 모바일이면 실행 안함

          if (!touched) {
            touched = true;
            setTimeout(() => (touched = false), 300);
  
            closeAllExcept(item);
            toggle(item);
            img.src = item.classList.contains("active") ? lineSrc : baseSrc;
          }
          e.preventDefault();
        },
        { passive: false }
      );
    });
  
    // 바깥 클릭 → 모두 닫기
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".sticker-item")) {
        // closeAll() 함수는 위 스코프에 있으므로 여기서 직접 구현
        items.forEach((i) => {
            i.classList.remove("active");
            const iImg = i.querySelector(".sticker-img");
            const iBase = iImg.getAttribute("data-base") || iImg.src;
            iImg.src = iBase;
        });
      }
    });
  })();
  
/* =================================================================
   2. [PC 전용] UP 버튼 & Footer 겹침 방지
   ================================================================= */
const upButton = document.getElementById("to-top");
const footer = document.querySelector("footer");

if (upButton) {
    upButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    window.addEventListener("scroll", () => {
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
   3. [PC 전용] BACK 버튼
   ================================================================= */
const backBtn = document.getElementById("to-back");

if (backBtn) {
    backBtn.addEventListener("click", () => {
        history.back();
    });
}

/* =================================================================
   4. [모바일 전용] 스크롤 시 아이템 페이드인 효과
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
            threshold: 0.1
        });

        mobileItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        mobileItems.forEach(item => item.classList.add("active"));
    }
});