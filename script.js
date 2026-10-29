// ============================================================
// 1. LESSON DATA
// ============================================================

// Each object in this array represents one Python-to-Java
// programming concept that students can learn about.
//
// Each lesson can contain information such as:
// - title: The name of the concept
// - description: An explanation of the concept
// - pythonCode: An example written in Python
// - javaCode: The equivalent example written in Java

const TRAPS = [
    {
        title: "Static Typing",
        description: "Java requires variables to have declared types, while Python is dynamically typed.",


        pythonCode: `x = 10
x = "hello"
print(x)`,

        javaCode: `int x = 10;
System.out.println(x);`
    },

    {
        title: "Integer Division",
        description: "Python and Java handle division differently when both operands are integers.",

        pythonCode: `print(7 / 2)
print(7 // 2)`,

        javaCode: `System.out.println(7 / 2);
System.out.println(7.0 / 2);`
    },

    {
        title: "String Equality",
        description: "Python compares string contents with ==. In Java, use .equals() to compare string contents.",

        pythonCode: `a = "hello"
b = "hello"
print(a == b)`,

        javaCode: `String a = "hello";
String b = "hello";

System.out.println(a.equals(b));`
    },

    {
        title: "Arrays and ArrayLists",
        description: "Java arrays have a fixed length, while ArrayList allows the collection to grow.",

        pythonCode: `numbers = [1, 2, 3]
numbers.append(4)
print(numbers)`,

        javaCode: `import java.util.ArrayList;

ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(1);
numbers.add(2);
numbers.add(3);
numbers.add(4);

System.out.println(numbers);`
    },

    {
        title: "Integer Overflow",
        description: "Java integer types have fixed ranges, so an integer can overflow. Python integers can grow much larger.",

        pythonCode: `x = 2147483647
print(x + 1)`,

        javaCode: `int x = 2147483647;
System.out.println(x + 1);`
    }
];


// ============================================================
// 2. CONNECT JAVASCRIPT TO THE HTML PAGE
// ============================================================
// getElementById() finds an HTML element using its id attribute.
const lessonList = document.getElementById("lesson-list");
const navigation = document.getElementById("navigation");


// ============================================================
// 3. PYTHON EXECUTION ENVIRONMENT
// ============================================================
// Pyodide runs a Python environment
// inside the browser using WebAssembly.
// Once Pyodide loads, JavaScript can ask it to execute Python
// code without sending that Python code to a separate server.
let pyodide = null;
async function initializePython() {
    try {
        // Load Pyodide and wait until the Python environment
        // is ready to execute code.
        pyodide = await loadPyodide();

        console.log("Python environment is ready!");
    } catch (error) {
        // If loading fails, print the error
        console.error("Failed to initialize Python:", error);
    }
}

// Start initializing Python when this script runs.
initializePython();


// ============================================================
// 4. CREATE HTML ELEMENTS WITH JAVASCRIPT
// ============================================================

// This helper function creates an HTML element.
function createElement(tag, text = "") {
    // Create an element of the requested HTML type.
    const element = document.createElement(tag);
    element.textContent = text;

    return element;
}

// ============================================================
// 5. DISPLAY PROGRAM OUTPUT
// ============================================================

// This function displays a program's output inside an HTML
// output area.
function showOutput(element, output) {

    element.textContent = output;
}


// ============================================================
// 8. BUILD A CODE EDITOR PANEL
// ============================================================

