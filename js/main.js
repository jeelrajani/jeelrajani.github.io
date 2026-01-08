let swiper;

/* =======================
   DOM READY
======================= */
document.addEventListener("DOMContentLoaded", () => {

    /* =======================
       INIT SWIPER
    ======================= */
    swiper = new Swiper(".swiper", {
        direction: "vertical",
        effect: "cube",
        speed: 800,

        cubeEffect: {
            shadow: false,
            slideShadows: false,
        },

        mousewheel: {
            sensitivity: 0.8,
            forceToAxis: true,
            releaseOnEdges: true,
            thresholdDelta: 20,
        },

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        allowTouchMove: false,
        simulateTouch: false,
        grabCursor: false,
    });

    /* =======================
       SIDEBAR ACTIVE LINK
    ======================= */
    swiper.on("slideChange", () => {
        document.querySelectorAll(".Links li")
            .forEach(li => li.classList.remove("activeLink"));

        document.querySelectorAll(".Links li")[swiper.activeIndex]
            ?.classList.add("activeLink");
    });

    /* =======================
       SLIDE ANIMATIONS
    ======================= */
    swiper.on("slideChangeTransitionEnd", () => {
        const active = document.querySelector(".swiper-slide-active");
        if (!active) return;

        // Generic animations
        active.querySelectorAll(".animate").forEach((el, i) => {
            el.classList.remove("show");
            setTimeout(() => el.classList.add("show"), i * 120);
        });

        // EXPERIENCE
        if (active.classList.contains("experience")) {
            const progress = active.querySelector(".timeline-progress");
            const timeline = active.querySelector(".timeline");
            if (progress && timeline) {
                progress.style.height = timeline.scrollHeight + "px";
            }
        }

        // EDUCATION
        if (active.classList.contains("education")) {
            const progress = active.querySelector(".edu-progress");
            const timeline = active.querySelector(".edu-timeline");
            if (progress && timeline) {
                progress.style.height = timeline.scrollHeight + "px";
            }
        }

        // SKILLS
        if (active.classList.contains("skills")) {
            active.querySelector(".skill-radar")?.classList.add("show");
            active.querySelectorAll(".skill-block").forEach((el, i) => {
                setTimeout(() => el.classList.add("show"), i * 120);
            });
        }

        // SERVICES
        if (active.classList.contains("services")) {
            active.querySelectorAll(".service-card").forEach((card, i) => {
                card.classList.remove("show");
                setTimeout(() => card.classList.add("show"), i * 120);
            });
        }

        // CONTACT
        if (active.classList.contains("contact-modern")) {
            active.querySelectorAll(".animate").forEach((el, i) => {
                el.classList.remove("show");
                setTimeout(() => el.classList.add("show"), i * 150);
            });
        }
    });

    /* =======================
       CV PULSE REMOVE
    ======================= */
    setTimeout(() => {
        document.querySelector(".cv-btn")?.classList.remove("pulse");
    }, 6000);

    /* =======================
       SIDEBAR TOGGLE
    ======================= */
    const toggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector("aside");

    toggle?.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    /* =======================
       TYPING EFFECT
    ======================= */
    const text = "Backend Developer";
    let index = 0;

    function startTyping() {
        const el = document.getElementById("typing-text");
        if (!el) return;

        el.textContent = "";
        el.classList.remove("cursor-hide");
        index = 0;

        function type() {
            if (index < text.length) {
                el.textContent += text.charAt(index++);
                setTimeout(type, 100);
            } else {
                el.classList.add("cursor-hide");
            }
        }
        type();
    }

    startTyping();

    swiper.on("slideChange", () => {
        if (swiper.activeIndex === 0) {
            startTyping();
        }
    });

});

/* =======================
   NAVIGATION FUNCTION
======================= */
function Navigate(indx) {
    document.querySelectorAll(".Links li")
        .forEach(li => li.classList.remove("activeLink"));

    document.querySelectorAll(".Links li")[indx]
        ?.classList.add("activeLink");

    swiper.slideTo(indx, 800, true);
}
