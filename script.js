// script.js

let generatedGCode = "";  // Variable to store the generated G-code
let currentComponent = "door";  // Track whether 'door' or 'tray' is selected

function showSection(component) {
    document.getElementById("door-section").style.display = component === "door" ? "block" : "none";
    document.getElementById("tray-section").style.display = component === "tray" ? "block" : "none";
    currentComponent = component;
}

function generateGCode(component) {
    if (component === "door") {
        let x = parseInt(document.getElementById('door-width').value);
        let y = parseInt(document.getElementById('door-height').value);

        if (isNaN(x) || isNaN(y)) {
            alert("Please enter valid numbers for door width and height.");
            return;
        }

        // Generate G-code for door
        generatedGCode = generateDoorGCode(x, y);
    } else if (component === "tray") {
        let x = parseInt(document.getElementById('tray-length').value);
        let y = parseInt(document.getElementById('tray-width').value);

        if (isNaN(x) || isNaN(y)) {
            alert("Please enter valid numbers for tray length and width.");
            return;
        }

        // Generate G-code for tray
        generatedGCode = generateTrayGCode(x, y);
    }

    document.getElementById('gcode-output').textContent = generatedGCode;
}

function generateDoorGCode(x, y) {
    // Door G-code generation logic (same as before)
    let final_door_size_x = x;
    let final_door_size_y = y;

    // Door G-code logic...
    // Return the generated G-code as a string
}

function generateTrayGCode(x, y) {
    // Tray G-code generation logic
    let tray_size_x = x;
    let tray_size_y = y;

    let t1 = 50;
    let t2 = t1 * 2;

    let tray_flat_size_x = tray_size_x + t1 * 3;
    let tray_flat_size_y = tray_size_y + t1 * 2;

    let x1 = tray_flat_size_x - t1;
    let y1 = tray_flat_size_y - t1;
    let x2 = tray_flat_size_x;
    let y2 = tray_flat_size_y;

    return `(MANNY G-CODE)\n\n` +
           `G21 G90 G49 G64 G40\nG17\nS1000\n\n` +
           `(GO TO START)\nG0 X0. Y${t1}.\n\n` +
           `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
           `(COORDINATES)\nG1 X${t2}. Y${t1}.\n` +
           `G1 X${t2}. Y0.\nG1 X${x1}. Y0.\nG1 X${x1}. Y${t1}.\n` +
           `G1 X${x2}. Y${t1}.\nG1 X${x2}. Y${y1}.\nG1 X${x1}. Y${y1}.\n` +
           `G1 X${x1}. Y${y2}.\nG1 X${t2}. Y${y2}.\nG1 X${t2}. Y${y1}.\n` +
           `G1 X0. Y${y1}.\nG1 X0. Y${t1}.\n\n` +
           `(STOP CUTTING)\nM5\nG0 Z10.0`;
}

function downloadGCode() {
    if (!generatedGCode) {
        alert("Please generate the G-Code first.");
        return;
    }

    let x, y;
    if (currentComponent === "door") {
        x = document.getElementById('door-width').value;
        y = document.getElementById('door-height').value;
    } else {
        x = document.getElementById('tray-length').value;
        y = document.getElementById('tray-width').value;
    }

    let filename = `${currentComponent}${x}x${y}.txt`;
    let blob = new Blob([generatedGCode], { type: "text/plain" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    URL.revokeObjectURL(link.href);
}
