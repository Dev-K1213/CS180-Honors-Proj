
// 1. LESSON DATA
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
    title: "Primitive Types vs. Objects",
    description: "Java distinguishes between primitive types and reference types. Python variables reference objects, and even numbers are objects. In Java, int, double, and boolean are primitives, while String and Integer are objects.",

    misconception: "Every Java variable is an object, just like every Python value is an object.",
    takeaway: "Java distinguishes between primitive types like int and double and reference types like String and Integer. Primitives are not objects.",

    pythonCode: `x = 10
y = "hello"

print(type(x))
print(type(y))

# Everything in Python is an object
print(isinstance(x, object))`,

    javaCode: `public class Main {
    public static void main(String[] args) {
        int x = 10;
        String y = "hello";
        Integer z = 10;

        System.out.println(((Object) x).getClass());
        System.out.println(y.getClass());
        System.out.println(z.getClass());
    }
}`
},

{
    title: "Pass-by-Value vs. Object References",
    description: "Python passes object references by assignment. Java always passes arguments by value, including when the value is an object reference. Both languages can mutate an object through a reference, but reassigning a parameter does not replace the caller's variable.",

    misconception: "Passing an object into a Java method allows that method to replace the original variable.",
    takeaway: "Java always passes arguments by value. For objects, the copied value is a reference, so methods can mutate the referenced object but cannot replace the caller's reference.",

    pythonCode: `def change(numbers):
    numbers.append(4)
    numbers = [100, 200]

values = [1, 2, 3]
change(values)

print(values)`,

    javaCode: `import java.util.ArrayList;

public class Main {
    static void change(ArrayList<Integer> numbers) {
        numbers.add(4);
        numbers = new ArrayList<>();
        numbers.add(100);
    }

    public static void main(String[] args) {
        ArrayList<Integer> values = new ArrayList<>();
        values.add(1);
        values.add(2);
        values.add(3);

        change(values);
        System.out.println(values);
    }
}`
},

{
    title: "Mutability and Immutable Objects",
    description: "Python lists are mutable, while strings are immutable. Java has similar distinctions: ArrayList is mutable, but String is immutable. Reassigning a variable is different from modifying the object it references.",

    misconception: "Changing a string variable modifies the original string object.",
    takeaway: "Java Strings are immutable. Operations like concatenation create a new String, while mutable objects like ArrayList can be modified in place.",

    pythonCode: `word = "hello"

# Strings cannot be modified in place
word = word + " world"

numbers = [1, 2, 3]
numbers.append(4)

print(word)
print(numbers)`,

    javaCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        String word = "hello";
        word = word + " world";

        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);
        numbers.add(4);

        System.out.println(word);
        System.out.println(numbers);
    }
}`
},

{
    title: "Variable Scope and Braces",
    description: "Python uses indentation to define code blocks, while Java uses curly braces. Java also has block scope: variables declared inside a block cannot be accessed outside it.",

    misconception: "A variable declared inside an if statement or loop can be accessed anywhere in the method.",
    takeaway: "Java uses block scope. Variables declared inside a block are only accessible within that block.",

    pythonCode: `if True:
    message = "Hello"

print(message)

for i in range(3):
    number = i

print(number)`,

    javaCode: `public class Main {
    public static void main(String[] args) {
        if (true) {
            String message = "Hello";
            System.out.println(message);
        }

        // This would NOT compile:
        // System.out.println(message);
    }
}`
},

{
    title: "Default Values and Null",
    description: "Python variables can be assigned None, but Java distinguishes between null references and primitive values. Java instance fields receive default values, while local variables must be initialized before use.",

    misconception: "Java automatically initializes every variable to null or zero.",
    takeaway: "Java instance fields receive default values, but local variables must be initialized before they are used. null represents the absence of an object reference.",

    pythonCode: `x = None
numbers = [None, 10, 20]

print(x)
print(numbers)`,

    javaCode: `public class Main {
    int number;
    String name;

    public static void main(String[] args) {
        Main example = new Main();

        System.out.println(example.number);
        System.out.println(example.name);

        // A local variable must be initialized
        // before it can be used.
        // int local;
        // System.out.println(local);
    }
}`
},

{
    title: "Integer vs. Floating-Point Types",
    description: "Python integers can grow to very large sizes, and Python floats are floating-point numbers. Java requires you to choose numeric types such as int, long, float, or double, each with different ranges and precision.",

    misconception: "Java automatically handles numbers of any size and precision.",
    takeaway: "Java requires explicit numeric types such as int, long, float, and double. Each has different range and precision limitations.",

    pythonCode: `x = 100000000000000000000000
y = 5.5

