// ========================================
// PROJECT WORLD
// COMPLETE JAVASCRIPT
// ========================================


// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.getElementById("contactForm");
const message = document.getElementById("message");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton =
            contactForm.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        if (message) {
            message.textContent = "Sending your enquiry...";
            message.classList.add("show");
        }

        try {
            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            if (response.ok) {
                if (message) {
                    message.textContent =
                        "✅ Thank you! Your enquiry has been sent successfully.";
                    message.classList.add("show");
                }

                contactForm.reset();
            } else {
                if (message) {
                    message.textContent =
                        "❌ Something went wrong. Please try again.";
                    message.classList.add("show");
                }
            }
        } catch (error) {
            console.error(error);

            if (message) {
                message.textContent =
                    "❌ Connection problem. Please try again.";
                message.classList.add("show");
            }
        }

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Send Enquiry";
        }
    });
}


// ========================================
// SMOOTH NAVIGATION
// ========================================

document
    .querySelectorAll('nav a[href^="#"]')
    .forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


// ========================================
// ACTIVE NAVIGATION
// ========================================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll('nav a[href^="#"]');

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection =
                section.getAttribute("id");
        }
    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("active");
        }
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);

updateActiveNavigation();


// ========================================
// PROJECT DATA
// ========================================

const projects = {

    "AI & Machine Learning": [

        {
            name: "Student Performance Prediction",
            description:
                "Predict student performance using machine learning.",
            difficulty: "Intermediate",
            price: 999,
            icon: "🤖"
        },

        {
            name: "AI Student Chatbot",
            description:
                "An intelligent chatbot designed for student assistance.",
            difficulty: "Advanced",
            price: 1499,
            icon: "💬"
        },

        {
            name: "Face Recognition System",
            description:
                "A computer vision project using face recognition.",
            difficulty: "Advanced",
            price: 1499,
            icon: "👤"
        }
    ],

    "Web Development": [

        {
            name: "Smart Student Learning Platform",
            description:
                "Interactive educational platform for students.",
            difficulty: "Intermediate",
            price: 999,
            icon: "🌐"
        },

        {
            name: "Student Management Portal",
            description:
                "Web portal for managing student information.",
            difficulty: "Intermediate",
            price: 999,
            icon: "🎓"
        },

        {
            name: "College Event Website",
            description:
                "Modern website for college events and activities.",
            difficulty: "Easy",
            price: 499,
            icon: "🏫"
        }
    ],

    "App Development": [

        {
            name: "Student Attendance App",
            description:
                "Mobile application for student attendance management.",
            difficulty: "Intermediate",
            price: 999,
            icon: "📱"
        },

        {
            name: "Study Planner App",
            description:
                "Application for organizing student study schedules.",
            difficulty: "Easy",
            price: 699,
            icon: "📚"
        }
    ],

    "Cyber Security": [

        {
            name: "Spam Detection System",
            description:
                "Detect unwanted and suspicious messages.",
            difficulty: "Intermediate",
            price: 999,
            icon: "🛡️"
        },

        {
            name: "Secure Login System",
            description:
                "A project demonstrating secure authentication.",
            difficulty: "Advanced",
            price: 1499,
            icon: "🔐"
        }
    ],

    "Gaming": [

        {
            name: "Educational Quiz Game",
            description:
                "Interactive quiz game designed for students.",
            difficulty: "Easy",
            price: 499,
            icon: "🎮"
        },

        {
            name: "Student Adventure Game",
            description:
                "Interactive educational adventure game.",
            difficulty: "Advanced",
            price: 1499,
            icon: "🕹️"
        }
    ],

    "Data Science": [

        {
            name: "Student Data Analysis",
            description:
                "Analyze student data and generate useful insights.",
            difficulty: "Intermediate",
            price: 999,
            icon: "📊"
        },

        {
            name: "Performance Dashboard",
            description:
                "Visual dashboard for analyzing student performance.",
            difficulty: "Advanced",
            price: 1500,
            icon: "📈"
        }
    ],

    "IoT": [

        {
            name: "Smart Monitoring System",
            description:
                "Monitor connected devices using IoT technology.",
            difficulty: "Intermediate",
            price: 1000,
            icon: "💡"
        },

        {
            name: "Smart Environment Monitor",
            description:
                "Monitor environmental conditions using IoT sensors.",
            difficulty: "Advanced",
            price: 1499,
            icon: "🌱"
        }
    ]
};


