const firsttxt1 = document.getElementById("firsttxt1");
const dialogueElement = document.getElementById("fdialogue");

function fadeIn(element, txt) {
    return new Promise((resolve) => {
        element.textContent = txt;
        let opacity = 0;
        element.style.opacity = opacity;
        element.style.display = "block";
        const interval = setInterval(() => {
            opacity += 0.05;
            element.style.opacity = opacity;
            if (opacity >= 1) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

function fadeOut(element) {
    return new Promise((resolve) => {
        let opacity = 1;
        element.style.opacity = opacity;
        const interval = setInterval(() => {
            opacity -= 0.05;
            element.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(interval);
                element.style.display = "none";
                resolve();
            }
        }, 100);
    });
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateText(element = firsttxt1, txt = "Default Text", styleOverrides = {}) {
    Object.assign(element.style, styleOverrides);
    await fadeIn(element, txt);
    await wait(1000);
    await fadeOut(element);
}

function typeText(element, text, delay = 50) {
    return new Promise((resolve) => {
        let index = 0;
        element.textContent = "";
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, delay);
    });
}

async function beg_to_menu() {
    document.getElementById("StartMessage").style.display = "none";
    document.getElementById("menu").style.display = "flex";
}

async function runAnimations() {
    await animateText(firsttxt1, "riCeqi", {
        fontSize: "100px",
        fontFamily: "geopixfont, serif"
    });

    await animateText(firsttxt1,
        "წინამდებარე თამაში მომზადდა დოიჩე ველე აკადემიისა და MDF-ის მიერ განხორციელებული ConMeCo პროექტის ფარგლებში, ევროკავშირის ფინანსური მხარდაჭერით და გერმანიის ეკონომიკური განვითარებისა და თანამშრომლობის ფედერალური სამინისტროს თანადაფინანსებით. ამ თამაშის შინაარსი გუნდ ReCheck-ის პასუხისმგებლობაა და არ გამოხატავს ევროკავშირის და გერმანიის ფედერალური სამინისტროს შეხედულებებს",
        {
            fontSize: "28px",
            fontFamily: "sans-serif",
            margin: "40px"
        });

    await beg_to_menu();
}

runAnimations();

const dialogues = [
    { speaker: "herakle", text: "gamarjoba, me var herakle..." },
    { speaker: "herakle", text: "Seni daxmareba mWirdeba..." },
    { speaker: "herakle", text: "mis informacia qarTul wyaroebs Tavs daesxa da yoveli kuTxe unda vixsnaT dezinformaciisgan!" },
    { speaker: "missinfo", text: "ukve yvelaferi gavanadgure! verafers uSveliT!" },
    { speaker: "missinfo", text: "muaha ha ha!" },
    { speaker: "herakle", text: "unda viCqaroT!" }
];

let currentDialogueIndex = 0;
let isTyping = false;
let animationInterval;

function updateSpeakerVisual(speaker) {
    const imageElement = document.getElementById("animated-image");
    clearInterval(animationInterval);

    let images = [];

    if (speaker === "herakle") {
        images = [
            "assets/herakle/herakle1.png",
            "assets/herakle/herakle2.png",
            "assets/herakle/herakle3.png",
            "assets/herakle/herakle4.png",
            "assets/herakle/herakle5.png"
        ];
        imageElement.style.marginTop = "0px";
    } else if (speaker === "missinfo") {
        images = [
            "assets/missinformation/mi1.png",
            "assets/missinformation/mi2.png",
            "assets/missinformation/mi3.png"
        ];
        imageElement.style.marginTop = "100px";
    }

    let currentImageIndex = 0;
    imageElement.src = images[0];
    animationInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        imageElement.src = images[currentImageIndex];
    }, 200);
}

async function showNextDialogue() {
    if (isTyping || currentDialogueIndex >= dialogues.length) return;

    const current = dialogues[currentDialogueIndex];
    updateSpeakerVisual(current.speaker);
    isTyping = true;
    await typeText(dialogueElement, current.text);
    isTyping = false;
    currentDialogueIndex++;

    if (currentDialogueIndex === dialogues.length) {
        setTimeout(() => {
            document.getElementById("map").style.display = "none";
            document.getElementById("levelMap").style.display = "flex";
        }, 1000);
    }
}

function start() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("map").style.display = "flex";
    currentDialogueIndex = 0;
    showNextDialogue();
}

window.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        showNextDialogue();
        e.preventDefault();
    }
});

document.getElementById("map").addEventListener("click", function () {
    showNextDialogue();
});

document.querySelectorAll(".map_part, .map_part2").forEach(part => {
    part.addEventListener("mouseenter", () => {
        const levelName = part.getAttribute("data-name");
        document.getElementById("levelNameDisplay").textContent = levelName;
    });
    part.addEventListener("mouseleave", () => {
        document.getElementById("levelNameDisplay").textContent = "";
    });
});
function updateLevelProgress(completed) {
    const text = `${completed}/7`;
    document.getElementById("levelProgressText").textContent = text;
}

let levelsCompleted = 0;
updateLevelProgress(levelsCompleted);


function startLevel(levelName) {
    window.location.href = `quiz.html?level=${levelName}`;
  }
  function startGame() {
    window.location.href = "quiz.html";
  }