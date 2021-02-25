const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active do modal
           document.querySelector('.modal-overlay')
           .classList.add('active') 
    },
    close(){
        // fechar o modal
        // remover a class active do modal
        document.querySelector('.modal-overlay')
        .classList.remove('active') 
    }
}

const transactions = [
    {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date:'23/10/2021'
    },

    
    {
    id: 2,
    description: 'Criação de WebSite',
    amount: 500000,
    date:'04/10/2021'
    },


    {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date:'20/10/2021'
    },

]

const transaction = {
    incomes () {
        // Somar todas as entradas
    },

    expenses () {
        // Somar as Saidas
    },

    total () {
        // Entradas - Saidas
    },
}

// Eu preciso pegar as minhas transações do
// meu objeto aqui javascript
// e colocar la no HTML

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    addtransactions(transactions, index) {
        console.log(transactions)
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLtransactions(transactions)

        DOM.transactionContainer.appendChild(tr)
    },   
    innerHTMLtransactions(transactions) {
        const html = `
             <td class="description">${transactions.description}</td>
             <td class="expense">${transactions.amount}</td>
             <td class="date">${transactions.date}</td>
             <td><img src="./assets/minus.svg" alt="Icone Remover Itens"></td>
        `
        return html
    },
}

DOM.addtransactions(transactions[0])