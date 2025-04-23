// variabili
const player1 = localStorage.getItem('player1') || 'Bianco'; // prende il dato salvato dal chiave player1 se vuoto asegna bianco
const player2 = localStorage.getItem('player2') || 'Nero'; // prende il dato salvato dal chiave player2 se vuoto asegna Nero

const board = document.getElementById('board'); // tavola
const boardSize = 10;
const Status = document.getElementById('status'); // stato gioco
const cells = [] // cella per occupare vettore
let currentPlayer = 'white'; // turno giocatore bianco per primo

// parte prima bianco

Status.textContent = `Parte prima il Bianco (${player1})`

// funzione aggiorna stato
function updateStatus(){
    Status.textContent = `Tocca a ${currentPlayer === 'white' ? player1 : player2}`; // if white true player1 false player 2
}

// reset funzione

function resetGame(){
    localStorage.removeItem('player1');// cancella il dato salvato su browser
    localStorage.removeItem('player2');// cancella il dato salvato su browser
    window.location.href = '../index.html'; // torna al pag inizale
}

// clicca bottone reset

document.getElementById('reset').addEventListener('click',resetGame);

// funzione crea tavola

function createBoard(){
    for (let i=0;i<boardSize * boardSize;i++){
        const cell = document.createElement('div'); // crea un div nel var
        cell.classList.add('cell'); // crea un classe per modificare style css
        cell.dataset.index = i; // asegna ogni cella un indice
        board.appendChild(cell); // nel tavola aggiunge una cella
        cells.push(cell); // nel vettore aggiunge la cella
        cell.addEventListener('click', checkClick,{ once:true }); // quando clicca su cella uno alla volta
    }
}

// funzione clicca cella

function checkClick(e){
    const index = +e.target.dataset.index; // la indice di cella cliccato
    if(cells[index].classList.contains('white') || cells[index].classList.contains('Black')) return; // controlla se è gia occupato la cella

    cells[index].classList.add(currentPlayer); // occupa il posto il giocatore

    const x = index % boardSize; // calcolo posizione x di indice clicato
    const y = Math.floor(index / boardSize); // calcolo posizione y di indice clicato

    if (checkWin(x,y,currentPlayer)){
        const winner = currentPlayer === 'white' ? player1 : player2; // vincitore se white pl1 else pl2
        Status.textContent = `${winner} ha vinto!`; // cambia testo
        cells.forEach(cell => cell.removeEventListener('click',checkClick)); // cancella tutti i eventi delle celle
    }else if(checkDraw()){
        Status.textContent = "Pareggio! ,tutte le celle sono occupate." 
        cells.forEach(cell => cell.removeEventListener('click',checkClick)); // cancella tutti i eventi delle celle
    } else{
        currentPlayer = currentPlayer === 'white' ? 'black' : 'white'; // se bianco asegna nero else bianco
        updateStatus();
    }

}

// funzione controlla parita

function checkDraw(){
    // controlla tutti le celle se sono vuote
    for(let i=0;i<cells.length;i++){
        if(!cells[i].classList.contains('white') || !cells[i].classList.contains('white')) return false; // non e occupato tutti
    }
    return true;
}

// funzione controlla vincita

function checkWin(x,y,color){
    // dichiara i direzione per controlare la vincita
    const directions = [
        [1,0], // oriz
        [0,1], // vert
        [1,1], // diagonale /
        [1,-1] // diagonale \
    ];

    // controllo i due avanti e dietro

    for(const [dx,dy] of directions){
        let count = 1; // conta i passi per vincita

        for(let dir = -1; dir <= 1; dir +=2){ 
            let i = 1; // conta i passi per calcolo
            while(true){
                const nx = x + dx * i * dir; // calcola ogni passo prosimo del direzione di x
                const ny = y + dy * i * dir; // calcola ogni passo prossimo del direzione di y

                if (nx < 0 || ny < 0 || nx >= boardSize || ny >= boardSize) break; // se fuori da tavola

                const ni = ny * boardSize + nx; // calcola indice del prossimo passo accanto

                if (!cells[ni].classList.contains(color)) break; // se occupato da oponente
                count++; // incrementa
                i++; // incrementa
            }
        }

        if(count >=5) return true; // vinto
    }
    return false; // non vinto
}

createBoard(); // crea la tavola
