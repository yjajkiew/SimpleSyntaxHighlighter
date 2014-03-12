Simple Syntax Highlighter
=========================

This is a code syntax highlighter developed as part of a school project at ISTIA, an engineering school in Angers (France).

You can check out the demo here:

> http://yjajkiew.github.io/SimpleSyntaxHighlighter
  
What it does
=========

The principle is simple: it **formats** and **colors** your *code*, according to the *language* you select.

To go further, we created a few **themes** so you can *visualize* your code in different color styles.

The program is **flexible**: you can add a programming language by simply creating a js file and adapting the program `script.js`. You can take a look at the files `lang-javascript.js` to understand what to describe about the language. 

Technologies used
========

This project uses mainly **JavaScript** with **HTML** and **CSS**. **JQuery 1.11.0** has also been used to develop the project faster.

The main program is contained in `script.js`. 

The supported languages are contained in the files `lang-*****.js`

The themes are the css files `style-*****.css`.

The other HTML and CSS files are here to show how to use the program and how to adapt it to your needs. Do not hesitate to look at the demo to understands what it does for the user. You'll find in `tests.txt` some examples of code your can insert in the demo page.

Team
================

- [Baptiste Gauduchon](http://www.baptistegauduchon.fr)
- [Victor Durand] (http://www.doyoubuzz.com/victor-durand)
- [Yann Jajkiewicz](http://yann.me)


TO DO
====================

The development of this project is not done yet and has been temporarily suspended. Here's a list of what we want to finish:

 Task          | State 
 ------------- | ------------- 
 Allow users to choose between "format" and "color" (or both) | to do    
 Display number of lines next to the code | in progress
 Fix Bug #1 | to do
 Fix Bug #2 | to do

Bugs
===========

Here's a list of bugs we have encountered:

 Number | Description
 -------|-------------
 #1     | Comments begin by `//` and finish by `\n`, problem detecting the carriage return
 #2     | Problem detecting `<?`, `<?php`, `?>` for the PHP language
 