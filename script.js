let generatedGCode = "";
let currentComponent = "door";

function showSection(component) {
    currentComponent = component;
    document.getElementById('door-section').style.display = component === "door" ? "block" : "none";
    document.getElementById('tray-section').style.display = component === "tray" ? "block" : "none";
    document.getElementById('gcode-output').textContent = ""; // Clear previous output
    generatedGCode = ""; // Reset G-code
}

function generateGCode(component) {
    let x, y;

    // Validate and retrieve input values based on the selected component
    if (component === "door") {
        x = parseFloat(document.getElementById('door-width').value);
        y = parseFloat(document.getElementById('door-height').value);

        if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
            alert("Please enter valid numbers for door width and height.");
            return;
        }

        // Generate G-code for door
        generatedGCode = generateDoorGCode(x, y);
    } else if (component === "tray") {
        x = parseFloat(document.getElementById('tray-length').value);
        y = parseFloat(document.getElementById('tray-width').value);

        if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
            alert("Please enter valid numbers for tray length and width.");
            return;
        }

        // Generate G-code for tray
        generatedGCode = generateTrayGCode(x, y);
    }

    // Display the generated G-code
    document.getElementById('gcode-output').textContent = generatedGCode;
}

function generateDoorGCode(x, y) {
    // Door G-code generation logic
    let p0 = 0, p1 = 22, p2 = 35;
    let lx1 = 75, lx2 = lx1 + 95;
    let lyc = Math.floor(y / 2);
    let ly1 = lyc - 18, ly2 = lyc + 18;

    return `(MANNY G-CODE)\n\n` +
           `G21 G90 G49 G64 G40\nG17\nS1000\n\n` +
           `(GO TO START)\nG0 X${lx1}. Y${ly1}.\n\n` +
           `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
           `(COORDINATES)\n` +
           `G1 X${lx2}. Y${ly1}.\n` +
           `G1 X${lx2}. Y${ly2}.\n` +
           `G1 X${lx1}. Y${ly2}.\n` +
           `G1 X${lx1}. Y${ly1}.\n\n` +
           `(STOP CUTTING)\nM5\nG0 Z10.0`;
}

function generateTrayGCode(x, y) {
    // Tray G-code generation logic
    let t1 = 50;
    let t2 = t1 * 2;
    let tray_flat_size_x = x + t1 * 3;
    let tray_flat_size_y = y + t1 * 2;

    return `(MANNY G-CODE)\n\n` +
           `G21 G90 G49 G64 G40\nG17\nS1000\n\n` +
           `(GO TO START)\nG0 X0. Y${t1}.\n\n` +
           `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
           `(COORDINATES)\n` +
           `G1 X${t2}. Y${t1}.\n` +
           `G1 X${t2}. Y0.\n` +
           `G1 X${tray_flat_size_x - t1}. Y0.\n` +
           `G1 X${tray_flat_size_x - t1}. Y${t1}.\n` +
           `G1 X${tray_flat_size_x}. Y${t1}.\n` +
           `G1 X${tray_flat_size_x}. Y${tray_flat_size_y - t1}.\n` +
           `G1 X${tray_flat_size_x - t1}. Y${tray_flat_size_y - t1}.\n` +
           `G1 X${tray_flat_size_x - t1}. Y${tray_flat_size_y}.\n` +
           `G1 X${t2}. Y${tray_flat_size_y}.\n` +
           `G1 X${t2}. Y${t1}.\n\n` +
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
