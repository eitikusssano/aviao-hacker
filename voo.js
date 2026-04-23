class Voo {
    constructor(codigo, origem, destino) {
        // Validação: Campo vazio
        if (!codigo || !origem || !destino) {
            throw new Error("Erro: Todos os campos (Código, Origem e Destino) devem ser preenchidos.");
        }

        // Validação: Rota impossível
        if (origem.toLowerCase() === destino.toLowerCase()) {
            throw new Error(`Operação Negada: O voo ${codigo} não pode decolar e pousar na mesma cidade (${origem}).`);
        }

        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
    }
}

// Exporta a classe para ser usada no painel.js
export default Voo;


// --- FASE 2: A CLASSE PROTEGIDA ---
class VooSeguro {
    #codigo;
    #combustivel;

    constructor(codigoPassado) {
        this.#codigo = codigoPassado;
        this.#combustivel = 100; // Começa cheio
    }

    // GETTER: Para ler o combustível com segurança
    get lerCombustivel() {
        return `O tanque do voo ${this.#codigo} está em ${this.#combustivel}%`;
    }

    // SETTER: Para abastecer com regras
    set abastecer(quantidade) {
        if (quantidade < 0) {
            console.error("Erro: Não é possível tirar combustível via abastecimento!");
        } else if (this.#combustivel + quantidade > 100) {
            alert("Erro: O tanque vai transbordar! Limite é 100%.");
            this.#combustivel = 100; // Ajusta para o máximo
        } else {
            this.#combustivel += quantidade;
            console.log(`Abastecimento concluído. Novo nível: ${this.#combustivel}%`);
        }
    }

    // MÉTODO PARA GASTAR: (Desafio da Fase 3)
    gastarCombustivel(quantidade) {
        if (this.#combustivel - quantidade < 0) {
            alert("Atenção: Combustível insuficiente para esta manobra!");
            this.#combustivel = 0;
        } else {
            this.#combustivel -= quantidade;
            console.log(`Voo em curso... Combustível restante: ${this.#combustivel}%`);
        }
    }
}

// --- FASE 3: CONEXÃO COM O PAINEL (DOM) ---

// 1. Instanciar o voo
const meuVoo = new VooSeguro("VIP-001");

// 2. Capturar elementos do HTML
const painelTexto = document.getElementById("painelCombustivel");
const btnGastar = document.getElementById("btnGastar");
const btnAbastecer = document.getElementById("btnAbastecerSeguro");

// Função auxiliar para atualizar a tela
function atualizarTela() {
    // Usamos o GETTER aqui
    painelTexto.innerText = meuVoo.lerCombustivel;
}

// Inicializar a tela
atualizarTela();

// 3. Evento de Gastar (Voar)
btnGastar.addEventListener("click", () => {
    meuVoo.gastarCombustivel(15); // Gasta 15% a cada clique
    atualizarTela();
});

// 4. Evento de Abastecer
btnAbastecer.addEventListener("click", () => {
    // Usamos o SETTER aqui (.abastecer = valor)
    meuVoo.abastecer = 10; 
    atualizarTela();
});

// --- TESTE HACKER (Tente descomentar para ver o erro no console) ---
// meuVoo.#combustivel = 500; // Erro: Private field '#combustivel' must be declared in an enclosing class