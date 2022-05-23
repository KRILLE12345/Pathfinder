let items = document.querySelectorAll(".item")

console.log(items.length)
for(let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {
        console.log(i)
    })
}