// ========================================
// ELEMENTS
// ========================================

const projectList =
    document.getElementById("project-list");

const selectedProjectBox =
    document.getElementById("selected-project");

const selectedProjectName =
    document.getElementById("selected-project-name");

const selectedProjectDomain =
    document.getElementById("selected-project-domain");

const selectedProjectPrice =
    document.getElementById("selected-project-price");

const customerOrderSection =
    document.getElementById("customer-order-section");

const paymentSection =
    document.getElementById("payment-section");

const paymentProofSection =
    document.getElementById("payment-proof-section");

const orderConfirmationSection =
    document.getElementById("order-confirmation-section");


// ========================================
// SHOW PROJECTS
// ========================================

function showProjects(domain) {

    if (!projectList) {
        console.error("Project list not found.");
        return;
    }

    const domainProjects =
        projects[domain] || [];

    projectList.innerHTML = "";

    domainProjects.forEach(function (project) {

        let difficultyClass =
            "difficulty-medium";

        if (project.difficulty === "Easy") {
            difficultyClass =
                "difficulty-easy";
        }

        if (project.difficulty === "Advanced") {
            difficultyClass =
                "difficulty-advanced";
        }

        const card =
            document.createElement("div");

        card.className =
            "project-option";

        card.innerHTML = `
            <div class="project-option-icon">
                ${project.icon}
            </div>

            <h3>
                ${project.name}
            </h3>

            <p>
                ${project.description}
            </p>

            <span class="project-difficulty ${difficultyClass}">
                ${project.difficulty}
            </span>

            <div class="project-option-bottom">

                <div class="project-price">
                    ₹${project.price}
                </div>

                <button
                    type="button"
                    class="select-project-btn">

                    Select Project

                </button>

            </div>
        `;

        const selectButton =
            card.querySelector(
                ".select-project-btn"
            );

        if (selectButton) {

            selectButton.addEventListener(
                "click",
                function () {

                    selectProject(
                        project,
                        domain
                    );
                }
            );
        }

        projectList.appendChild(card);
    });

    const projectSection =
        document.getElementById(
            "project-selection"
        );

    if (projectSection) {

        projectSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


// ========================================
// SELECT PROJECT
// ========================================

function selectProject(project, domain) {

    if (!selectedProjectBox) {
        return;
    }

    if (selectedProjectName) {
        selectedProjectName.textContent =
            project.name;
    }

    if (selectedProjectDomain) {
        selectedProjectDomain.textContent =
            domain + " • " + project.difficulty;
    }

    if (selectedProjectPrice) {
        selectedProjectPrice.textContent =
            "₹" + project.price;
    }

    selectedProjectBox.style.display =
        "block";

    localStorage.setItem(
        "selectedProject",
        JSON.stringify({
            domain: domain,
            name: project.name,
            difficulty: project.difficulty,
            price: project.price
        })
    );

    selectedProjectBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ========================================
// DOMAIN SELECTION
// ========================================

const domainCards =
    document.querySelectorAll(".domain-card");

const domainMessage =
    document.getElementById(
        "domain-selection-message"
    );

domainCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function () {

            domainCards.forEach(
                function (item) {
                    item.classList.remove("active");
                }
            );

            this.classList.add("active");

            const selectedDomain =
                this.getAttribute("data-domain");

            if (domainMessage) {

                domainMessage.textContent =
                    "✅ Selected Domain: " +
                    selectedDomain;

                domainMessage.classList.add(
                    "selected"
                );
            }

            localStorage.setItem(
                "selectedDomain",
                selectedDomain
            );

            showProjects(selectedDomain);
        }
    );
});


// ========================================
// CONTINUE PROJECT → CUSTOMER DETAILS
// ========================================

const continueProjectBtn =
    document.getElementById(
        "continue-project-btn"
    );