print(x)
print(type(x))
print(type(y))`,

    javaCode: `public class Main {
    public static void main(String[] args) {
        long x = 1000000000000000000L;
        double y = 5.5;

        System.out.println(x);
        System.out.println(((Object) y).getClass());

        // An int cannot hold arbitrarily large numbers.
    }
}`
},

{
    title: "Method Overloading vs. Dynamic Arguments",
    description: "Python functions can accept different argument types and use default parameters. Java uses method overloading to define multiple methods with the same name but different parameter lists, and method signatures must be declared.",

    misconception: "A Java method can accept any type of argument just because Python functions can.",
    takeaway: "Java methods have declared parameter types. Method overloading lets you define multiple methods with the same name but different parameter lists.",

    pythonCode: `def describe(value):
    print(value)

describe(10)
describe("hello")
describe([1, 2, 3])`,

    javaCode: `public class Main {
    static void describe(int value) {
        System.out.println(value);
    }

    static void describe(String value) {
        System.out.println(value);
    }

    static void describe(int[] value) {
        System.out.println(java.util.Arrays.toString(value));
    }

    public static void main(String[] args) {
        describe(10);
        describe("hello");
        describe(new int[]{1, 2, 3});
    }
}`
},

{
    title: "Checked vs. Unchecked Exceptions",
    description: "Both Python and Java use try-catch-style exception handling. However, Java also has checked exceptions, which must be caught or declared with throws at compile time. Python does not enforce this requirement.",

    misconception: "If an exception can happen in Python without being declared, Java methods can also throw any exception without declaring it.",
    takeaway: "Java checked exceptions must be handled with try-catch or declared using throws. Unchecked exceptions do not have this requirement.",

    pythonCode: `def read_file():
    file = open("example.txt", "r")
    print(file.read())
    file.close()

try:
    read_file()
except FileNotFoundError:
    print("File not found!")`,

    javaCode: `import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Main {
    static void readFile() throws FileNotFoundException {
        File file = new File("example.txt");
        Scanner scanner = new Scanner(file);

        System.out.println(scanner.nextLine());
        scanner.close();
    }

    public static void main(String[] args) {
        try {
            readFile();
        } catch (FileNotFoundException e) {
            System.out.println("File not found!");
        }
    }
}`
},

{
    title: "Inheritance and Super",
    description: "Both languages support inheritance, but Java requires explicit inheritance declarations using extends. Java uses super to access parent-class constructors and methods, while Python uses super() with its own syntax.",

    misconception: "Java inheritance works exactly like Python inheritance, so parent constructors and methods can be accessed without explicitly using super.",
    takeaway: "Java uses extends to inherit from a class and super() to call a parent constructor. A superclass constructor must be initialized before the subclass constructor finishes.",

    pythonCode: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print("Animal sound")

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)

    def speak(self):
        print(self.name + " says woof!")

dog = Dog("Buddy")
dog.speak()`,

    javaCode: `class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void speak() {
        System.out.println("Animal sound");
    }
}

class Dog extends Animal {
    Dog(String name) {
        super(name);
    }

    @Override
    void speak() {
        System.out.println(name + " says woof!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy");
        dog.speak();
    }
}`
},

{
    title: "Static vs. Instance Members",
    description: "Python typically uses class attributes and instance attributes, while Java explicitly declares static members that belong to the class rather than individual objects. Instance members belong to each object separately.",

    misconception: "A variable declared inside a Java class is automatically shared by every object created from that class.",
    takeaway: "Java instance variables belong to individual objects. Static variables belong to the class and are shared across its instances.",

    pythonCode: `class Counter:
    total = 0

    def __init__(self):
        self.count = 0
        Counter.total += 1

a = Counter()
b = Counter()

a.count += 1

print(a.count)
print(b.count)
print(Counter.total)`,

    javaCode: `class Counter {
    static int total = 0;
    int count = 0;

    Counter() {
        total++;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter a = new Counter();
        Counter b = new Counter();

        a.count++;

        System.out.println(a.count);
        System.out.println(b.count);
        System.out.println(Counter.total);
    }
}`
}


];



// 2. CONNECT JAVASCRIPT TO THE HTML PAGE
// getElementById() finds an HTML element using its id attribute.
const lessonList = document.getElementById("content");
const navigation = document.getElementById("nav");



// 3. PYTHON EXECUTION ENVIRONMENT
// Pyodide runs a Python environment
// inside the browser using WebAssembly.
// Once Pyodide loads, JavaScript can ask it to execute Python
// code without sending that Python code to a separate server.
let pyodide = null;
async function initializePython() {
    const pythonStatus = document.getElementById("python-status");

    try {
        // Load the Python environment.
        pyodide = await loadPyodide();

        console.log("Python environment is ready");

    } catch (error) {
        console.error("Failed to initialize Python:", error);

        pythonStatus.textContent = "Python: Failed to load";
        pythonStatus.classList.remove("loading");
        pythonStatus.classList.add("error");
    }
}

// Start initializing Python when this script runs.
initializePython();



// 4. CREATE HTML ELEMENTS WITH JAVASCRIPT
// This helper function creates an HTML element.
function createElement(tag, text = "") {
    const element = document.createElement(tag);
    element.textContent = text;

    return element;
}


