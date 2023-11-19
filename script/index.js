class ConversorRomanos {
	constructor() {
		this.input = document.querySelector('#valorInput');
		this.areaResultado = document.querySelector('#result');
		this.modoAtual = 'romanoArabico';
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
				
				if(botao.id === 'arabico-romano') {
					this.input.placeholder = 'Digite um valor indo-arábico (ex: 1, 50, 23)';
					this.modoAtual = 'arabicoRomano'
				} 
				if(botao.id === 'romano-arabico') {
					this.input.placeholder = 'Digite um valor em algarismos romanos (ex: II, IV, CM)';
					this.modoAtual = 'romanoArabico';
				}
			});
		});
	}
	
	conversorArabicoRomano(valor) {
		valor = Number(valor);
		if (valor > 3999 || valor < 0 || isNaN(valor)) return;
		
		let resultado = '';
		
		for(let index = 0; index < this.valoresIndoArabicos.length; index++) {
			while(valor >= this.valoresIndoArabicos[index]) {
				valor -= this.valoresIndoArabicos[index];
				resultado += this.algarismosRomanos[index];
			}
		}
		
		return resultado;
	}
	
	excedeLimite(valor) {
		let ultimoCaractere = ''
		let contadorCaractere = 0;
		
		for(let caractere = 0; caractere < valor.length; caractere++) {
			if(valor[caractere] !== ultimoCaractere) {
				ultimoCaractere = valor[caractere];
				contadorCaractere = 0;
				contadorCaractere++;
				continue;
			}
			
			if(valor[caractere] === ultimoCaractere) contadorCaractere++;
		}
		
		
		if(contadorCaractere > 3) return true;
		return false;
	}
	
	conversorRomanoArabico(valor) {
		let soma = 0;
		valor = valor.toUpperCase().split('');
		
		for(let caractere of valor) {
			if(!this.algarismosRomanos.includes(caractere)) return;
		}
		
		if(this.excedeLimite(valor)) return;
		if(this.subtracaoInvalida()) return;
		
		for(let caractere = 0; caractere < valor.length; caractere++) {	
			for(let i = 0; i < this.algarismosRomanos.length; i++) {
				const indexProximoCaractere = caractere + 1;
				const caracteresAdjacentes = valor[caractere] + valor[indexProximoCaractere];
				
				if(caracteresAdjacentes === this.algarismosRomanos[i]) {
					soma += this.valoresIndoArabicos[i];
					delete valor[caractere]; delete valor[indexProximoCaractere];
				}
				
				if((valor[caractere]) === this.algarismosRomanos[i]) {
					
					soma += this.valoresIndoArabicos[i];
				}
			}
		}
		
		return soma;
	}
	
	subtracaoInvalida() {
		let valor = 'CMIX';
		
		for(let index = 0; index < valor.length; index++) {
			let enderecoCaractere;
			let valorVizinho;
			let enderecoCaractereVizinho;

			if(valor[index + 1]) {
				const valorAdjacente = valor[index] + valor[index + 1];
				let valorVizinho;
				let valorAdjacenteVizinho;
				let caractereSubtraido = false;

				if(this.algarismosRomanos.includes(valorAdjacente)) {
					enderecoCaractere = this.algarismosRomanos.indexOf(valorAdjacente);	
					caractereSubtraido = true;
				} 

				if(caractereSubtraido === true) {
					if(valor[index+2]) valorVizinho = valor[index+2];
					if(valor[index+3]) valorVizinho += valor[index+3];

					if(this.algarismosRomanos.includes(valorVizinho)) {
						enderecoCaractereVizinho = this.algarismosRomanos.indexOf(valorVizinho)
						
						if(this.algarismosRomanos(enderecoCaractere))
					}

					// if(valor[index+2]) {
					// 	if(valor[index+3]) {
	
					// 		if(this.algarismosRomanos.includes(valorAdjacenteVizinho)) {
					// 			enderecoCaractereVizinho = this.algarismosRomanos.indexOf(valorAdjacenteVizinho) 
							
					// 			if(this.valoresIndoArabicos[enderecoCaractere] < this.valoresIndoArabicos[enderecoCaractereVizinho]) {
					// 				return;
					// 			}
					// 		}
					// 	}

					// 	console.log(valor[index+3]);

					// 	if(valor[index+2]) {
					// 		console.log('entrou')
					// 		valorVizinho = valor[index+2];
					// 		console.log(valorVizinho);
					// 	} 
					// }

				}
				
				// if(valor[index+2]) {
				// 	if(caractereSubtraido) {
				// 		caractereVizinho = valor[index+2];
				// 		console.log(caractereVizinho);
				// 	}
				// }
				
				// if(valor[index+2]) {
				// 	const valorAdjacenteVizinho = valor[index+1] + valor[index+2]; 
					
				// 	if(this.algarismosRomanos.includes(valorAdjacenteVizinho)) {
				// 		const enderecoCaractereVizinho = this.algarismosRomanos.indexOf(valorAdjacenteVizinho);
				// 	}
				// }
			}
			
			
			
			// if(caractereVizinho) {
			// 	//caractere menor antecedendo valor subtraído maior
			// 	if(valor[index+2]) {
			// 		const valorAdjacenteVizinho = valor[index+1] + valor[index+2]; 
			
			// 		if(this.algarismosRomanos.includes(valorAdjacenteVizinho)) {
			// 			const enderecoValorAdjacente = this.algarismosRomanos.indexOf(valorAdjacenteVizinho);
			
			// 			if(this.valoresIndoArabicos[enderecoCaractere] < this.valoresIndoArabicos[enderecoValorAdjacente]) {
			// 				return true;
			// 			}
			
			// 			return false;
			// 		}
			// 	}
			
			// 	//caractere menor antecedendo caractere maior
			// 	if(this.valoresIndoArabicos[enderecoCaractere] < this.valoresIndoArabicos[enderecoCaractereVizinho]) {
			// 		// console.log(valor[index-1],valor[index], caractereVizinho)
			// 		return true;
			// 	}
			// }
		}		
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

conversor = new ConversorRomanos;
conversor.capturarTrocaOpcao();
conversor.capturarTeclado();