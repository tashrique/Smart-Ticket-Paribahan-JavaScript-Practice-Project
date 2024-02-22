/**
 * IDs
 * remaining seat = remainingCount
 * selectedCount = selectedCount
 * totalPrice = totalPrice
 * grandprice = grandPrice
 *  
 * 
 */
const total_seats = 16;
let selectedSeat = {};


function getRemainingCount() {
    return total_seats - getSelectedCount();
}

function getSelectedCount() {
    return Object.keys(selectedSeat).length;
}

function getTotalPrice() {
    return getSelectedCount() * 550;
}

function getGrandPrice() {
    return getTotalPrice();
}

function getNextPass() {
    if (document.getElementById('phoneNumber').value.length > 0 && getSelectedCount() > 0) {
        document.getElementById('nextButton').disabled = false;
    }

    else {
        document.getElementById('nextButton').disabled = true;
    }

}

function refresh() {
    document.getElementById('selectedCount').innerHTML = getSelectedCount();
    document.getElementById('remainingCount').innerHTML = getRemainingCount();
    document.getElementById('totalPrice').innerHTML = getTotalPrice();
    document.getElementById('grandPrice').innerHTML = getGrandPrice();
    getNextPass();
}


function seatClick(id) {


    if (selectedSeat[id] === undefined) {
        if (getSelectedCount() >= 4) {
            return;
        } else {
            addSeat(id);

            if (getSelectedCount() > 3) {
                document.getElementById('Apply').disabled = false;
            }
        }
    } else {
        removeSeat(id);
    }
    refresh();
}

function addListItem(ticketNumber) {
    let li = document.createElement('li');
    li.id = ticketNumber + "-inlist";
    li.className = "flex justify-between items-center my-2";

    let div = document.createElement('div');
    div.className = "flex gap-1";

    let pTicketNumber = document.createElement('p');
    pTicketNumber.className = "text-sm";
    pTicketNumber.textContent = ticketNumber;

    div.appendChild(pTicketNumber);

    let pCategory = document.createElement('p');
    pCategory.className = "text-sm";
    pCategory.textContent = 'Economy';

    let pPrice = document.createElement('p');
    pPrice.className = "text-sm";
    pPrice.textContent = 550;

    li.appendChild(div);
    li.appendChild(pCategory);
    li.appendChild(pPrice);

    document.getElementById('list').appendChild(li);
}


function removeListItem(ticketNumber) {

    let li = document.getElementById(ticketNumber + "-inlist");
    li.remove();

}


function addSeat(id) {
    document.getElementById('selectedCount').innerHTML = getSelectedCount() + 1;
    document.getElementById('remainingCount').innerHTML = getRemainingCount();


    // ADD COLORS
    document.getElementById(id).style.backgroundColor = '#1DD100';
    document.getElementById(id).style.color = 'white';

    // Add to List
    selectedSeat[id] = true;

    // Add to ul li
    addListItem(id);


    // Calculate Total
    document.getElementById('totalPrice').innerHTML = parseInt(document.getElementById('totalPrice').innerHTML) + 550;

}

function removeSeat(id) {
    document.getElementById('selectedCount').innerHTML = getSelectedCount() - 1;
    document.getElementById('remainingCount').innerHTML = getRemainingCount();

    // ADD COLORS
    document.getElementById(id).style.backgroundColor = '#d2d1d1';
    document.getElementById(id).style.color = 'black';

    // Remove from List
    delete selectedSeat[id];

    //remove from ul li
    removeListItem(id);

    // Check if item reduced after cuopon
    if (getGrandPrice() < getTotalPrice()) {
        document.getElementById('grandPrice').innerHTML = getTotalPrice();
    }

    // Calculate Total
    document.getElementById('totalPrice').innerHTML = parseInt(document.getElementById('totalPrice').innerHTML) - 550;
}

function confirmPage() {
    document.getElementById('mainPage').classList.add('hidden');
    document.getElementById('confirmPage').classList.remove('hidden');
}


function mainPage() {
    document.getElementById('mainPage').classList.remove('hidden');
    document.getElementById('confirmPage').classList.add('hidden');
}



function useCoupon() {
    let coupon = (document.getElementById('couponField').value).toUpperCase();
    if (coupon === 'NEW15') {
        document.getElementById('grandPrice').innerHTML = getTotalPrice() * 0.85;
        document.getElementById('Apply').disabled = true;

    } else if (coupon === 'COUPLE20') {
        document.getElementById('grandPrice').innerHTML = getTotalPrice() * 0.80;
        document.getElementById('Apply').disabled = true;
    }
}