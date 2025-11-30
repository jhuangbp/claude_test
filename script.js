// Debug logging function
function debugLog(message, data = null) {
    console.log(`[DEBUG] ${message}`, data ? data : '');
}

document.addEventListener('DOMContentLoaded', () => {
    debugLog('DOM Content Loaded');
    
    const pizzaSizeInput   = document.getElementById('pizza-size');
    const peopleCountInput = document.getElementById('people-count');
    const calculateBtn     = document.getElementById('calculate-btn');
    const pizzaCanvas      = document.getElementById('pizza-canvas');
    const instructionsDiv  = document.getElementById('instructions');
    const patternSelect    = document.getElementById('pattern-select');
  
    // Debug check if elements exist
    debugLog('Element Check:', {
        pizzaSizeInput: !!pizzaSizeInput,
        peopleCountInput: !!peopleCountInput,
        calculateBtn: !!calculateBtn,
        pizzaCanvas: !!pizzaCanvas,
        instructionsDiv: !!instructionsDiv,
        patternSelect: !!patternSelect
    });
  
    if (!pizzaCanvas) {
        console.error('Pizza canvas element not found!');
        return;
    }
  
    const ctx = pizzaCanvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context!');
        return;
    }
  
    function resizeCanvas() {
      debugLog('Resizing canvas');
      const container = pizzaCanvas.parentElement;
      const size = Math.min(container.clientWidth, container.clientHeight);
      pizzaCanvas.width  = size;
      pizzaCanvas.height = size;
      debugLog('Canvas size set to:', { width: size, height: size });
    }
  
    function drawPizzaBase() {
      debugLog('Drawing pizza base');
      const centerX = pizzaCanvas.width  / 2;
      const centerY = pizzaCanvas.height / 2;
      const radius  = Math.min(centerX, centerY) - 10;
  
      ctx.clearRect(0, 0, pizzaCanvas.width, pizzaCanvas.height);
  
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle   = '#FFE66D';
      ctx.fill();
      ctx.strokeStyle = '#FFB347';
      ctx.lineWidth   = 10;
      ctx.stroke();
  
      for (let i = 0; i < 44; i++) {
        const angle    = Math.random() * Math.PI * 2;
        const distance = Math.random() * (radius - 22);
        const x        = centerX + Math.cos(angle) * distance;
        const y        = centerY + Math.sin(angle) * distance;
  
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6B6B';
        ctx.fill();
      }
    }
  
    function drawCrissCrossSlices(numSlices) {
      const centerX = pizzaCanvas.width / 2;
      const centerY = pizzaCanvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      const gridSize = Math.ceil(Math.sqrt(numSlices));
  
      for (let i = 1; i < gridSize; i++) {
        const x = centerX - radius + (2 * radius * i) / gridSize;
        ctx.beginPath();
        ctx.moveTo(x, centerY - radius);
        ctx.lineTo(x, centerY + radius);
        ctx.strokeStyle = '#2D3436';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      for (let i = 1; i < gridSize; i++) {
        const y = centerY - radius + (2 * radius * i) / gridSize;
        ctx.beginPath();
        ctx.moveTo(centerX - radius, y);
        ctx.lineTo(centerX + radius, y);
        ctx.strokeStyle = '#2D3436';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      return true;
    }
  
    function drawChordSlices(numSlices) {
      const centerX = pizzaCanvas.width / 2;
      const centerY = pizzaCanvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
  
      for (let i = 1; i < numSlices; i++) {
        const offset = ((i / numSlices) - 0.5) * 2 * radius;
        const xLeft = centerX - Math.sqrt(Math.max(0, radius**2 - offset**2));
        const xRight = centerX + Math.sqrt(Math.max(0, radius**2 - offset**2));
        ctx.beginPath();
        ctx.moveTo(xLeft, centerY + offset);
        ctx.lineTo(xRight, centerY + offset);
        ctx.strokeStyle = '#2D3436';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      return true;
    }
  
    function drawSpiralSlices(numSlices) {
      const centerX = pizzaCanvas.width / 2;
      const centerY = pizzaCanvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      let turns = 2;
      let totalAngle = Math.PI * 2 * turns;
      let pointsPerSlice = 100;
  
      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#2D3436';
      for (let i = 0; i < numSlices; i++) {
        ctx.beginPath();
        for (let j = 0; j <= pointsPerSlice; j++) {
          let t = j / pointsPerSlice;
          let angle = (i + t) * (totalAngle / numSlices);
          let r = (t + i) / numSlices * radius;
          let x = centerX + r * Math.cos(angle);
          let y = centerY + r * Math.sin(angle);
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
      return true;
    }
  
    function drawConcentricSlices(numSlices) {
      const centerX = pizzaCanvas.width / 2;
      const centerY = pizzaCanvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      const rings = Math.ceil(Math.sqrt(numSlices));
      const sectors = Math.ceil(numSlices / rings);
  
      for (let r = 1; r < rings; r++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (r * radius) / rings, 0, 2 * Math.PI);
        ctx.strokeStyle = '#2D3436';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      for (let i = 0; i < sectors; i++) {
        let angle = (2 * Math.PI * i) / sectors;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
        ctx.strokeStyle = '#2D3436';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      return true;
    }
  
    function drawPuzzleSlices(numSlices) {
      const centerX = pizzaCanvas.width / 2;
      const centerY = pizzaCanvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;
      for (let i = 0; i < numSlices; i++) {
        ctx.beginPath();
        let angle = (2 * Math.PI * i) / numSlices;
        ctx.moveTo(centerX, centerY);
        let steps = 28;
        for (let t = 1; t <= steps; t++) {
          let frac = t / steps;
          let a = angle + 0.5 * Math.sin(4 * Math.PI * frac + i * 2);
          let r = frac * radius;
          let x = centerX + r * Math.cos(a);
          let y = centerY + r * Math.sin(a);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#2D3436';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      return true;
    }
  
    function generateInstructions(numSlices, pattern) {
      const pizzaSizeInches = parseInt(pizzaSizeInput.value, 10);
      const sliceArea = Math.PI * Math.pow(pizzaSizeInches / 2, 2) / numSlices;
      const instructions = [
        `Here's a creative way to cut your ${pizzaSizeInches}" pizza into ${numSlices} equal slices:`
      ];
      switch (pattern) {
        case 'crisscross':
          instructions.push(
            '1. Cut the pizza into a grid using vertical and horizontal lines.',
            '2. Each person gets a rectangular or square-like piece of equal area.'
          );
          break;
        case 'chord':
          instructions.push(
            '1. Cut several straight lines (chords) parallel to each other, spaced equally across the pizza (not passing through the center).',
            '2. This forms stripe-like slices of pizza.'
          );
          break;
        case 'spiral':
          instructions.push(
            '1. Start at the center and cut a spiral outwards, making as many spiral paths as needed.',
            '2. Each person gets a spiral-shaped piece of equal area.'
          );
          break;
        case 'concentric':
          instructions.push(
            '1. Cut concentric circles (rings) on the pizza.',
            '2. Divide each ring further into wedge-shaped sectors.',
            '3. Each person gets a combination of ring pieces of equal area.'
          );
          break;
        case 'puzzle':
          instructions.push(
            '1. Use wavy lines radiating from the center to the edge, making puzzle-like shapes.',
            '2. Each person gets a unique, interlocking slice of pizza.'
          );
          break;
      }
      instructions.push(`Each person will get about <b>${sliceArea.toFixed(2)} square inches</b> of pizza!`);
      return instructions.join('<br>');
    }
  
    function updatePizza() {
      debugLog('Update pizza function called');
      const pizzaSize  = parseFloat(pizzaSizeInput.value);
      const peopleCount = parseInt(peopleCountInput.value);
      const pattern = patternSelect.value;
  
      debugLog('Input values:', { pizzaSize, peopleCount, pattern });
  
      if (isNaN(pizzaSize) || pizzaSize < 8 || pizzaSize > 24) {
        console.warn('Invalid pizza size:', pizzaSize);
        alert('Please enter a pizza size between 8 and 24 inches');
        return;
      }
      if (isNaN(peopleCount) || peopleCount < 1 || peopleCount > 12) {
        console.warn('Invalid people count:', peopleCount);
        alert('Please enter a number of people between 1 and 12');
        return;
      }
  
      resizeCanvas();
      drawPizzaBase();
  
      let success = false;
      if (pattern === 'crisscross')    success = drawCrissCrossSlices(peopleCount);
      else if (pattern === 'chord')    success = drawChordSlices(peopleCount);
      else if (pattern === 'spiral')   success = drawSpiralSlices(peopleCount);
      else if (pattern === 'concentric') success = drawConcentricSlices(peopleCount);
      else if (pattern === 'puzzle')   success = drawPuzzleSlices(peopleCount);
  
      instructionsDiv.innerHTML = success
        ? generateInstructions(peopleCount, pattern)
        : "Couldn't find a valid cutting pattern for this number of people. Try a different number!";
    }
  
    calculateBtn.addEventListener('click', updatePizza);
    patternSelect.addEventListener('change', updatePizza);
    pizzaSizeInput.addEventListener('input', updatePizza);
    peopleCountInput.addEventListener('input', updatePizza);
    window.addEventListener('resize', updatePizza);
  
    updatePizza();
  });
  