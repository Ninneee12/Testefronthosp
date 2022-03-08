let emailsSaveds = [] // criado uma variável global para iniciar com array vazio
const divEmailsCriados = document.querySelector('.EmailsCriados');
document.getElementById('inputFile').addEventListener('change', function () {
    var file = new FileReader(); // criando uma instância do construtor FileReader
    
    file.onload = () => { // assim que o file reader  carregar/ler o arquivo ele vai executar abaixo a manipulação de dados
        const nomes = file.result.split('\n').map(name => name.replace(/[\\|\}|-]/g, '').toLowerCase()); //pega os dados dos arquivos coloca dentro de um constante e trata retirando os caracteres e converte tudo para minuscula 
        const formatedNames = nomes.map(name => tratamentoVetor(name)) // crio uma variável de nomes formatados e crio uma arrow function para chamar a funçao que criei para formatar os nomes
        const savedEmails = formatedNames.map((nome, index) => { // peguei o vetor de emails criados fiz um map para chamar a nova função de salvar o email
            const email = criarEmail(nome) // crio um variável email que chama a funcao criar email com o parametro nome 
            const savedEmail = saveEmails(email, nomes[index]) // criei uma variável que recebe os dados de saveemails e como parametro chama nome com index dele e o email


            return savedEmail
        })

        savedEmails.forEach(item => mostrarEmTela(item)) // criei um foreach que para cada item ele exibe na tela 

        console.log(emailsSaveds) // chamo para mostrar no console
    }


    file.readAsText(this.files[0]); // estou pedindo para o File Reader ler o arquivo 
});

// criei uma função que trata os nomes dentro dos vetores independente de quantos nomes tiver 
function tratamentoVetor(nome) { //passei  o nome como argumento
    const arrName = nome.split(' ') // transformei o nome em um vetor utilizando o split para transformar um string em vetores e o parametro para receber os cortes foi o espaco entre os nomes ou seja ele jogou todo nome completo em um unico vetor
    const lastname = arrName.splice(-1) // vamos pegar o ultimo nome do vetor arrname utilizando o splice  alem de retornar o utlimo valor  ele tambem vai remover do vetor principal ou seja faz um recorte
    const restName = arrName.map(name => name.charAt(0)).join('.') //estou pegando o restante dos nomes que ficaram, fazendo um map, para retornar um novo vetor apenas com a primeira letra do nome, Utilizando o charAt(0), ali também funciona name[0] depois  com o  novo vetor, fazemos um join Ou seja, pegando o nosso array e transformando ele em uma string E como parâmetro do join, é como eu quero que ele junte tudo com o ponto
    console.log(arrName) // exibe o resultado do vetor tratado
    return `${lastname}.${restName}` // ele retorna o valor do ultimo nome inteiro e o resto do nome todo tratado( nome e nome do meio)


    



}
// criei uma funcao para criar emails 
function criarEmail(email) { // passei email como parametro
    const similarsFinded = emailsSaveds.filter(item => !!item.email.match(email)).length // peguei a variavel global de emails salvos e fiz um filtro para ver quantos emails ja tem cadastrado

    const count = similarsFinded || ''
    console.log(email)
    return `${email}${count}@company.com` // retorna o argumento concatenando a parte do dominio do email

    


}
//criei a funcao para salvar o email pronto
function saveEmails(email, nome) { // essa funacao criada recebe dois argumentos que seria email e nome
    const newEmail = { // criei um objeto para guardar as infos de nome e email
        email,
        nome
    }

    emailsSaveds = [...emailsSaveds, newEmail] // armazenei o objeto criado dentro do array de emailsSaved que é a variavel global

    return newEmail // retorno argumento
}
// criei uma função para receber o objeto que contem as propriedades nome e email
function mostrarEmTela({nome, email}){ 
    const el = document.createElement('p') // aqui ele vai criar adicionar um paragrafo dentro da div em html para cada resultado da lista
    el.innerHTML = `${nome}: ${email}` //  insere texto em uma página web

    divEmailsCriados.append(el) // adiciona conteúdo ao final de um elemento HTML
}



// essa funcao é para executar a parte de input direto do site como anteriormente eu criei as funções para input file eu irei reaproveita-las para n ter que criar tudo de novo
function minhaFuncao() { 
    const nome = document.querySelector('#nome').value; // cria uma variavel que pega os dados do input nome
    const formatedNames = tratamentoVetor(nome.toLowerCase())//crio um variavel para chamar a funcao tratamentovetor onde meus dados estão tratados e converto tudo para minusculo
    const email = criarEmail(formatedNames)// crio um variavel para chamar a funcao criar email e coloco dentro da variavel email
    
    const savedEmail = saveEmails(email, nome) //crio um variavel savedemail para chamar a funcao de saveemails 
    const mostrarEmTelas = mostrarEmTela({nome, email}) //crio um variavel mostraremtela para chamar a funcao mostraremtela

    console.log(mostrarEmTela)

    return mostrarEmTela // retorno o argumento


}




