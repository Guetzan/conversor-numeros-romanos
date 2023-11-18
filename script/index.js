class conversorRomanos {
    constructor() {
        this.input = document.querySelector('#valorInput');
        this.areaResultado = document.querySelector('#result');
        this.algarismosRomanos = {
            1000: 'M',
             900: 'CM',
             500: 'D',
             400: 'CD',
             100: 'C',
              90: 'XC',
              50: 'L',
              40: 'XL',
              10: 'X',
               9: 'IX',
               5: 'V',
               4: 'IV',
               3: 'III',
               2: 'II',
               1: 'I',
        }
        this.romanosEmIndo = (Object.keys(this.algarismosRomanos)).reverse();
    }

    conversorIndoRomano(valor) {
        if (valor > 3999 || valor < 0) return;

        valor = Number(valor);
        let resultado = '';

        for(let valorEmIndo of this.romanosEmIndo) {
            while(valor >= valorEmIndo) {
                valor -= valorEmIndo;
                resultado += this.algarismosRomanos[valorEmIndo];
            }
        }

        return resultado;
    }

    atualizarResultado() {
        const valorAtual = this.conversorIndoRomano(this.input.value);
        console.log(valorAtual)

        if(typeof valorAtual === 'undefined') {
            this.areaResultado.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
            this.areaResultado.style.fontSize = '1.8em';
            this.areaResultado.innerHTML = 'Valor inválido. Utilize valores entre 0 e 3999.'; 
            return;
        }

        this.areaResultado.innerHTML = valorAtual;
    }
}

conversor = new conversorRomanos

conversor.input.addEventListener('keyup', () => {
    conversor.conversorIndoRomano();
    conversor.atualizarResultado();
})