// This function creates the interactive panel students use
// to view, edit, copy, reset, and execute example code.
function createCodePanel(language, initialCode) {

    // Create the main container for this code panel.
    const panel = document.createElement("div");
    panel.className = "code-panel";

    // Create a text area that allows students to edit the code.
    const editor = document.createElement("textarea");
    editor.className = "code-editor";
    editor.value = initialCode;

    // Create the Run button.
    const runButton = createElement("button", "Run");
    runButton.className = "run-button";

    // Create the Copy button.
    const copyButton = createElement("button", "Copy");
    copyButton.className = "copy-button";

    // Create the Reset button.
    const resetButton = createElement("button", "Reset");
    resetButton.className = "reset-button";

    // Create a place to display output or errors.
    const outputElement = document.createElement("pre");
    outputElement.className = "code-output";
    outputElement.textContent = "Run the code to see its output.";

    // --------------------------------------------------------
    // RUN BUTTON
    // --------------------------------------------------------
    runButton.addEventListener("click", () => {

        // Read the code currently in the editor.
        const source = editor.value;

        // Choose the correct language
        if (language === "python") {
            runPython(source, outputElement, runButton);
        } else if (language === "java") {
            runJava(source, outputElement, runButton);
        }
    });

    // --------------------------------------------------------
    // COPY BUTTON
    // --------------------------------------------------------
    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(editor.value);

            copyButton.textContent = "Copied!";

            setTimeout(() => {
                copyButton.textContent = "Copy";
            }, 1500);

        } catch (error) {
            showOutput(outputElement, "Unable to copy code: " + error.message);
        }
    });

    // --------------------------------------------------------
    // RESET BUTTON
    // --------------------------------------------------------
    // Restore the original example code.
    resetButton.addEventListener("click", () => {
        editor.value = initialCode;
        outputElement.textContent = "Code reset. Run the code to see its output.";
    });

    // --------------------------------------------------------
    // KEYBOARD SHORTCUTS
    // --------------------------------------------------------
    editor.addEventListener("keydown", (event) => {

        //Tab Shortcut
        if (event.key === "Tab") {
            event.preventDefault();

            const start = editor.selectionStart;
            const end = editor.selectionEnd;

            // Replace the selected text, if any, with four spaces.
            editor.setRangeText(
                "    ",
                start,
                end,
                "end"
            );
        }

        // Cmd+Enter on Mac or Ctrl+Enter on Windows/Linux
        // runs the current code without clicking the button.
        if (
            event.key === "Enter" &&
            (event.metaKey || event.ctrlKey)
        ) {
            event.preventDefault();
            runButton.click();
        }
    });

    // --------------------------------------------------------
    // ASSEMBLE THE PANEL
    // --------------------------------------------------------
    // Append each element to the panel.
    panel.appendChild(editor);
    panel.appendChild(runButton);
    panel.appendChild(copyButton);
    panel.appendChild(resetButton);
    panel.appendChild(outputElement);

    // Return the completed panel so it can be added to a lesson.
    return panel;
}


// ============================================================
// 9. RENDER A LESSON CARD
// ============================================================
function renderTrap(trap, index) {

    // Create the main lesson card.
    const card = document.createElement("section");
    card.className = "lesson-card";

    // Give each card a unique ID.
    card.id = `lesson-${index}`;

    // Add the lesson title.
    const title = createElement("h2", trap.title);

    // Add the lesson description.
    const description = createElement("p", trap.description);

    // Create the Python editor panel
    const pythonPanel = createCodePanel(
        "python",
        trap.pythonCode
    );

    // Create the Java editor panel
    const javaPanel = createCodePanel(
        "java",
        trap.javaCode
    );

    // Add all the lesson components to the card.
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(pythonPanel);
    card.appendChild(javaPanel);

    // Return the finished card so it can be added to the page.
    return card;
}


// ============================================================
// 10. GENERATE THE LESSONS AND NAVIGATION
// ============================================================
TRAPS.forEach((trap, index) => {

    // Create a navigation link for this lesson.
    const navLink = createElement("a", trap.title);

    // Set the link's destination to the matching lesson card.
    navLink.href = `#lesson-${index}`;

    // Add a class so CSS can style the navigation link.
    navLink.className = "lesson-nav-link";

    // Add the link to the navigation area.
    navigation.appendChild(navLink);

    // Build the lesson card.
    const card = renderTrap(trap, index);

    // Add the card to the lesson list.
    lessonList.appendChild(card);
});


// ============================================================
// 11. HIGHLIGHT THE CURRENT LESSON
// ============================================================

// IntersectionObserver lets JavaScript detect when an element
// enters or leaves the visible part of the page.
const observer = new IntersectionObserver((entries) => {

    // An observer can report multiple elements at once.
    entries.forEach((entry) => {

        // Only update the navigation when a lesson becomes
        // visible according to the observer's settings.
        if (entry.isIntersecting) {

            // Find the navigation link for this lesson.
            const index = TRAPS.findIndex(
                (trap, i) => `lesson-${i}` === entry.target.id
            );

            // Get all navigation links.
            const navLinks = document.querySelectorAll(
                ".lesson-nav-link"
            );

            // Remove the active class from every link.
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            // Highlight the link that matches the visible lesson.
            if (index !== -1 && navLinks[index]) {
                navLinks[index].classList.add("active");
            }
        }
    });

}, {
    // A lesson is considered for highlighting when it occupies
    // a meaningful portion of the visible page.
    threshold: 0.3
});


// Start observing every lesson card.
document.querySelectorAll(".lesson-card").forEach((card) => {
    observer.observe(card);
});