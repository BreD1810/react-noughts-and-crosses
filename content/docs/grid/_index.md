---
weight: 2
bookFlatSection: false
title: "2. Creating the Board"
---

# Creating the Board

In this section, we will create the Noughts and Crosses board.
This is a 3x3 grid where the player can place an 'O' or an 'X'.
Currently, you will see one square filled with an 'X':

![Square on the page](/react-noughts-and-crosses/board/square.png)

Inside `App.js`, you will see:

```react
export default function Square() {
  return <button className="square">X</button>;
}
```

`Square` is known as a *component* - a piece of reusable code that renders part of the webpage.

Anything returned from the `Square` function is rendered on the page.

`<button>` displays a button the page.
`<button>` is a JSX element, which is a combination of JavaScript code and HTML tags that describes what we want to diplay.

The button has the text 'X'.
It also uses the class `square`, passed with the property `className`.
{{<hint info>}}
**Note:**
You can view the CSS styling for the `square` class in `src/styles.css`.
{{</hint>}}

## Adding More Squares

A Noughts and crosses board is a 3x3 grid, so you need 9 squares!
Let's add more buttons:

{{<highlight react "linenos=false,hl_lines=2-6">}}
export default function Square() {
  return (
    <button className="square">X</button>
    <button className="square">X</button>
    ...
  );
}
{{</highlight>}}

You will notice that you will get an error:

{{<hint danger>}}
```
/src/App.js: Adjacent JSX elements must be wrapped in an enclosing tag.
Did you want a JSX fragment <>...</>?
```
{{</hint>}}

This is because a react component can only return a **single** JSX element, and we have multiple JSX buttons.
To fix this, you can use a *fragment* (`<>` and `</>`) around multiple elements:
 
{{<highlight react "linenos=false,hl_lines=3-7">}}
export default function Square() {
  return (
    <>
      <button className="square">X</button>;
      <button className="square">X</button>;
      ...
    </>
  );
}
{{</highlight>}}

Now you will see all the squares in a line:
![Line of 9 squares](/react-noughts-and-crosses/board/nine-squares.png)

Let's now make this a 3x3 grid.
We can do this by placing 3 buttons into a `div`, and using the `board-row` class in `styles.css`: 

{{<highlight react "linenos=false,hl_lines=4-18">}}
export default function Square() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
{{</highlight>}}

![3x3 grid displaying the numbers 1 to 9](/react-noughts-and-crosses/board/3x3.png)

Great!
However, our component is called `Square`, but that's no longer what it represents.
Let's rename this component to `Board`.

{{<highlight react "linenos=false,hl_lines=1">}}
export default function Board() {
  ...
}
{{</highlight>}}

## Using Multiple Components

We mentioned before that a component in react is a *reusable* piece of code.
Looking at our code now, each button (square in the grid) is very similar - the only thing that changes is the number!
It now makes sense to make each square its own react component.

{{<hint info>}}
**Note:**
1. It is best practice to use one file for each component.
2. Your component names **must** start with a capital letter.
{{</hint>}}

Let's create `src/Square.js`:

```react
export default function Square() {
  return <button className="square">1</button>;
}
```

and replace the `button`s in `src/App.js` with our new `Square` component:

{{<highlight react "linenos=false,hl_lines=1 7-9 12-14 17-19">}}
import Square from "./Square";

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
{{</highlight>}}

{{<hint info>}}
**Note:**
In JSX, you don't need a closing tag like in HTML!
You can simply end the tag with `/`.
{{</hint>}}


We now have our grid filled with `1`s.
This is because it's the only value in our `Square` component.

![3x3 grid filled with 1s](/react-noughts-and-crosses/board/9-1s.png)

To fix this, we can give our `Square` component *props* (short for *properties*).
A prop is a value that we can pass from one component to another - like a parameter in a function.

{{<mermaid>}}
flowchart LR
    Board-->|props|Square
{{</mermaid>}}

Let's add a prop called `value` to change what each square displays:

{{<highlight react "linenos=false,hl_lines=1">}}
export default function Square({ value }) {
  return <button className="square">1</button>;
}
{{</highlight>}}

We can then use the prop in our JSX.
{{<highlight react "linenos=false,hl_lines=2">}}
export default function Square({ value }) {
  return <button className="square">{value}</button>;
}
{{</highlight>}}

{{<hint info>}}
**Note:**
We have to use curly braces around `value` in JSX to "escape to Javascript".
Without them, we would just see "value" displayed in every square on the page.
{{</hint>}}

You should now see an empty grid:

![Empty board](/react-noughts-and-crosses/board/empty-board.png)

This is because we never use pass a `value` prop to our `Square` component - there is nothing to display!

Let's now update `Board` to pass a `value`:

{{<highlight react "linenos=false,hl_lines=1 5-7 10-12 15-17">}}
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
{{</highlight>}}

![3x3 grid displaying the numbers 1 to 9](/react-noughts-and-crosses/board/3x3.png)

You can browse the final code [here](https://github.com/BreD1810/react-noughts-and-crosses/tree/034bb629504a5296cbd21c2e8455d5ee8e9d61a0).
It should look like this:

{{<highlight react "linenos=false">}}
// src/Square.js
export default function Square({ value }) {
  return <button className="square">{value}</button>;
}
{{</highlight>}}

{{<highlight react "linenos=false">}}
// src/App.js
import Square from "./Square";

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
{{</highlight>}}

Now let's make our board interactive!

