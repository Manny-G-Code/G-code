function showSection(section) {
    // Hide both sections by default
    document.getElementById('door-section').classList.add('hidden');
    document.getElementById('tray-section').classList.add('hidden');
    
    // Show the selected section
    if (section === 'door') {
        document.getElementById('door-section').classList.remove('hidden');
    } else if (section === 'tray') {
        document.getElementById('tray-section').classList.remove('hidden');
    }
}

function generateGCode(type) {
    let gcode = '';
    if (type === 'door') {
        const width = parseFloat(document.getElementById('door-width').value);
        const height = parseFloat(document.getElementById('door-height').value);
        const numLocks = parseInt(document.getElementById('num-locks').value);

        if (numLocks === 1) {
            gcode = door1lockfunc(width, height);
        } else if (numLocks === 2) {
            gcode = door2lockfunc(width, height);
        }
    } else if (type === 'tray') {
        const length = parseFloat(document.getElementById('tray-length').value);
        const width = parseFloat(document.getElementById('tray-width').value);
        gcode = trayfunc(length, width);
    }

    // Display the generated G-Code
    document.getElementById('gcode-output').textContent = gcode;
}

function door1lockfunc(x, y) {
    const p0 = 0;
    const p1 = 22;
    const p2 = 35;

    const x1 = x - 5 + 55 - 22;
    const y1 = y - 5 + 40 - 22;
    const x2 = x - 5 + 55;
    const y2 = y - 5 + 40;

    const lyc = Math.floor(y2 / 2);
    const lx1 = 75;
    const lx2 = 75 + 95;
    const ly1 = lyc - 18;
    const ly2 = lyc + 18;

    return sprintf(`(MANNY G-CODE)\n\n` +
        `G21 G90 G49 G64 G40\n` +
        `G17\n` +
        `S1000\n\n` +
        `(GO TO START)\n` +
        `G0 X${lx1} Y${ly1}\n` +
        `(START CUTTING)\n` +
        `G0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
        `(COORDINATES)\n` +
        `G1 X${lx2} Y${ly1}\n` +
        `G1 X${lx2} Y${ly2}\n` +
        `G1 X${lx1} Y${ly2}\n` +
        `G1 X${lx1} Y${ly1}\n\n` +
        `(STOP CUTTING)\nM5\nG0 Z10.0\n\n` +
        `(GO TO START)\nG0 X${p0} Y${p1}\n` +
        `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
        `(COORDINATES)\n` +
        `G1 X${p2} Y${p1}\n` +
        `G1 X${p2} Y${p0}\n` +
        `G1 X${x1} Y${p0}\n` +
        `G1 X${x1} Y${p1}\n` +
        `G1 X${x2} Y${p1}\n` +
        `G1 X${x2} Y${y1}\n` +
        `G1 X${x1} Y${y1}\n` +
        `G1 X${x1} Y${y2}\n` +
        `G1 X${p2} Y${y2}\n` +
        `G1 X${p2} Y${y1}\n` +
        `G1 X${p0} Y${y1}\n` +
        `G1 X${p0} Y${p1}`);
}

function door2lockfunc(x, y) {
    const p0 = 0;
    const p1 = 22;
    const p2 = 35;

    const x1 = x - 5 + 55 - 22;
    const y1 = y - 5 + 40 - 22;
    const x2 = x - 5 + 55;
    const y2 = y - 5 + 40;

    const lock1_center = 120;
    const lock2_center = y2 - 120;
    const lock_x1 = 75;
    const lock_x2 = 75 + 95;
    const lock1_y1 = lock1_center - 18;
    const lock1_y2 = lock1_center + 18;
    const lock2_y1 = lock2_center - 18;
    const lock2_y2 = lock2_center + 18;

    return sprintf(`(MANNY G-CODE)\n\n` +
        `G21 G90 G49 G64 G40\n` +
        `G17\n` +
        `S1000\n\n` +
        `(GO TO START)\nG0 X${lock_x1} Y${lock1_y1}\n` +
        `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
        `(COORDINATES)\n` +
        `G1 X${lock_x2} Y${lock1_y1}\n` +
        `G1 X${lock_x2} Y${lock1_y2}\n` +
        `G1 X${lock_x1} Y${lock1_y2}\n` +
        `G1 X${lock_x1} Y${lock1_y1}\n\n` +
        `(STOP CUTTING)\nM5\nG0 Z10.0\n\n` +
        `(GO TO START)\nG0 X${lock_x1} Y${lock2_y1}\n` +
        `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
        `(COORDINATES)\n` +
        `G1 X${lock_x2} Y${lock2_y1}\n` +
        `G1 X${lock_x2} Y${lock2_y2}\n` +
        `G1 X${lock_x1} Y${lock2_y2}\n` +
        `G1 X${lock_x1} Y${lock2_y1}\n\n` +
        `(STOP CUTTING)\nM5\nG0 Z10.0\n\n` +
        `(GO TO START)\nG0 X${p0} Y${p1}\n` +
        `(START CUTTING)\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
        `(COORDINATES)\n` +
        `G1 X${p2} Y${p1}\n` +
        `G1 X${p2} Y${p0}\n` +
        `G1 X${x1} Y${p0}\n` +
        `G1 X${x1} Y${p1}\n` +
        `G1 X${x2} Y${p1}\n` +
        `G1 X${x2} Y${y1}\n` +
        `G1 X${x1} Y${y1}\n` +
        `G1 X${x1} Y${y2}\n` +
        `G1 X${p2} Y${y2}\n` +
        `G1 X${p2} Y${y1}\n` +
        `G1 X${p0} Y${y1}\n` +
        `G1 X${p0} Y${p1}`);
}

function trayfunc(x, y) {
    const tray_flat_size_x = x + 10; // Example offset
    const tray_flat_size_y = y + 10; // Example offset

    return sprintf(`(MANNY G-CODE FOR TRAY)\n\n` +
        `G21 G90 G49 G64 G40\n` +
        `G17\n` +
        `S1000\n\n` +
        `(GO TO START)\nG0 X0 Y0\nG0 Z1.0\nM3\nG1 F300.0 Z-0.4\nF2100.0\n\n` +
        `(COORDINATES)\nG1 X${tray_flat_size_x} Y0\n` +
        `G1 X${tray_flat_size_x} Y${tray_flat_size_y}\n` +
        `G1 X0 Y${tray_flat_size_y}\n` +
        `G1 X0 Y0\n\n` +
        `(STOP CUTTING)\nM5\nG0 Z10.0\n\n` +
        `(END)\n`);
}

// Utility function to format strings for G-code
function sprintf() {
    return Array.from(arguments).join('');
}

// Show the door section by default
showSection('door');
