// script.js

let generatedGCode = "";  // Variable to store the generated G-code

function generateGCode() {
    let x = parseInt(document.getElementById('width').value);
    let y = parseInt(document.getElementById('height').value);

    if (isNaN(x) || isNaN(y)) {
        alert("Please enter valid numbers for width and height.");
        return;
    }

    let final_door_size_x = x;
    let final_door_size_y = y;

    let p0 = 0;
    let p1 = 22;
    let p2 = 35;

    let x1 = final_door_size_x - 5 + 55 - 22;
    let y1 = final_door_size_y - 5 + 40 - 22;
    let x2 = final_door_size_x - 5 + 55;
    let y2 = final_door_size_y - 5 + 40;

    let lyc = Math.floor(y2 / 2);
    let lx1 = 75;
    let lx2 = 75 + 95;
    let ly1 = lyc - 18;
    let ly2 = lyc + 18;

    generatedGCode = `(MANNY G-CODE)\n\n`;
    generatedGCode += `G21 G90 G49 G64 G40\nG17\nS1000\n\n`;
    generatedGCode += `(GO TO START)\nG0 X${lx1}. Y${ly1}.\n\n`;
    generatedGCode += `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n`;
    generatedGCode += `(COORDINATES)\nG1 X${lx2}. Y${ly1}.\n`;
    generatedGCode += `G1 X${lx2}. Y${ly2}.\nG1 X${lx1}. Y${ly2}.\nG1 X${lx1}. Y${ly1}.\n\n`;
    generatedGCode += `(STOP CUTTING)\nM5\nG0 Z10.0\n\n`;

    generatedGCode += `(GO TO START)\nG0 X${p0}. Y${p1}.\n\n`;
    generatedGCode += `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n`;
    generatedGCode += `(COORDINATES)\nG1 X${p2}. Y${p1}.\nG1 X${p2}. Y${p0}.\n`;
    generatedGCode += `G1 X${x1}. Y${p0}.\nG1 X${x1}. Y${p1}.\nG1 X${x2}. Y${p1}.\n`;
    generatedGCode += `G1 X${x2}. Y${y1}.\nG1 X${x1}. Y${y1}.\nG1 X${x1}. Y${y2}.\n`;
    generatedGCode += `G1 X${p2}. Y${y2}.\nG1 X${p2}. Y${y1}.\nG1 X${p0}. Y${y1}.\n`;
    generatedGCode += `G1 X${p0}. Y${p1}.\n\n`;

    generatedGCode += `(STOP CUTTING)\nM5\nG0 Z10.0`;

    document.getElementById('gcode-output').textContent = generatedGCode;
}

function downloadGCode() {
    let x = document.getElementById('width').value;
    let y = document.getElementById('height').value;

    if (!generatedGCode) {
        alert("Please generate the G-Code first.");
        return;
    }

    // Filename with dimensions, e.g., door100x200.txt
    let filename = `door${x}x${y}.txt`;

    // Create a Blob with the generated G-code
    let blob = new Blob([generatedGCode], { type: "text/plain" });

    // Create a temporary download link
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(link.href);
}
