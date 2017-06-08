var mainElement = document.getElementById('main')
if (mainElement) {
  var game = Life(mainElement)

  // Connect #step_btn to the step function
  document.getElementById('step_btn')
    .addEventListener('click', game.step)

  // TODO: Connect other buttons.
}

function Life(container, width=12, height=12) {
  // Create boards for the present and future.
  // Game boards are somewhat expensive to create, so we're going
  // to be reusing them. Each time we step the game, `future`
  // becomes `present` and vice versa.
  var present = new Board(width, height);
  var future = new Board(width, height);

  // Create a <table> to hold our cells.
  var table = createTable();
  
  // Put the table in our container
  container.appendChild(table);

  // Add a mouse down listener to our table
  table.addEventListener('mousedown', toggleCellFromEvent)

  function createTable() {
    // create <table> element
    var table = document.createElement('table');       // <table
    table.classList.add('board')                       //   class='board'>
    for (var r = 0; r < height; r++) {
      var tr = document.createElement('tr');           //   <tr>
      for (var c = 0; c < width; c++) {                //     For instance, at r=2, c=3:
        var td = document.createElement('td');         //     <td
        td.id = `${r}-${c}`                            //       id="2-3">
        // We'll put the coordinate on the cell
        // Element itself, letting us fetch it
        // in a click listener later.
        td.coord = [r, c];        
        tr.appendChild(td);                            //     </td>
      }
      table.appendChild(tr);                           //   </tr>
    }                                                  //  </table>
    return table    
  }
  
  function toggleCellFromEvent(event) {
    // FIXME: This currently always toggles cell (0, 0).
    // How do we get the coordinate of the cell that was clicked on?
    // HINT: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
    var cell = document.getElementById('0-0'); // ⬅️ Fix me
    present.toggle(cell.coord)
    paint()
  }

  function paint() {
    // TODO:
    //   1. For each <td> in the table:
    //     a. If its cell is alive, give the <td> the `alive` CSS class.
    //     b. Otherwise, remove the `alive` class.
    //
    // To find all the <td>s in the table, you might query the DOM for them, or you
    // could choose to collect them when we create them in createTable.
    //
    // HINT:
    //   https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    //   https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
  }

  function step() {
    // Hello, destructuring assignment:
    //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    [present, future] = tick(present, future)  // tick is from board.js
    
    // Paint the new present
    paint()
  }

  function play() {
    // TODO:
    // Start playing by running the `step` function    
    // automatically repeatedly every fixed time interval
    
    // HINT:
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
  }

  function stop() {
    // TODO: Stop autoplay.
    // HINT:
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval
  }

  function togglePlaying() {
    // TODO: If we're playing, stop. Otherwise, start playing.
  }

  function clear() {
    // TODO: Clear the board
  }

  function random() {
    // TODO: Randomize the board
  }

  return {play, step, stop, togglePlaying, random, clear}
};
