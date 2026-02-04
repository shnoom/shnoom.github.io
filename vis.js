const svgNS = "http://www.w3.org/2000/svg";

// Global Tooltip Setup
const tooltip = document.createElement('div');
tooltip.id = 'tooltip';
document.body.appendChild(tooltip);

const cityData = [
  {name:"United States",value:74.2},
    { name:"China",value:53.1},
    {name:"Russia",value:23.1},
    {name:"Germany",value:15.2},
    {name:"France",value:12.9},

];

function drawBarChart() {
    const container = document.getElementById('cat-chart-container');
    const width = 600;
    const height = 300;
    const padding = 40;

    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    
    cityData.forEach((d, i) => {
        const barWidth = 60;
        const spacing = 100;
        const maxBarHeight = height - (padding);
        const barHeight = (d.value /80) * maxBarHeight;
        
        const x = padding + (i * spacing);
        const y = height - padding - barHeight;

        // Create Rectangle
        const rect = document.createElementNS(svgNS, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", barWidth);
        rect.setAttribute("height", barHeight);
        rect.setAttribute("class", "bar"); 

        // Tooltip Interaction Logic
        rect.addEventListener('mousemove', (e) => {
            tooltip.style.opacity = '1';
            tooltip.innerHTML = `<strong>${d.name}</strong><br>${d.value}M cats`;
            tooltip.style.left = e.pageX + 10+ 'px';
            tooltip.style.top = e.pageY - 40 + 'px';
        });

        rect.addEventListener('mouseout', () => {
            tooltip.style.opacity = '0';
        });

        // Add City Label
        const label = document.createElementNS(svgNS, "text");
        label.setAttribute("x", x + (barWidth / 2));
        label.setAttribute("y", height - 15);
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("class", "label");
        label.textContent = d.name;

        svg.appendChild(rect);
        svg.appendChild(label);
    });

    container.appendChild(svg);
}

function generateArt() {
    const container = document.getElementById('art-container');
    container.innerHTML = '';
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 400 400");

    for (let i = 0; i < 50; i++) {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", 200);
        line.setAttribute("y1", 200);
        line.setAttribute("x2", Math.random() * 400);
        line.setAttribute("y2", Math.random() * 400);
    
        const colorClass = i % 2 === 0 ? "line-pink" : "line-dark";
        line.setAttribute("class", `generative-line ${colorClass}`);
        
        svg.appendChild(line);
    }
    container.appendChild(svg);
}

window.onload = () => {
    drawBarChart();
    generateArt();
};