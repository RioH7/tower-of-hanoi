import Pole from './Pole.js';

let pole1, pole2, pole3, poleArr;
let fromPole, toPole;
let draggedId;

const levelBtn = document.getElementById('level');
const minMoves = document.getElementById('min-moves');

// Shows minimum number of moves depending on level
levelBtn.addEventListener('change', event => {
    minMoves.innerHTML = `Minimum Moves: ${2**event.target.value - 1}`;
});
 
// Used to stop the disks from duplicating when changing levels
const removeDisks = () => {
    document.querySelectorAll('.disk').forEach(e => e.remove());
};

// Disk Styling
const addDiskStyles = (div, gridPos, levelNum) => {
    const colorArray = ['#E3153C', '#E3BC15', '#15B7E3', '#E315A5', '#E31550', '#15E399', '#9915E3'];
    div.style.gridArea = `${gridPos} / 1 / span 1 / span 1`;
    div.style.backgroundColor = `${colorArray[levelNum - 1]}`;
    div.style.width = `${levelNum * 60}px`;
    div.id = `disk${levelNum}`;
}

// Starting game function 
const createDisks = levelNum => {

    removeDisks();

    pole1 = new Pole();
    pole2 = new Pole();
    pole3 = new Pole();
    poleArr = [pole1, pole2, pole3];

    let gridPos = 7;
    for(let i = levelNum; i >= 1; i--) {

        const div = document.createElement('div');
        div.classList.add('disk');
        addDiskStyles(div, gridPos, i);

        const diskNum = document.createElement('h2');

        diskNum.innerHTML = i;

        document.getElementById('droptarget1').appendChild(div);
        div.appendChild(diskNum);
        pole1.push(i);

        gridPos--;
    }
    document.getElementById('disk1').setAttribute('draggable', 'true');
    const disks = document.querySelectorAll('.disk');
    // Saving the information of any element as soon as it is dragged
    disks.forEach(disk => {

        disk.addEventListener('dragstart', event => {
            // Used to transfer the html element
            dragged = event.target;
            draggedId = Number(event.target.id[4]);
            fromPole = poleArr[event.target.parentNode.id[10] - 1];
        });
    });
}

createDisks(7);

// Calling start game function every time level is changed
levelBtn.addEventListener("change", event => {
    createDisks(event.target.value);
});

// Used for transferring information when dragging disks from column to column
let dragged = null;
let head;

const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(dropzone => {
    // Allowing the element to be dragged as default draggable is false
    dropzone.addEventListener('dragover', event => {
        event.preventDefault();
        toPole = poleArr[event.target.id[10] - 1];
        let head = toPole.peek2();
    });
    
    // Transferring the disk to the target column and removing from old column
    dropzone.addEventListener('drop', event => {
        if(!toPole.isBigger(draggedId, toPole.peek())) {
            fromPole.pop();

            toPole.push(draggedId);

            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);

            dragged.style.gridArea = `${8 - toPole.size} / 1 / span 1 / span 1`;

            poleArr.forEach(pole => {
                if(!pole.isEmpty()){
                    let diskNum = pole.peek2();
                    document.getElementById(`disk${diskNum}`).setAttribute('draggable', 'true');
                }

                if(!pole.isEmpty()) {
                    let currentNode = pole.stack.head;
                    while(currentNode) {
                        if(currentNode !== pole.stack.head){
                            document.getElementById(`disk${currentNode.data}`).setAttribute('draggable', 'false');
                        }
                        currentNode = currentNode.getNextNode();
                    }
                }

            })

        } 
        endCheck();
    })
    
});



// Reset button resets position but stops elements from being draggable after tf?
// Solve button not coded yet
// Stacks now have size property with pole1 starting at max
// Stacks
const endCheck = () => {
    if(pole3.size === levelBtn.value) {
        console.log('hello')
        document.getElementsByClassName('disk').setAttribute('draggable', 'false');
        const winDiv = document.getElementById('win');
        console.log(winDiv);
        winDiv.innerHTML = 'Congratulations, You have completed the Tower of Hanoi!';

    }   else {
        return;
    }
}