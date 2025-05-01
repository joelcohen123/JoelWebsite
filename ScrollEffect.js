window.addEventListener("load", function () {
    const skillIcons = document.querySelectorAll(".skills-grid img");
    const timelineItems = document.querySelectorAll(".timeline-item");

    function createObserver(elements, delay = 150) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let elementIndex = [...elements].indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, elementIndex * delay);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    }

    createObserver(skillIcons, 100);
    createObserver(timelineItems, 300);
});
