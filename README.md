## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

<!-- *ans -->

getElementById selects a single element by its ID. It is the fastest method and returns the element directly.

getElementsByClassName selects elements by their class name. It returns an HTMLCollection (array-like object), even if there is only one element.

querySelector / querySelectorAll use CSS selectors to select elements. querySelector returns the first matching element, while querySelectorAll returns a NodeList of all matching elements.

### 2. How do you create and insert a new element into the DOM?

<!-- *ans -->

Create an element using createElement():

> > > const p = document.createElement("p");

Add content to the element:

> > > p.innerText = "Hello World!";

Insert the element into the DOM using appendChild():

> > > document.body.appendChild(p);

### 3. What is Event Bubbling? And how does it work?

<!-- *ans -->

Event Bubbling is when an event triggered on a child element first executes on that element, then propagates upward to its parent, grandparent, and so on through the DOM tree.

Example: Clicking a button inside a div triggers both the button's click event and the div's click event.

### 4. What is Event Delegation in JavaScript? Why is it useful?

<!-- *ans -->

Event Delegation is a technique where you add a single event listener to a parent element and use it to handle events on its child elements. it reduces the number of event listeners and improves performance and keeps code cleaner

### 5. What is the difference between preventDefault() and stopPropagation() methods?

<!-- *ans -->

preventDefault() Stops the default behavior of an element. stopPropagation() Stops event from bubbling upward..
