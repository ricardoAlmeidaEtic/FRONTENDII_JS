document.addEventListener("DOMContentLoaded", () => {
    const helloText = document.getElementById("hello");
    const button = document.getElementById("magicButton");

    gsap.from(helloText, { opacity: 0, y: -50, duration: 1, ease: "bounce.out" });

    button.addEventListener("click", () => {
        gsap.to(helloText, { rotation: 360, scale: 1.5, duration: 1, ease: "power2.inOut", yoyo: true, repeat: 1 });
        helloText.textContent = "🚀 Let's Build Something Amazing!";
    });

    // Smooth scrolling for nav links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute("href"));
            section.scrollIntoView({ behavior: "smooth" });
        });
    });
});

const user = {
    name:"",
    email:"",
    age: 0,
    messages: [
        {
            id: 0,
            message: "",
            date: "",
            likes: 0,
        }
    ],
}

const group = {
    id: 0,
    name: "",
    users: [],
    messages: [
        {  
            id: 0,
            user: "",
            message: "",
            date: "",
            likes: 0,
            level: 0,
        }
    ],
}

const outerGroups = {
    id: 0,
    name: "",
    groups: [],
}

const friends = {
    id: 0,
    friendOne:0,
    friendTwo:0,
}
