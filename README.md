# Wordscope
 Graphic text creator
 
#### Features:

This is my first Project working with **P5, Vanilla Javascript, HTML, CSS** and **SCSS**.

This is a rich text editor that provides real-time visualization of input in the form of a starfield.
This starfield has been mapped to be dynamically generated for each possible word in a 2D grid, creating specific coordinates for each word written.
Several features inside the P5 sketch create a Perlin Noise based movement to each dot, as well as a specific size to each dot(star) in the firmament depending on the word usage (how many times it is repeated).

You can enter the github page by going into the repository into the pages section or through this link:
[GitHub Page Wordscope](https://mrgoodkato.github.io/Wordscope/)


### Interactivity:
**Navigation:** 
-	You can navigate the field by dragging the mouse, there is a mock-parallax movement of each star depending on its size relative to the other stars in the firmament. 
-	You can zoom in by using the mouse wheel.
-	When zoomed in you can navigate by just moving the mouse in that region.

**Display:**
-	By clicking close to a star, you can see the word that star represents, as well as how many times it has been repeated.
Color Themes:
-	You can select your color theme either by going to the footer modal menu and selecting from the available color palettes, this will change the color of the UI and also of the dots and background in the P5 sketch.
-	You can also manually select the color of the stars and the background by clicking on the modal menu (arrow down icon) at the top of the screen.

**Grid:** 
-	You can turn on or off the grid in the modal header menu too (arrow down icon).

**Rich Text Editor:**
-	The text icon (yellow button at the top) will display the text editor, it has all the functionality of a mock-rich text editor. You can change to Bold, Italics, Underline.
-	You can also select the alignment and font-size (Its still in development as it is working a little buggy at the moment).
-	You can select the text color as well.

**Foot notes:**
This is my first full project using P5, vanilla JS and HTML (CSS, SASS). It is intended both as an exercise to learn and also as something I’m really passionate about (writing).
The idea behind this project is to provide any writers the possibility to have a visual tool to write, that generates attractive and interesting visual features with each word typed.
This is still in development and I’m currently working on refactoring all the code to be modular and more efficient and maintainable. Its been quite a ride.

Sorry if the documentation is not yet standardized, I’ll work on that soon too 😊 Thank you for reading, and enjoy!
