// script.js

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

    let code = `(MANNY G-CODE)\n\n`;
    code += `G21 G90 G49 G64 G40\nG17\nS1000\n\n`;
    code += `(GO TO START)\nG0 X${lx1}. Y${ly1}.\n\n`;
    code += `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n`;
    code += `(COORDINATES)\nG1 X${lx2}. Y${ly1}.\n`;
    code += `G1 X${lx2}. Y${ly2}.\nG1 X${lx1}. Y${ly2}.\nG1 X${lx1}. Y${ly1}.\n\n`;
    code += `(STOP CUTTING)\nM5\nG0 Z10.0\n\n`;

    code += `(GO TO START)\nG0 X${p0}. Y${p1}.\n\n`;
    code += `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n`;
    code += `(COORDINATES)\nG1 X${p2}. Y${p1}.\nG1 X${p2}. Y${p0}.\n`;
    code += `G1 X${x1}. Y${p0}.\nG1 X${x1}. Y${p1}.\nG1 X${x2}. Y${p1}.\n`;
    code += `G1 X${x2}. Y${y1}.\nG1 X${x1}. Y${y1}.\nG1 X${x1}. Y${y2}.\n`;
    code += `G1 X${p2}. Y${y2}.\nG1 X${p2}. Y${y1}.\nG1 X${p0}. Y${y1}.\n`;
    code += `G1 X${p0}. Y${p1}.\n\n`;

    code += `(STOP CUTTING)\nM5\nG0 Z10.0`;

    document.getElementById('gcode-output').textContent = code;
}
