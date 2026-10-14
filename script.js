//Content
const TRAPS = [

  //Static typing
  {
    id: "static-typing",
    title: "Variables have fixed types",
    category: "Type system",
    misconception: "A variable is just a name that can point at anything, like in Python.",
    python: `x = 5
x = "five"      # totally fine
print(x)`,
    pythonOut: "five",
    java: `public class Main {
    public static void main(String[] args) {
        int x = 5;
        x = "five";   // compile error: String cannot be converted to int
        System.out.println(x);
    }
}`,
    javaOut: "error: incompatible types: String cannot be converted to int",
    why: "Python types belong to values and are checked at runtime. Java types belong to variables and are checked at compile time, so the code never even runs.",
    fix: "Declare the type once and keep each variable to one purpose. Use a second variable (e.g. int count, String label) instead of reusing one name for different types."
  },

  //Integer Division
  {
    id: "integer-division",
    title: "/ on integers truncates",
    category: "Operators",
    misconception: "Dividing two numbers always gives the exact answer.",
    python: `print(7 / 2)    # 3.5
print(7 // 2)   # 3`,
    pythonOut: "3.5\n3",
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println(7 / 2);      // 3
        System.out.println(7 / 2.0);    // 3.5
        System.out.println((double) 7 / 2); // 3.5
    }
}`,
    javaOut: "3\n3.5\n3.5",
    why: "In Python 3, / is always true division. In Java, the operand types decide: int / int gives an int and drops the remainder.",
    fix: "Make at least one operand a double (7 / 2.0) or cast before dividing ((double) a / b). Cast the operand, not the result: (double)(a / b) is already truncated."
  },

  //String equality
  {
    id: "string-equality",
    title: "== does not compare String contents",
    category: "Objects",
    misconception: "== checks whether two strings have the same text.",
    python: `a = "hello"
b = "".join(["hel", "lo"])
print(a == b)   # True`,
    pythonOut: "True",
    java: `public class Main {
    public static void main(String[] args) {
        String a = "hello";
        String b = new String("hello");
        System.out.println(a == b);       // false (different objects)
        System.out.println(a.equals(b));  // true
    }
}`,
    javaOut: "false\ntrue",
    why: "In Java, == on objects compares references (are these the same object in memory?). Python's == calls __eq__ and compares values; Python's is is the closer match to Java's ==.",
    fix: "Always use .equals() for Strings and other objects. Write \"literal\".equals(x) to avoid a NullPointerException when x might be null."
  },

  //fixed arrays
  {
    id: "fixed-arrays",
    title: "Arrays have a fixed size",
    category: "Collections",
    misconception: "An array can grow with append, like a Python list.",
    python: `nums = [1, 2, 3]
nums.append(4)
print(nums)     # [1, 2, 3, 4]`,
    pythonOut: "[1, 2, 3, 4]",
    java: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        int[] arr = new int[3];       // size is fixed forever
        // arr[3] = 4;                // ArrayIndexOutOfBoundsException

        ArrayList<Integer> nums = new ArrayList<>();
        nums.add(1); nums.add(2); nums.add(3); nums.add(4);
        System.out.println(nums);     // [1, 2, 3, 4]
    }
}`,
    javaOut: "[1, 2, 3, 4]",
    why: "A Python list is a resizable container. A Java array is a fixed block of memory; the closest equivalent to a list is ArrayList.",
    fix: "Use ArrayList<T> when the size changes, and plain arrays when it is known up front. Remember ArrayList holds objects, so write Integer, not int, in the angle brackets."
  },

  //integer overflow
  {
    id: "integer-overflow",
    title: "Integers overflow silently",
    category: "Numbers",
    misconception: "Integers can be as large as you need.",
    python: `big = 2_147_483_647
print(big + 1)  # 2147483648`,
    pythonOut: "2147483648",
    java: `public class Main {
    public static void main(String[] args) {
        int big = Integer.MAX_VALUE;   // 2147483647
        System.out.println(big + 1);   // -2147483648 (wraps around)

        long safe = (long) big + 1;
        System.out.println(safe);      // 2147483648
    }
}`,
    javaOut: "-2147483648\n2147483648",
    why: "Python ints grow as needed. Java's int is 32 bits and wraps around with no error when it overflows.",
    fix: "Use long (64-bit) for larger values, or Math.addExact() to throw an exception on overflow. For arbitrary precision, use BigInteger."
  }
];


// ===== RENDERING =====
// Builds the page from the TRAPS array defined above.

const nav = document.getElementById("nav");         // sidebar container
const content = document.getElementById("content"); // main area container

// Helper: creates an element in one line
function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

// Builds one code panel
function codeBox(lang, label, code, output) {
  const box = el("div", "code-box " + lang);
  box.appendChild(el("h3", "", label));

  const wrap = el("div", "code-wrap");
  const pre = el("pre");
  const c = el("code", "", code);
  pre.appendChild(c);
  wrap.appendChild(pre);

  // Copy button
  const btn = el("button", "copy", "Copy");
  wrap.appendChild(btn);
  box.appendChild(wrap);

  const out = el("div", "output");
  out.appendChild(document.createTextNode("Output: "));
  // Replace newlines with " | " so multi-line output fits on one line
  out.appendChild(el("code", "", output.replace(/\n/g, "  |  ")));
  box.appendChild(out);

  return box;
}

// Runs once per trap
TRAPS.forEach((t, i) => {

  // Sidebar link that jumps to this trap's card
  const link = el("a", "", (i + 1) + ". " + t.title);
  link.href = "#" + t.id;
  nav.appendChild(link);

  // The trap card. Its id is what the sidebar link jumps to.
  const s = el("section", "trap");
  s.id = t.id;

  s.appendChild(el("span", "tag", t.category));
  s.appendChild(el("h2", "", (i + 1) + ". " + t.title));

  const m = el("div", "misconception");
  m.appendChild(el("strong", "", "Misconception: "));
  m.appendChild(document.createTextNode(t.misconception));
  s.appendChild(m);

  const cmp = el("div", "compare");
  cmp.appendChild(codeBox("py", "Python (python3 main.py)", t.python, t.pythonOut));
  cmp.appendChild(codeBox("java", "Java (java Main.java)", t.java, t.javaOut));
  s.appendChild(cmp);

  s.appendChild(el("p", "", "Why it happens: " + t.why));

  const fix = el("div", "fix");
  fix.appendChild(el("strong", "", "Fix: "));
  fix.appendChild(document.createTextNode(t.fix));
  s.appendChild(fix);

  content.appendChild(s);
});

// ===== Highlight the current section in the sidebar while scrolling =====
const links = [...nav.querySelectorAll("a")];

// IntersectionObserver runs our function whenever a watched card enters or leaves the screen
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        links.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id)
        );
      }
    });
  },
  // Only count a card as "visible" when it's near the top of the screen,
  { rootMargin: "-20% 0px -70% 0px" }
);

document.querySelectorAll(".trap").forEach((s) => io.observe(s));