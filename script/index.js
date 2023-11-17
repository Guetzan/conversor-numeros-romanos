class ControleRemoto {
    constructor(tv) {
        this.tv = tv;
        this.volume = 0;
    }

    get teste() {
        return this.volume;
    }

    aumentarVolume() {
        this.volume += 1;
    }
    
    diminuirVolume() {
        this.volume -= 1;
    }

    static trocaPilha() {
        console.log('pilha')
    }
}

const controle = new ControleRemoto('LG');
ControleRemoto.trocaPilha();
