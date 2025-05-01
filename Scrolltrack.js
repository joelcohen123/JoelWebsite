document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const navItems = document.querySelectorAll(".nav-item");

    function setActiveNavItem(id) {
        navItems.forEach(nav => {
            nav.classList.remove("active");
            if (nav.getAttribute("href") === `#${id}`) {
                nav.classList.add("active");
            }
        });
    }

    function checkSectionInView() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveNavItem(section.id);
            }
        });
    }

    // Check sections on scroll and resize
    window.addEventListener("scroll", checkSectionInView);
    window.addEventListener("resize", checkSectionInView);

    // Initial check
    checkSectionInView();
});
