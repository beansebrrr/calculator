# Calculator

An Odin Project project

This is a calculator app written with HTML, CSS, and JavaScript! It includes all the most basic operations you'd find in a calculator (except, maybe percentage) and looks quite good if I do say so myself.

**UPDATE: I made percentages work now :0** 

## How it works

1. You can enter your math expressions by either using the on-screen buttons or typing with the keyboard.
2. Upon hitting `=`, display's contents will be put into the `evaluate()` function.
3. `evaluate()` will organize the numbers and operators into arrays.
4. If a number is detected to have a percent (%) symbol at the end, the program will convert the number into a decimal format.
5. The expression will then be `operate`-d on from left-to-right (that's right, no PEMDAS).
6. The output will be rendered onto the display (amazing).