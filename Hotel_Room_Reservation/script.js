let rooms = [];

/* ------------------ HOTEL CREATION ------------------ */

function createHotel() {
    rooms = [];

    for (let floor = 1; floor <= 10; floor++) {
        let count = floor === 10 ? 7 : 10;

        for (let i = 1; i <= count; i++) {
            rooms.push({
                id: floor * 100 + i,
                floor: floor,
                position: i,
                booked: false
            });
        }
    }
}

createHotel();
renderHotel();

/* ------------------ RENDER UI ------------------ */

function renderHotel(selectedRooms = []) {
    let html = "";

    for (let floor = 10; floor >= 1; floor--) {
        html += `<div class="floor"><strong>Floor ${floor}:</strong> `;

        rooms
            .filter(r => r.floor === floor)
            .forEach(r => {
                let cls = "available";
                if (r.booked) cls = "booked";
                if (selectedRooms.includes(r)) cls = "selected";

                html += `<div class="room ${cls}">${r.id}</div>`;
            });

        html += "</div>";
    }

    document.getElementById("hotel").innerHTML = html;
}

/* ------------------ TRAVEL TIME ------------------ */

function travelTimeBetween(a, b) {
    let horizontal = Math.abs(a.position - b.position);
    let vertical = Math.abs(a.floor - b.floor) * 2;
    return horizontal + vertical;
}

function totalTravelTime(set) {
    let sorted = [...set].sort((a, b) =>
        (a.floor * 10 + a.position) - (b.floor * 10 + b.position)
    );
    return travelTimeBetween(sorted[0], sorted[sorted.length - 1]);
}

/* ------------------ COMBINATIONS ------------------ */

function getCombinations(arr, k) {
    let result = [];

    function helper(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            helper(i + 1, path);
            path.pop();
        }
    }

    helper(0, []);
    return result;
}

/* ------------------ BOOKING ENGINE ------------------ */

function findBestRooms(n) {
    let available = rooms.filter(r => !r.booked);
    let bestSet = null;
    let minTime = Infinity;

    // Priority 1: Same floor
    for (let floor = 1; floor <= 10; floor++) {
        let floorRooms = available.filter(r => r.floor === floor);
        if (floorRooms.length >= n) {
            let combos = getCombinations(floorRooms, n);
            combos.forEach(set => {
                let time = totalTravelTime(set);
                if (time < minTime) {
                    minTime = time;
                    bestSet = set;
                }
            });
        }
    }

    // Priority 2: Cross floor
    if (!bestSet) {
        let combos = getCombinations(available, n);
        combos.forEach(set => {
            let time = totalTravelTime(set);
            if (time < minTime) {
                minTime = time;
                bestSet = set;
            }
        });
    }

    return { bestSet, minTime };
}

/* ------------------ ACTIONS ------------------ */

function bookRooms() {
    let n = Number(document.getElementById("roomCount").value);

    if (n < 1 || n > 5) {
        alert("You can book only 1 to 5 rooms");
        return;
    }

    let available = rooms.filter(r => !r.booked);
    if (available.length < n) {
        alert("Not enough rooms available");
        return;
    }

    let result = findBestRooms(n);
    if (!result.bestSet) {
        alert("Unable to allocate rooms");
        return;
    }

    result.bestSet.forEach(r => r.booked = true);
    renderHotel(result.bestSet);

    document.getElementById("result").innerText =
        `Booked Rooms: ${result.bestSet.map(r => r.id).join(", ")} | Total Travel Time: ${result.minTime} minutes`;
}

function randomOccupancy() {
    rooms.forEach(r => {
        r.booked = Math.random() < 0.35;
    });
    document.getElementById("result").innerText = "";
    renderHotel();
}

function resetAll() {
    createHotel();
    document.getElementById("result").innerText = "";
    renderHotel();
}
