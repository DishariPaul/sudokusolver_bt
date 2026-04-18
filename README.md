# 🧩 Sudoku Solver Visualizer
A web-based Sudoku Solver built using **Backtracking Algorithm** with real-time visualization.
This project demonstrates how recursion and backtracking work step-by-step to solve a Sudoku puzzle.
---
## 🚀 Features
* 🔢 Interactive 9×9 Sudoku grid
* ✅ Input validation (only numbers 1–9 allowed)
* 🧠 Backtracking algorithm implementation
* 🎬 Step-by-step solving animation
* 🎨 Visual highlights:
  * Blue → Trying a number
  * Red → Backtracking
* 🟨 User input cells highlighted separately
* 🎉 Success banner on completion
* 🔊 Sound feedback after solving
* 🧹 Clear grid functionality
* 🚫 Buttons disabled during solving (better UX)
---
## 🧠 Algorithm Used --> Backtracking
The solver uses a recursive backtracking approach:
1. Find an empty cell
2. Try numbers from 1 to 9
3. Check if the number is valid:
   * Not in the same row
   * Not in the same column
   * Not in the same 3×3 box
4. If valid:
   * Place the number
   * Recursively solve the rest of the grid
5. If it leads to a dead end:
   * Remove the number (backtrack)
   * Try the next number
---
## 🛠️ Technologies Used
* HTML
* CSS
* JavaScript (Vanilla JS)
---
## 🎯 How to Run
1. Download or clone the repository
2. Open `index.html` in your browser
3. Enter a valid Sudoku puzzle
4. Click **Solve**
5. Watch the algorithm solve it step-by-step!
---
## 📸 Project Highlights
* Real-time visualization of recursion
* Clean blue-themed UI
* Interactive and beginner-friendly design
---
## 📚 Learning Outcomes
* Understanding of Backtracking Algorithm
* Recursion and problem-solving techniques
* DOM manipulation in JavaScript
* Async/await for animation control
* UI/UX improvements for better user experience
---
## ⚠️ Limitations
* Works only for standard 9×9 Sudoku
* Performance may slow down for very complex puzzles due to visualization delay
---
## 🌟 Future Improvements
* ⏱ Speed control slider
* 🎲 Random Sudoku generator
* 🟨 Highlight current row & column
* 📱 Mobile responsiveness
* 🧠 Multiple solving strategies
---
## 👩‍💻 Author
Developed as part of a **Design and Analysis of Algorithms (DAA)** project.
---
## 💙 Acknowledgement
This project was built to demonstrate how algorithms can be visualized in an intuitive and interactive way.
---
