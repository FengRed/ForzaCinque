const playerForm = document.getElementById('PlayerForm');
playerForm.addEventListener('submit', FormSubmit); // invia il form

function FormSubmit(e) {
    e.preventDefault(); // evita di ricaricare o aprire un file quando clicca
    const player1 = document.getElementById('player1').value.trim(); // prende input e trim cancella gli spazi
    const player2 = document.getElementById('player2').value.trim(); // prende input e trim cancella gli spazi

    if(player1 && player2){ // se i due non e vuoto entrambi
        localStorage.setItem('player1',player1); //salva i dati sul brawser
        localStorage.setItem('player2',player2); //salva i dati sul brawser
        window.location.href = './html/game.html'; // cambia pagina web game.html
    } else{
        alert('Per favore, inserisci i nomi di entrambi giocatori.') // allerto
    }
}