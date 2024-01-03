const startingColor = document.querySelector('#start-color');
const endingColor = document.querySelector('#end-color');
const genBtn = document.querySelector('#gen-btn');
const range = document.querySelector('#num-colors');

function generateGradient(startingColor, endingColor, numSteps) {
    let gradient = [];
    let start = hex2rgb(startingColor);
    let end = hex2rgb(endingColor);
    gradient.push(start);
    for (let i = 1; i < numSteps; i++) {
        let weight = i / (numSteps - 1); // Adjusted weight calculation
        gradient.push(getNewColor(start, end, weight));
    }
    for (let i = 0; i < gradient.length; i++) {
        console.log(gradient[i]);
    }
    gradient.push(end);
    displayColors(gradient);
}

function displayColors(gradient) {
    const existingContainer = document.querySelector('#color-btn-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    const container = document.createElement('div');
    container.id = 'color-btn-container';
    container.style.justifyContent = 'center';
    container.style.marginBottom = '40px';

    for(let i = 0; i < gradient.length-1; i++) {
        let r = gradient[i][0]; let g = gradient[i][1]; let b = gradient[i][2];
        let hex = rgb2hex(gradient[i]);
        const card = document.createElement('button');
        card.className = 'color-btn';
        card.id = 'color-btn';
        card.textContent = `${hex}`;
        card.style.margin = '5px';
        card.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        if(r + g + b < 512) {
            card.style.color = "white";
        } else {
            card.style.color = "black";
        }
        container.appendChild(card);
    }

    container.addEventListener('click', function(event) {
        if (event.target.classList.contains('color-btn')) {
            const hexColor = event.target.textContent; // Get the text content containing the hex value
            navigator.clipboard.writeText(hexColor);
            alert("color copied to clipboard!");
        }
    });

    document.body.appendChild(container);
}

function getNewColor(start, end, weight) {
    let newColor = [];
    newColor.push(Math.round(start[0] + (end[0] - start[0]) * weight));
    newColor.push(Math.round(start[1] + (end[1] - start[1]) * weight));
    newColor.push(Math.round(start[2] + (end[2] - start[2]) * weight));
    return newColor;
}

function hex2rgb(color) {
    const hex = color.slice(1);
    let rgb = [];
    for(let i = 0; i <= 4; i = i+2) {
        rgb.push(parseInt((hex.slice(i, i+2)), 16));
    }
    return rgb;
}

function rgb2hex(color) {
    return "#" + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1).toUpperCase();
}

function validInput(input) {
    if(input.value < 3) {
        input.value = 3;
    }
}

genBtn.addEventListener('click', () => {
    console.clear();
    generateGradient(startingColor.value, endingColor.value, range.value);
});

