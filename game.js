var mainElement = document.getElementById('main');
if (mainElement) {
  var game = Life(mainElement);

  document.getElementById('step_btn')
    .addEventListener('click', () => game.step());

  document.getElementById('clear_btn')
    .addEventListener('click', game.clear);

  document.getElementById('play_btn')
    .addEventListener('click', game.togglePlaying);

  document.getElementById('reset_btn')
    .addEventListener('click', game.random);
}

function Life(container, width = 12, height = 12) {
  var present = new Board(width, height);
  var future = new Board(width, height);

  const cells = [];
  var table = createTable();

  container.appendChild(table);
  table.addEventListener('mousedown', toggleCellFromEvent);

  function createTable() {
    var table = document.createElement('table');       // <table
    table.classList.add('board');                       //   class='board'>
    for (var r = 0; r < height; r++) {
      var tr = document.createElement('tr');           //   <tr>
      for (var c = 0; c < width; c++) {                //     For instance, at r=2, c=3:
        var td = document.createElement('td');         //     <td
        td.id = `${r}-${c}`;                            //       id="2-3">
        td.coord = [r, c];
        tr.appendChild(td);
        cells.push(td);                            //     </td>
      }
      table.appendChild(tr);                           //   </tr>
    }                                                  //  </table>
    return table;
  }

  function toggleCellFromEvent(event) {
    present.toggle(event.target.coord);
    paint();
  }

  function paint() {
    let i = cells.length; while (--i >= 0) {
      const td = cells[i]
      if (present.get(td.coord))
        td.classList.add('alive')
      else
        td.classList.remove('alive')
    }
  }

  function step(rules) {
    [present, future, state] = tick(present, future, rules);
    paint();
    if (state) {
      stop()
    }
  }

  let interval = null;
  function play() {
    interval = setInterval(step, 113);
  }

  function stop() {
    clearInterval(interval);
    interval = null;
  }

  function togglePlaying() {
    interval ? stop() : play();
  }

  function clear() {
    step(() => 0);
  }

  function random() {
    step(() => Math.round(Math.random()));
  }

  return { play, step, stop, togglePlaying, random, clear };
}
