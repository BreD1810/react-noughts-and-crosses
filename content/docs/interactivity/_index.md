---
weight: 3
bookFlatSection: false
title: "3. Making the Board Interactive"
---

# Making the Board Interactive

We are now going to let the user place an 'X' into the grid.

## Handling Clicks

Our `Square` component uses a JSX `button`, which has a `onClick` property that we can use.
`onClick` requires a function to call.

Let's create a function for when `Square` is clicked:

{{<highlight react "linenos=false,hl_lines=2-4 7">}}
export default function Square({ value }) {
  function handleClick() {
    console.log('clicked!');
  }

  return (
    <button className="square" onClick={handleClick} >
      {value}
    </button>
  );
}
{{</highlight>}}

When you click one of the squares, you should see `clicked!` in the console.

Now we want the page to remember which squares have been clicked by filling them with an 'X'.
To remember things, our components use *state*.
React gives us a special function called `useState` to let our component remember things.

We can now set the value of our `Square` using state rather than a prop: 

{{<highlight react "linenos=false,hl_lines=1 3-4 7">}}
import { useState } from 'react';

export default function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
{{</highlight>}}

We call `useState` with the parameter `null`.
This means that we want the initial (default) of `value` to be nothing.

`useState` returns 2 variables:
1. **`value`** - the variable value of we want to use as the button text.
2. **`setValue`** - a function we can use to update `value` variable. We use `setValue` to update what `Square` displays when its clicked.

When you call a `set` function, react will **re-render** the `Square` and update its value.

As `Square` no longer accepts a prop, we can remove the `value` prop from all of the `Squares` in `src/App.js`:

{{<highlight react "linenos=false,hl_lines=5-7 10-12 15-17">}}
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

You should now be able to place an 'X' in each of the squares:

![Clicking a square adds an X](/react-noughts-and-crosses/interactivity/clicking.gif)

You can browse the final code [here](https://github.com/BreD1810/react-noughts-and-crosses/tree/ffaf96b4c0bd891aa1f2b10457214821151cbde9).
