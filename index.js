console.log(`hehe!`);
let prostredi = 'les';

const MINIMUM = 100;
const jmenoUzivatele = window.prompt('Jak ti mám říkat?', 'Anonyme');
window.alert(`Ahoj, ${jmenoUzivatele}!`);
let vekUzivatele = window.prompt('Kolik ti je let?');

if (Number(vekUzivatele) === MINIMUM) {
    window.alert('Vítej na webu');
}
else if (vekUzivatele > MINIMUM){
    window.alert(`Můžeš na web, je ti o ${vekUzivatele - MINIMUM} víc než minimum ${MINIMUM} let!`);
}
else {
    if (!isNaN(vekUzivatele)){
        window.alert(`Do dosažení minimálního věku ti zbývá ${MINIMUM - vekUzivatele} let!`);
    }
    else{
        window.alert(`Výraz ${vekUzivatele} není číslo!`)
    }
    vekUzivatele = window.prompt ('Jaký je tvůj skutečný věk?', 101)
}