if (continueProjectBtn) {

    continueProjectBtn.addEventListener(
        "click",
        function () {

            const selectedProject =
                JSON.parse(
                    localStorage.getItem(
                        "selectedProject"
                    )
                );

            if (!selectedProject) {

                alert(
                    "Please select a project first."
                );

                return;
            }

            if (customerOrderSection) {

                customerOrderSection.style.display =
                    "block";

                const orderDomain =
                    document.getElementById(
                        "order-domain"
                    );

                const orderProject =
                    document.getElementById(
                        "order-project"
                    );

                const orderDifficulty =
                    document.getElementById(
                        "order-difficulty"
                    );

                const orderPrice =
                    document.getElementById(
                        "order-price"
                    );

                const orderTotalPrice =
                    document.getElementById(
                        "order-total-price"
                    );

                if (orderDomain) {
                    orderDomain.textContent =
                        selectedProject.domain;
                }

                if (orderProject) {
                    orderProject.textContent =
                        selectedProject.name;
                }

                if (orderDifficulty) {
                    orderDifficulty.textContent =
                        selectedProject.difficulty;
                }

                if (orderPrice) {
                    orderPrice.textContent =
                        selectedProject.price;
                }

                if (orderTotalPrice) {
                    orderTotalPrice.textContent =
                        selectedProject.price;
                }

                customerOrderSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    );
}


// ========================================
// CONTINUE CUSTOMER → PAYMENT
// ========================================

const continuePaymentBtn =
    document.getElementById(
        "continue-payment-btn"
    );

if (continuePaymentBtn) {

    continuePaymentBtn.addEventListener(
        "click",
        function () {

            const nameInput =
                document.getElementById(
                    "customer-name"
                );

            const mobileInput =
                document.getElementById(
                    "customer-mobile"
                );

            const emailInput =
                document.getElementById(
                    "customer-email"
                );

            const collegeInput =
                document.getElementById(
                    "customer-college"
                );

            const customerName =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const customerMobile =
                mobileInput
                    ? mobileInput.value.trim()
                    : "";

            const customerEmail =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            const customerCollege =
                collegeInput
                    ? collegeInput.value.trim()
                    : "";

            if (
                !customerName ||
                !customerMobile ||
                !customerEmail ||
                !customerCollege
            ) {

                alert(
                    "Please fill in all customer details before continuing."
                );

                return;
            }

            const selectedProject =
                JSON.parse(
                    localStorage.getItem(
                        "selectedProject"
                    )
                );

            if (!selectedProject) {

                alert(
                    "Please select a project first."
                );

                return;
            }

            const customerDetails = {
                name: customerName,
                mobile: customerMobile,
                email: customerEmail,
                college: customerCollege
            };

            localStorage.setItem(
                "customerDetails",
                JSON.stringify(customerDetails)
            );

            if (paymentSection) {

                paymentSection.style.display =
                    "block";

                const paymentProject =
                    document.getElementById(
                        "payment-project"
                    );

                const paymentAmount =
                    document.getElementById(
                        "payment-amount"
                    );

                if (paymentProject) {
                    paymentProject.textContent =
                        selectedProject.name;
                }

                if (paymentAmount) {
                    paymentAmount.textContent =
                        selectedProject.price;
                }

                paymentSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    );
}


// ========================================
// PAYMENT SCREENSHOT ELEMENTS
// ========================================

const confirmPaymentBtn =
    document.getElementById(
        "confirm-payment-btn"
    );

const paymentScreenshot =
    document.getElementById(
        "payment-screenshot"
    );

const paymentScreenshotPreview =
    document.getElementById(
        "payment-screenshot-preview"
    );

const paymentPreviewImage =
    document.getElementById(
        "payment-preview-image"
    );

const uploadPaymentProofBtn =
    document.getElementById(
        "upload-payment-proof-btn"
    );


// ========================================
// I HAVE COMPLETED PAYMENT
// → SHOW SCREENSHOT UPLOAD
// ========================================

if (confirmPaymentBtn) {

    confirmPaymentBtn.addEventListener(
        "click",
        function () {

            if (paymentProofSection) {

                paymentProofSection.style.display =
                    "block";

                paymentProofSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    );
}


// ========================================
// CHOOSE PAYMENT SCREENSHOT
// ========================================

if (paymentScreenshot) {

    paymentScreenshot.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];

            if (!file) {
                return;
            }

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select a valid payment screenshot."
                );

                this.value = "";

                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                function (event) {

                    if (paymentPreviewImage) {

                        paymentPreviewImage.src =
                            event.target.result;
                    }

                    if (paymentScreenshotPreview) {

                        paymentScreenshotPreview.style.display =
                            "block";
                    }

                    if (uploadPaymentProofBtn) {

                        uploadPaymentProofBtn.style.display =
                            "inline-flex";
                    }
                };

            reader.readAsDataURL(file);
        }
    );
}


// ========================================
// UPLOAD PAYMENT PROOF
// → ORDER CONFIRMATION
// → SUCCESS POPUP
// ========================================

if (uploadPaymentProofBtn) {

    uploadPaymentProofBtn.addEventListener(
        "click",
        function () {

            const file =
                paymentScreenshot
                    ? paymentScreenshot.files[0]
                    : null;

            if (!file) {

                alert(
                    "Please select your payment screenshot first."
                );

                return;
            }

            const selectedProject =
                JSON.parse(
                    localStorage.getItem(
                        "selectedProject"
                    )
                );

            const customerDetails =
                JSON.parse(
                    localStorage.getItem(
                        "customerDetails"
                    )
                );

            if (!selectedProject) {

                alert(
                    "Project details are missing. Please select your project again."
                );

                return;
            }

            if (!customerDetails) {

                alert(
                    "Customer details are missing. Please enter your details again."
                );

                return;
            }


            // ========================================
            // GENERATE ORDER ID
            // ========================================

            const orderId =
                "PW-" +
                Date.now()
                    .toString()
                    .slice(-8);


            // ========================================
            // CONFIRMATION ELEMENTS
            // ========================================

            const confirmationOrderId =
                document.getElementById(
                    "confirmation-order-id"
                );

            const confirmationName =
                document.getElementById(
                    "confirmation-name"
                );

            const confirmationMobile =
                document.getElementById(
                    "confirmation-mobile"
                );

            const confirmationEmail =
                document.getElementById(
                    "confirmation-email"
                );

            const confirmationCollege =
                document.getElementById(
                    "confirmation-college"
                );

            const confirmationProject =
                document.getElementById(
                    "confirmation-project"
                );

            const confirmationDomain =
                document.getElementById(
                    "confirmation-domain"
                );

            const confirmationDifficulty =
                document.getElementById(
                    "confirmation-difficulty"
                );

            const confirmationPrice =
                document.getElementById(
                    "confirmation-price"
                );


            // ========================================
            // FILL CONFIRMATION DETAILS
            // ========================================

            if (confirmationOrderId) {
                confirmationOrderId.textContent =
                    orderId;
            }

            if (confirmationName) {
                confirmationName.textContent =
                    customerDetails.name;
            }

            if (confirmationMobile) {
                confirmationMobile.textContent =
                    customerDetails.mobile;
            }

            if (confirmationEmail) {
                confirmationEmail.textContent =
                    customerDetails.email;
            }

            if (confirmationCollege) {
                confirmationCollege.textContent =
                    customerDetails.college;
            }

            if (confirmationProject) {
                confirmationProject.textContent =
                    selectedProject.name;
            }

            if (confirmationDomain) {
                confirmationDomain.textContent =
                    selectedProject.domain;
            }

            if (confirmationDifficulty) {
                confirmationDifficulty.textContent =
                    selectedProject.difficulty;
            }

            if (confirmationPrice) {
                confirmationPrice.textContent =
                    "₹" + selectedProject.price;
            }


            // ========================================
            // SAVE ORDER
            // ========================================

            const projectOrder = {

                orderId: orderId,

                domain:
                    selectedProject.domain,

                project:
                    selectedProject.name,

                difficulty:
                    selectedProject.difficulty,

                price:
                    selectedProject.price,

                customer:
                    customerDetails,

                paymentProof:
                    file.name,

                orderDate:
                    new Date().toLocaleString()
            };

            localStorage.setItem(
                "projectOrder",
                JSON.stringify(projectOrder)
            );


            // ========================================
            // HIDE PAYMENT AREAS
            // ========================================

            if (paymentProofSection) {

                paymentProofSection.style.display =
                    "none";
            }

            if (paymentSection) {

                paymentSection.style.display =
                    "none";
            }


            // ========================================
            // SHOW ORDER CONFIRMATION
            // ========================================

            if (orderConfirmationSection) {

                orderConfirmationSection.style.display =
                    "block";

                orderConfirmationSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }


            // ========================================
            // SUCCESS POPUP
            // ========================================

            alert(
                "🎉 ORDER CONFIRMED!\n\n" +
                "Order ID: " +
                orderId +
                "\n\n" +
                "Project: " +
                selectedProject.name +
                "\n\n" +
                "Amount: ₹" +
                selectedProject.price +
                "\n\n" +
                "Your payment screenshot has been received successfully."
            );
        }
    );
}


// ========================================
// LOAD SAVED PROJECT ON PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const savedDomain =
            localStorage.getItem(
                "selectedDomain"
            );

        const savedProject =
            JSON.parse(
                localStorage.getItem(
                    "selectedProject"
                )
            );

        if (
            savedDomain &&
            projects[savedDomain]
        ) {

            domainCards.forEach(
                function (card) {

                    if (
                        card.getAttribute(
                            "data-domain"
                        ) === savedDomain
                    ) {
                        card.classList.add(
                            "active"
                        );
                    }
                }
            );
        }

        if (
            savedProject &&
            selectedProjectBox
        ) {

            if (selectedProjectName) {
                selectedProjectName.textContent =
                    savedProject.name;
            }

            if (selectedProjectDomain) {
                selectedProjectDomain.textContent =
                    savedProject.domain +
                    " • " +
                    savedProject.difficulty;
            }

            if (selectedProjectPrice) {
                selectedProjectPrice.textContent =
                    "₹" +
                    savedProject.price;
            }
        }
    }
);


