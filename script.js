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

        // Get the number of locks
        let numLocks = parseInt(document.getElementById('num-locks').value);
        // Generate G-code for door with appropriate lock function
        generatedGCode = numLocks === 1 ? generateDoorGCode(x, y) : generateDoor2LockGCode(x, y);
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
    // G-code generation logic for a door with 1 lock
    let p0 = 0;
    let p1 = 22;
    let p2 = 35;

    let x1 = x - 5 + 55 - 22;
    let y1 = y - 5 + 40 - 22;
    let x2 = x - 5 + 55;
    let y2 = y - 5 + 40;

    let lock_center = 120;
    let lock_x1 = 75;
    let lock_x2 = 75 + 95;
    let lock_y1 = lock_center - 18;
    let lock_y2 = lock_center + 18;

    return `(MANNY G-CODE)\n\n` +
           `G21 G90 G49 G64 G40\n` +
           `G17\n` +
           `S1000\n\n` +
           `(GO TO START)\n` +
           `G0 X${lock_x1}. Y${lock_y1}.\n\n` +
           `(START CUTTING)\n` +
           `G0 Z1.0\n` +
           `M3\n` +
           `G1 F300.0 Z-0.4\n` +
           `F2100.0\n\n` +
           `(COORDINATES)\n` +
           `G1 X${lock_x2}. Y${lock_y1}.\n` +
           `G1 X${lock_x2}. Y${lock_y2}.\n` +
           `G1 X${lock_x1}. Y${lock_y2}.\n` +
           `G1 X${lock_x1}. Y${lock_y1}.\n\n` +
           `(STOP CUTTING)\n` +
           `M5\n` +
           `G0 Z10.0\n\n` +
           `(GO TO START)\n` +
           `G0 X${p0}. Y${p1}.\n\n` +
           `(START CUTTING)\n` +
           `G0 Z1.0\n` +
           `M3\n` +
           `G1 F300.0 Z-0.4\n` +
           `F2100.0\n\n` +
           `(COORDINATES)\n` +
           `G1 X${p2}. Y${p1}.\n` +
           `G1 X${p2}. Y${p0}.\n` +
           `G1 X${x1}. Y${p0}.\n` +
           `G1 X${x1}. Y${p1}.\n` +
           `G1 X${x2}. Y${p1}.\n` +
           `G1 X${x2}. Y${y1}.\n` +
           `G1 X${x2}. Y${y2}.\n` +
           `G1 X${x1}. Y${y2}.\n` +
           `G1 X${x1}. Y${y1}.\n\n` +
           `(STOP CUTTING)\n` +
           `M5\n` +
           `G0 Z10.0\n`;
}

function generateDoor2LockGCode(x, y) {
    // G-code generation logic for a door with 2 locks
    let final_door_size_x = x;
    let final_door_size_y = y;

    let p0 = 0;
    let p1 = 22;
    let p2 = 35;

    let x1 = final_door_size_x - 5 + 55 - 22;
    let y1 = final_door_size_y - 5 + 40 - 22;
    let x2 = final_door_size_x - 5 + 55;
    let y2 = final_door_size_y - 5 + 40;

    let lock1_center = 120;
    let lock2_center = y2 - 120;
    let lock_x1 = 75;
    let lock_x2 = 75 + 95;
    let lock1_y1 = lock1_center - 18;
    let lock1_y2 = lock1_center + 18;
    let lock2_y1 = lock2_center - 18;
    let lock2_y2 = lock2_center + 18;

    return `(MANNY G-CODE)\n\n` +
           `G21 G90 G49 G64 G40\n` +
           `G17\n` +
           `S1000\n\n` +
           `(GO TO START)\n` +
           `G0 X${lock_x1}. Y${lock1_y1}.\n\n` +
           `(START CUTTING)\n` +
           `G0 Z1.0\n` +
           `M3\n` +
           `G1 F300.0 Z-0.4\n` +
           `F2100.0\n\n` +
           `(COORDINATES)\n` +
           `G1 X${lock_x2}. Y${lock1_y1}.\n` +
           `G1 X${lock_x2}. Y${lock1_y2}.\n` +
           `G1 X${lock_x1}. Y${lock1_y2}.\n` +
           `G1 X${lock_x1}. Y${lock1_y1}.\n\n` +
           `(STOP CUTTING)\n` +
           `M5\n` +
           `G0 Z10.0\n\n` +
           `(GO TO START)\n` +
           `G0 X${lock_x1}. Y${lock2_y1}.\n\n` +
           `(START CUTTING)\n` +
           `G0 Z1.0\n` +
           `M3\n` +
           `G1 F300.0 Z-0.4\n` +
           `F2100.0\n\n` +
           `(COORDINATES)\n` +
           `G1 X${lock_x2}. Y${lock2_y1}.\n` +
           `G1 X${lock_x2}. Y${lock2_y2}.\n` +
           `G1 X${lock_x1}. Y${lock2_y2}.\n` +
           `G1 X${lock_x1}. Y${lock2_y1}.\n\n` +
           `(STOP CUTTING)\n` +
           `M5\n` +
           `G0 Z10.0\n\n` +
           `(GO TO START)\n` +
           `G0 X${p0}. Y${p1}.\n\n` +
           `(START CUTTING)\n` +
           `G0 Z1.0\n` +
           `M3\n` +
           `G1 F300.0 Z-0.4\n` +
           `F2100.0\n\n` +
           `(COORDINATES)\n` +
           `G1 X${p2}. Y${p1}.\n` +
           `G1 X${p2}. Y${p0}.\n` +
           `G1 X${x1}. Y${p0}.\n` +
           `G1 X${x1}. Y${p1}.\n` +
           `G1 X${x2}. Y${p1}.\n` +
           `G1 X${x2}. Y${y1}.\n` +
           `G1 X${x2}. Y${y2}.\n` +
           `G1 X${x1}. Y${y2}.\n` +
           `G1 X${x1}. Y${y1}.\n\n` +
           `(STOP CUTTING)\n` +
           `M5\n` +
           `G0 Z10.0\n`;
}

function generateTrayGCode(x, y) {
    // G-code generation logic for tray
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
           `G21 G90 G49 G64 G40\n` +
           `G17\n` +
           `S1000\n\n` +
           `(GO TO START)\n` +
           `G0 X0. Y${t1}.\n\n` +
           `(START CUTTING)\n` +
           `G0 Z1.0\n` +
           `M3\n` +
           `G1 F300.0 Z-0.4\n` +
           `F2100.0\n\n` +
           `(COORDINATES)\n` +
           `G1 X${t2}. Y${t1}.\n` +
           `G1 X${t2}. Y0.\n` +
           `G1 X${x1}. Y0.\n` +
           `G1 X${x1}. Y${t1}.\n` +
           `G1 X${x2}. Y${t1}.\n` +
           `G1 X${x2}. Y${y1}.\n` +
           `G1 X${x2}. Y${y2}.\n` +
           `G1 X${x1}. Y${y2}.\n` +
           `G1 X${x1}. Y${y1}.\n` +
           `G1 X0. Y${y1}.\n` +
           `G1 X0. Y${t1}.\n\n` +
           `(STOP CUTTING)\n` +
           `M5\n` +
           `G0 Z10.0\n`;
}

// Initial display setup
showSection("door");
