

class conversorRomanos {
	constructor() {
		this.input = document.querySelector('#valorInput');
		this.areaResultado = document.querySelector('#result');
		this.modoAtual = 'arabicoRomano';
		this.botoesOpcao = document.querySelectorAll('.options button');
		this.algarismosRomanos   = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
		this.valoresIndoArabicos = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
		// this.algarismosSubtraidos = ['CM', 'CD', 'XC', 'XL', 'IX', 'IV']; 
	}
	
	capturarTeclado() {
		this.input.addEventListener('keyup', () => {
			const valorInput = this.input.value;
			let valorResultado = 0;
			
			if(this.modoAtual === 'arabicoRomano') {
				valorResultado = this.conversorArabicoRomano(valorInput);
			}
			
			if(this.modoAtual === 'romanoArabico') {
				valorResultado = this.conversorRomanoArabico(valorInput);
			}
			this.atualizarResultado(valorResultado);
		});
	}
	
	capturarTrocaOpcao() {
		this.botoesOpcao.forEach((botao) => {
			botao.addEventListener('click', () => {
				const botaoAtivo = document.querySelector('button.active');
				
				if(!botao.classList.contains('active')) {
					this.areaResultado.innerHTML = '';
					this.input.value = '';
				}
				
				botaoAtivo.classList.remove('active');
				botao.classList.add('active');
				
				
				if(botao.id === 'arabico-romano') this.modoAtual = 'arabicoRomano';
				if(botao.id === 'romano-arabico') this.modoAtual = 'romanoArabico';
			});
		});
	}
	
	conversorArabicoRomano(valor) {
		valor = Number(valor);
		if (valor > 3999 || valor < 0 || isNaN(valor)) return;
		
		let resultado = '';
		
		for(let index = 0; index <= this.valoresIndoArabicos.length; index++) {
			while(valor >= this.valoresIndoArabicos[index]) {
				valor -= this.valoresIndoArabicos[index];
				resultado += this.algarismosRomanos[index];
			}
		}
		
		return resultado;
	}
	
	
	excedeLimite(valor) {
		valor = valor.join('');
		console.log(valor)
		let contadorCaractere = 0;
		
		for(let caractereChecado = 0; caractereChecado < valor.length; caractereChecado++) {
			for(let caractere = 0; caractere < valor.length; caractere++) {
				if(valor[caractere] === valor[caractereChecado]) {
					contadorCaractere++;
				}
			}
			
			if (contadorCaractere > 3) return true;
			return false;
		}
	}
	
	conversorRomanoArabico(valor) {
		let soma = 0;
		valor = valor.toUpperCase().split('')

		if(this.excedeLimite(valor)) return;

		for(let c = 0; c < valor.length; c++) {	
			for(let i = 0; i < this.algarismosRomanos.length; i++) {
				
				let caracteresAdjacentes = '';
				
				if(caracteresAdjacentes === this.algarismosRomanos[i]) {
					soma += this.valoresIndoArabicos[i];
					valor.splice(c, 2);
				}
				
				if((valor[c]) === this.algarismosRomanos[i]) {
					soma += this.valoresIndoArabicos[i];
					delete valor[c];
				}
				console.log(caracteresAdjacentes);
			}
		}
		
		// let resultado = 0;
		// let valor = ['M', 'M', 'M', 'C', 'M', 'X', 'C', 'I', 'X'];
		
		// for(let caractere = 0; caractere < valor.length; caractere++) {
		// 	const caractereAtual = valor[caractere];
		
		// 	for(let algarismo = 0; algarismo < this.algarismosRomanos.length; algarismo++) {
		// 		if((valor[caractere] + valor[caractere + 1]) === this.algarismosRomanos[algarismo]) {
		// 			resultado += this.valoresIndoArabicos[algarismo];
		// 			valor.splice(caractere, 2);
		// 		}
		
		// 		if(caractereAtual === this.algarismosRomanos[algarismo]) {
		// 			resultado += this.valoresIndoArabicos[algarismo];
		// 			delete valor[caractere];
		// 			console.log(resultado, valor)
		// 		}
		// 	}
		
		// }
		
		
		return soma;
	}
	
	atualizarResultado(resultadoAtual) {
		const valorAtual = resultadoAtual;
		
		if(typeof valorAtual === 'undefined') {
			this.areaResultado.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
			this.areaResultado.style.fontSize = '1.8em';
			this.areaResultado.innerHTML = 'Valor inválido.';
			return;
		}
		
		this.areaResultado.innerHTML = valorAtual;
	}
}

conversor = new conversorRomanos;
conversor.capturarTrocaOpcao();
conversor.capturarTeclado();