// ========================================
// PROJECT WORLD READY
// ========================================

console.log(
    "✅ Project World JavaScript loaded successfully."
);
console.log(
    "✅ Project World JavaScript loaded successfully."
);
// =====================================================
// PROJECT WORLD AI ASSISTANT - CHAT REPLY
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const aiInput = document.getElementById("ai-chat-input");
    const aiSend = document.getElementById("ai-chat-send");
    const aiMessages = document.getElementById("ai-chat-messages");

    if (!aiInput || !aiSend || !aiMessages) {
        return;
    }

    function addAIMessage(text, type) {

        const message = document.createElement("div");

        message.className =
            type === "user"
                ? "ai-message ai-user-message"
                : "ai-message ai-bot-message";

        message.innerHTML = text;

        aiMessages.appendChild(message);

        aiMessages.scrollTop = aiMessages.scrollHeight;
    }


    function getAIReply(userText) {

        const text = userText.toLowerCase();


        // AI PROJECTS
        if (
            text.includes("ai") ||
            text.includes("artificial intelligence") ||
            text.includes("machine learning") ||
            text.includes("ml")
        ) {

            return `
                🤖 <strong>Here are some AI project ideas:</strong>

                <br><br>

                1. AI Resume Analyzer
                <br>
                2. AI Study Assistant
                <br>
                3. AI Interview Preparation System
                <br>
                4. AI College Admission Predictor
                <br>
                5. AI Fake News Detection
                <br>
                6. AI Disease Prediction System
                <br>
                7. AI Voice Assistant
                <br>
                8. AI Exam Question Generator
                <br>
                9. AI Career Recommendation System
                <br>
                10. AI Student Performance Predictor

                <br><br>

                💡 Tell me your <strong>difficulty level</strong>
                (Easy, Intermediate, or Advanced) and I can suggest more suitable projects.
            `;
        }


        // WEB DEVELOPMENT
        if (
            text.includes("web") ||
            text.includes("website")
        ) {

            return `
                🌐 <strong>Here are some Web Development project ideas:</strong>

                <br><br>

                1. Online Learning Platform
                <br>
                2. College Management Website
                <br>
                3. Online Exam System
                <br>
                4. Student Portfolio Builder
                <br>
                5. College Placement Portal
                <br>
                6. Event Management Website
                <br>
                7. Online Library System
                <br>
                8. Student Feedback Portal

                <br><br>

                Tell me if you want an <strong>Easy, Intermediate, or Advanced</strong> project.
            `;
        }


        // APP DEVELOPMENT
        if (
            text.includes("app") ||
            text.includes("android") ||
            text.includes("mobile")
        ) {

            return `
                📱 <strong>Here are some App Development ideas:</strong>

                <br><br>

                1. Student Attendance App
                <br>
                2. Study Planner App
                <br>
                3. College Bus Tracking App
                <br>
                4. Campus Navigation App
                <br>
                5. Student Expense Tracker
                <br>
                6. Exam Preparation App
                <br>
                7. College Event App
                <br>
                8. Habit Tracking App
            `;
        }


        // CYBER SECURITY
        if (
            text.includes("cyber") ||
            text.includes("security") ||
            text.includes("hacking")
        ) {

            return `
                🛡️ <strong>Here are some Cyber Security project ideas:</strong>

                <br><br>

                1. Phishing Detection System
                <br>
                2. Password Strength Analyzer
                <br>
                3. Secure Login System
                <br>
                4. Spam Detection System
                <br>
                5. Network Intrusion Detection
                <br>
                6. File Encryption System
                <br>
                7. Malicious URL Detection
            `;
        }


        // EASY PROJECTS
        if (
            text.includes("easy") ||
            text.includes("simple") ||
            text.includes("beginner")
        ) {

            return `
                ⭐ <strong>Some easy project ideas:</strong>

                <br><br>

                1. Student Portfolio Website
                <br>
                2. College Event Website
                <br>
                3. Educational Quiz Game
                <br>
                4. Study Planner
                <br>
                5. Student Expense Tracker
                <br>
                6. Online Feedback System
                <br>
                7. Library Management System

                <br><br>

                These are suitable for beginners.
            `;
        }


        // GREETING
        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {

            return `
                👋 Hello!

                <br><br>

                I'm your <strong>Project World Assistant</strong>.

                <br><br>

                You can ask me things like:

                <br>
                • I want an AI project
                <br>
                • Give me an easy project
                <br>
                • I need a web project
                <br>
                • Give me an app project
                <br>
                • I want a cyber security project
            `;
        }


        // DEFAULT REPLY
        return `
            🤖 I can help you find a project idea.

            <br><br>

            Try asking:

            <br>
            • <strong>I want an AI project</strong>
            <br>
            • <strong>Give me an easy project</strong>
            <br>
            • <strong>I need a web project</strong>
            <br>
            • <strong>I want an app project</strong>
            <br>
            • <strong>I want a cyber security project</strong>
        `;
    }


    function sendAIMessage() {

        const userText = aiInput.value.trim();

        if (!userText) {
            return;
        }

        addAIMessage(userText, "user");

        aiInput.value = "";

        setTimeout(function () {

            const reply = getAIReply(userText);

            addAIMessage(reply, "bot");

        }, 400);
    }


    aiSend.addEventListener("click", sendAIMessage);


    aiInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendAIMessage();

        }

    });

});
// =====================================================
// PROJECT WORLD - REAL AI ASSISTANT CONNECTION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    let aiInput = document.getElementById("ai-chat-input");
    let aiSend = document.getElementById("ai-chat-send");
    const aiMessages = document.getElementById("ai-chat-messages");

    if (!aiInput || !aiSend || !aiMessages) {
        return;
    }

    // Remove old assistant event listeners
    // by replacing the input and send button.
    const newInput = aiInput.cloneNode(true);
    aiInput.parentNode.replaceChild(newInput, aiInput);
    aiInput = newInput;

    const newSend = aiSend.cloneNode(true);
    aiSend.parentNode.replaceChild(newSend, aiSend);
    aiSend = newSend;


    function addAIMessage(text, type) {

        const message = document.createElement("div");

        message.className =
            type === "user"
                ? "ai-message ai-user-message"
                : "ai-message ai-bot-message";

        message.innerHTML = text;

        aiMessages.appendChild(message);

        aiMessages.scrollTop = aiMessages.scrollHeight;
    }


    async function sendAIMessage() {

        const userText = aiInput.value.trim();

        if (!userText) {
            return;
        }

        addAIMessage(userText, "user");

        aiInput.value = "";

        const loadingMessage = document.createElement("div");

        loadingMessage.className =
            "ai-message ai-bot-message";

        loadingMessage.textContent =
            "🤖 Thinking...";

        aiMessages.appendChild(loadingMessage);

        aiMessages.scrollTop =
            aiMessages.scrollHeight;


        try {

            const response = await fetch(
                "https://project-world-nt8b.onrender.com/api/project-assistant",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: userText
                    })
                }
            );


            const data = await response.json();


            loadingMessage.remove();


            if (!response.ok) {

                addAIMessage(
                    "❌ Sorry, I couldn't get an AI response. Please try again.",
                    "bot"
                );

                console.error(data);

                return;
            }


            addAIMessage(
                data.reply,
                "bot"
            );


        } catch (error) {

            loadingMessage.remove();

            addAIMessage(
                "❌ I can't connect to the AI server right now. Please make sure the backend server is running.",
                "bot"
            );

            console.error(
                "AI connection error:",
                error
            );

        }

    }


    aiSend.addEventListener(
        "click",
        sendAIMessage
    );


    aiInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendAIMessage();

            }

        }
    );

});