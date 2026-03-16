const width = 800;
const height = 500;

const svg = d3.select("#canvas");

let shapes = [];


svg.on("click", function(event){

    const [x,y] = d3.pointer(event);

    shapes.push({
        x:x,
        y:y
    });

    drawShapes();
});

function drawShapes(){

    const circles = svg.selectAll("circle")
        .data(shapes);

    circles.enter()
        .append("circle")
        .attr("r",20)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("fill","steelblue");

    circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
}



svg.on("mousemove", function(event){

    const [mx,my] = d3.pointer(event);

    shapes.forEach(d => {

        const dx = d.x - mx;
        const dy = d.y - my;

        const distance = Math.sqrt(dx*dx + dy*dy);

        const repelDistance = 80;

        if(distance < repelDistance){

            const force = (repelDistance - distance)/repelDistance;

            d.x += dx * force * 0.75;
            d.y += dy * force * 0.75;

            // keep shapes inside canvas
            d.x = Math.max(20, Math.min(width-20, d.x));
            d.y = Math.max(20, Math.min(height-20, d.y));
        }

    });

    svg.selectAll("circle")
        .transition()
        .duration(50)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

});
document.getElementById("buttonClear").addEventListener("click", function(){

    // clear shapes array
    shapes = [];

    // remove all circles from svg
    d3.select("#canvas").selectAll("*").remove();

});