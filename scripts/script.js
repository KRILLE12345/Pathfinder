let generate = document.querySelector("#generate")
var grid = []
var startX = 0, startY = 0, startPos = 0

generate.addEventListener("click", function() {
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value
    console.log(rows)
    let container = document.getElementById("container")
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`

    let toAppend = ``
    gridSize = rows

    for(let i = 0; i < rows; i++) {
        grid[i] = []
        for(let j = 0; j < columns; j++) {
            grid[i][j] = 'Empty'
            if(i == 0 && j == 0) {
                toAppend += `<div class = "item start"></div>`
            } else if(i == rows-1 && j == columns-1) {
                toAppend += `<div class = "item end"></div>`
            } else {
                toAppend += `<div class = "item"></div>`
            }
        }
    }
    grid[0][0] = "Start"
    grid[rows-1][columns-1] = "Goal"
    container.innerHTML = toAppend;
    let items = document.querySelectorAll(".item")
    let newStart = false, newEnd = false

    for(let i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function() {
            let x = Math.ceil((i+1)/rows)
            let y = (i+1)-((x-1)*columns)

            if(newStart) {
                grid[x-1][y-1] = "Start"
                startX = x-1
                startY = y-1
                startPos = i
                newStart = false
                items[i].classList.add("start")
                items[i].style.background = "green"
            } else if(newEnd) {
                grid[x-1][y-1] = "Goal"
                newEnd = false
                items[i].classList.add("end")
                items[i].style.background = "red"
            } else {
               if(items[i].classList.contains("start")) {
                    grid[x-1][y-1] = "Empty"
                    newStart = true
                    items[i].classList.remove("start")
                    items[i].style.background = "#cccccc"
                } else if(items[i].classList.contains("end")) {
                    grid[x-1][y-1] = "Empty"
                    newEnd = true
                    items[i].classList.remove("end")
                    items[i].style.background = "#cccccc"
                } else if(grid[x-1][y-1] == "Obstacle") {
                    grid[x-1][y-1] = "Empty"
                    items[i].style.background = "#cccccc"
                } else {
                    grid[x-1][y-1] = "Obstacle"
                    items[i].style.background = "black"
                }
            }
        })  
    }
})


var findShortestPath = function(startCoordinates, grid) {
  var distanceFromTop = startCoordinates[0];
  var distanceFromLeft = startCoordinates[1];

  var location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
  };

  var queue = [location];

  while (queue.length > 0) {
        var currentLocation = queue.shift();
        var directions = ["North", "East", "South", "West"];

        for(dir in directions){
            var newLocation = exploreInDirection(currentLocation, directions[dir], grid);
            if (newLocation.status === 'Goal') { return newLocation.path } 
            else if (newLocation.status === 'Valid') { queue.push(newLocation) }
        }
    }
    
    return false;
};


var locationStatus = function(location, grid) {
    var gridSize = grid.length;
    var dft = location.distanceFromTop;
    var dfl = location.distanceFromLeft;

    if (location.distanceFromLeft < 0 ||
        location.distanceFromLeft >= gridSize ||
        location.distanceFromTop < 0 ||
        location.distanceFromTop >= gridSize) {

        return 'Invalid';
    } else if (grid[dft][dfl] === 'Goal') {
        return 'Goal';
    } else if (grid[dft][dfl] !== 'Empty') {
        return 'Blocked';
    } else {
        return 'Valid';
    }
};

var exploreInDirection = function(currentLocation, direction, grid) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'North') {
    dft -= 1;
  } else if (direction === 'East') {
    dfl += 1;
  } else if (direction === 'South') {
    dft += 1;
  } else if (direction === 'West') {
    dfl -= 1;
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  }

  newLocation.status = locationStatus(newLocation, grid);

  if (newLocation.status === 'Valid') {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
};

let searchButton = document.querySelector("#search")

searchButton.addEventListener("click", function() {
    let dir = findShortestPath([startX, startY], grid)
    let columns = parseInt(document.getElementById("columns").value)

    let position = startPos;
    for(let i = 0; i < dir.length-1; i++) {
        // let totalItems = column + rows

        switch(dir[i]) {
            case("East"): 
                position += 1
            break;
            case("West"):
                position -= 1
            break;
            case("North"): 
                position -= columns
            break;
            case("South"):
                position += columns
            break;
        }

        document.querySelectorAll(".item")[position].style.background = "#4E92D5"        
    }

})
