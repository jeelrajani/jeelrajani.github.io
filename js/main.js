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
        speed: 900,
        effect: "creative",

        creativeEffect: {
            perspective: true,
            limitProgress: 2,
            prev: {
                translate: [0, "-100%", -300],
                rotate: [90, 0, 0],
                opacity: 0.4,
            },
            next: {
                translate: [0, "100%", -300],
                rotate: [-90, 0, 0],
                opacity: 0.4,
            },
        },

        mousewheel: {
            sensitivity: 0.8,
            forceToAxis: true,
            releaseOnEdges: true,
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
    const stickyChat = document.getElementById("stickyChat");

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

        // ABOUT
        if (active.classList.contains("about-slide")) {

            active.querySelectorAll(".animate").forEach((el, i) => {
                el.classList.remove("show");
                setTimeout(() => el.classList.add("show"), i * 120);
            });
            const bars = active.querySelector(".skill-bars");
            bars?.classList.add("show");
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

        // STICKY CHAT BUTTON
        const activeSlide = swiper.slides[swiper.activeIndex];
        // Hide on Home slide
        if (swiper.activeIndex === 0) {
            stickyChat.classList.remove("show");
            return;
        }
        // Hide on Contact slide
        if (activeSlide.classList.contains("contact-modern")) {
            stickyChat.classList.remove("show");
            return;
        }
        // Show everywhere else
        stickyChat.classList.add("show");
    });

    swiper.on("slideChange", () => {
        document
            .querySelectorAll(".about-slide .skill-bars")
            .forEach(b => b.classList.remove("show"));
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


/* =======================
   CUSTOM CURSOR
======================= */
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

/* Scale cursor on hover */
document.querySelectorAll("a, button, .clickable").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
    });
    el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
    });
});


/* =======================
   PROFILE IMAGE PARALLAX
======================= */
document.querySelectorAll(".profile-wrap").forEach(el => {
    el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    });

    el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0,0)";
    });
});
