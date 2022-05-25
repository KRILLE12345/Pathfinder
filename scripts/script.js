let items = document.querySelectorAll(".item")

console.log(items.length)
for(let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
        console.log(i)
    })
}

let generate = document.querySelector("#generate")

generate.addEventListener("click", function() {
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value
    let container = document.getElementById("container")
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`

    let toAppend = ``;
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {

            // toAppend += `<div class = item>${i + " " + j}</div>`
            toAppend += `<div class = item></div>`
        }
    }
    container.innerHTML = toAppend;
})
