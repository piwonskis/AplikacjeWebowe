const readline = require('node:readline');

let a = 1;
let b = 2;
const c = [1,2,3,4,5,6,7,8,9,10];
function mnozenie(a, b) {
  console.log(a * b);
}

function sumaTab(tab){
	let suma = 0
	for(y of tab){
		suma = suma + y
	}
	console.log(suma);
}

function czyPar(c)
	{
	for(y of c){
		if(y%2==0){
			 console.log(y);
		}
	}

}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function czyDodatnie()
	{
	rl.question(`Podaj liczbe`, liczba => {
  		if(liczba>0){
			 console.log('Tak');
		}else{
			console.log('Nie');	
		}

  		rl.close();
	});	


}
mnozenie(a,b);
sumaTab(c);
czyPar(c);
czyDodatnie();

