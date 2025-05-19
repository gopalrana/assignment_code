const tubes = [
  ["red", "green", "green", "red"],
  ["blue", "blue", "green", "green"],
  ["red", "red", "blue", "blue"],
  []
];

const MAX_HEIGHT = 4;
const visited = new Set();
const solution = [];

function isSolved(tubes) {
  return tubes.every(tube =>
    tube.length === 0 || (tube.length === MAX_HEIGHT && tube.every(ball => ball === tube[0]))
  );
}

function countTopBalls(tube) {
  if (tube.length === 0) return 0;
  let topColor = tube[tube.length - 1];
  let count = 1;
  for (let i = tube.length - 2; i >= 0; i--) {
    if (tube[i] === topColor) count++;
    else break;
  }
  return count;
}

function canMove(from, to, tubes) {
  const fromTube = tubes[from];
  const toTube = tubes[to];

  if (fromTube.length === 0) return false;
  if (toTube.length === MAX_HEIGHT) return false;

  const topColor = fromTube[fromTube.length - 1];
  let count = countTopBalls(fromTube);

  if (toTube.length + count > MAX_HEIGHT) return false;
  if (toTube.length === 0) return true;

  return toTube[toTube.length - 1] === topColor;
}

function doMove(from, to, tubes) {
  const newTubes = tubes.map(tube => [...tube]);
  const fromTube = newTubes[from];
  let count = countTopBalls(fromTube);

  for (let i = 0; i < count; i++) {
    newTubes[to].push(fromTube.pop());
  }
  return newTubes;
}

function tubesToString(tubes) {
  return JSON.stringify(tubes);
}

function dfs(tubes) {
  const state = tubesToString(tubes);
  if (visited.has(state)) return false;
  visited.add(state);

  if (isSolved(tubes)) return true;

  for (let from = 0; from < tubes.length; from++) {
    for (let to = 0; to < tubes.length; to++) {
      if (from === to) continue;
      if (canMove(from, to, tubes)) {
        const newTubes = doMove(from, to, tubes);
        solution.push({ from, to });
        if (dfs(newTubes)) return true;
        solution.pop();
      }
    }
  }

  return false;
}

if (dfs(tubes)) {
  console.log("Solution found! Steps:");
  solution.forEach((move, i) => {
    console.log(`${i + 1}. Move from Tube ${move.from + 1} to Tube ${move.to + 1}`);
  });
} else {
  console.log("No solution found.");
}