// 5. DISPLAY PROGRAM OUTPUT
// This function displays a program's output inside an HTML
// output area.
function showOutput(element, output) {

    element.textContent = output;
}




// 6. RUN PYTHON CODE
// This function takes Python code from an editor, executes it
// through Pyodide, and displays the result.
async function runPython(source, outputElement, runButton) {

    if (!pyodide) {
        showOutput(
            outputElement,
            "Python is still loading. Please try again shortly."
        );
        return;
    }

    // Disable the Run button while the program executes.
    if (runButton) {
        runButton.disabled = true;
    }

    // Collect Ouput
    let output = "";

    try {
        // Redirect Python's print() output into JavaScript
        // variable instead of the browser console.
        pyodide.setStdout({
            batched: (text) => {
                output += text + "\n";
            }
        });

        // Execute the student's Python code.
        const result = await pyodide.runPythonAsync(source);

        if (result !== undefined) {
            output += String(result);
        }

        // Display the captured output.
        showOutput(outputElement, output || "Program finished with no output.");

    } catch (error) {
        // If the Python code has a syntax error or encounters
        // another exception, display the error to the student.
        showOutput(outputElement, "Error: " + error.message);

    } finally {
        // Re-enable the Run button
        if (runButton) {
            runButton.disabled = false;
        }
    }
}



// 7. RUN JAVA CODE
// Java is not being executed
// directly inside the browser by this function.
//
// The code is sent to a remote Java execution service
// using fetch(). The service compiles and runs the Java code
// and sends the results back.

async function runJava(source, outputElement, runButton) {
    // Disable the Run button while Java executes.
    if (runButton) {
        runButton.disabled = true;
    }

    // Show a message while the code is being processed.
    showOutput(outputElement, "Compiling and running Java...");

    try {
        // Send the Java code to Judge0's API.
        const response = await fetch(
            "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    source_code: source,
                    language_id: 62
                })
            }
        );

        // Convert Judge0's JSON response into a JavaScript object.
        const result = await response.json();

        // Handle HTTP errors from the execution service.
        if (!response.ok) {
            throw new Error(
                result.message || `Judge0 returned HTTP ${response.status}`
            );
        }


        const output =
            result.stdout ||
            result.compile_output ||
            result.stderr ||
            result.message ||
            result.status?.description ||
            "Program finished with no output.";

        // Display the result, including compilation or runtime errors.
        showOutput(outputElement, output);

    } catch (error) {
        // Handle network errors or problems reaching Judge0.
        showOutput(
            outputElement,
            "Unable to run Java: " + error.message
        );

    } finally {
        // re enable Run Button
        if (runButton) {
            runButton.disabled = false;
        }
    }
}




// 8. BUILD A CODE EDITOR PANEL
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


    // RUN BUTTON
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


    // COPY BUTTON
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


    // RESET BUTTON
    // Restore the original example code.
    resetButton.addEventListener("click", () => {
        editor.value = initialCode;
        outputElement.textContent = "Code reset. Run the code to see its output.";
    });


    // KEYBOARD SHORTCUTS
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

        //Listener
        if (
            event.key === "Enter" &&
            (event.metaKey || event.ctrlKey)
        ) {
            event.preventDefault();
            runButton.click();
        }
    });


    // ASSEMBLE THE PANEL
    // Append each element to the panel.
    panel.appendChild(editor);
    panel.appendChild(runButton);
    panel.appendChild(copyButton);
    panel.appendChild(resetButton);
    panel.appendChild(outputElement);

    // Return the completed panel so it can be added to a lesson.
    return panel;
}



// 9. RENDER A LESSON CARD
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

    const misconception = createElement(
    "p",
    "Common misconception: " + trap.misconception
    );

    const takeaway = createElement(
        "p",
        "Key takeaway: " + trap.takeaway
    );

    // Add all the lesson components to the card.
card.appendChild(title);
card.appendChild(description);
card.appendChild(misconception);
card.appendChild(takeaway);
card.appendChild(pythonPanel);
card.appendChild(javaPanel);

    // Return the finished card so it can be added to the page.
    return card;
}





// 10. GENERATE THE LESSONS AND NAVIGATION

// Make sure the HTML elements actually exist.
if (!lessonList || !navigation) {
    console.error("Could not find #content or #nav in index.html.");
} else {

    // Remove the original "Loading field guide..." message.
    lessonList.innerHTML = "";

    // Clear any existing navigation links.
    navigation.innerHTML = "";

    // Generate every lesson from the TRAPS array.
    TRAPS.forEach((trap, index) => {

        // Create a navigation link.
        const navLink = createElement("a", trap.title);
        navLink.href = `#lesson-${index}`;
        navLink.className = "lesson-nav-link";

        // Add the link to the sidebar.
        navigation.appendChild(navLink);

        // Generate the lesson card.
        const card = renderTrap(trap, index);

        // Add the lesson to the main content.
        lessonList.appendChild(card);
    });
}




// 11. HIGHLIGHT THE CURRENT LESSON
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