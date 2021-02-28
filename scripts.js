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
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transaction) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
}

const transactions = [
    

]

const transaction = {
    all: Storage.get(),

    add(transactions){
        transaction.all.push(transactions)

        App.reload()
    },

    remove(index) {
        transaction.all.splice(index, 1)

        App.reload()
    },

    incomes () {
        let income = 0;
        transaction.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }

        })
        return income;
    },

    expenses () {
        let expense = 0;
        transaction.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }

        })
        return expense;
    },

    total () {

        return transaction.incomes() + transaction.expenses();
    },
}

// Eu preciso pegar as minhas transações do
// meu objeto aqui javascript
// e colocar la no HTML

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    addtransactions(transactions, index) {

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLtransactions(transactions, index)
        tr.dataset.index = index

        DOM.transactionContainer.appendChild(tr)
    },   
    innerHTMLtransactions(transactions, index) {
        CSSclass = transactions.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transactions.amount)

        const html = `
             <td class="description">${transactions.description}</td>
             <td class="${CSSclass}">${amount}</td>
             <td class="date">${transactions.date}</td>
             <td><img onclick="transaction.remove(${index})" src="./assets/minus.svg" alt="Icone Remover Itens"></td>
        `
        return html
    },

    updateBalance(){
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(transaction.incomes())
        document
            .getElementById('expensesDisplay')
            .innerHTML = Utils.formatCurrency(transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(transaction.total())
    },

    cleartransactions() {
        DOM.transactionContainer.innerHTML = ""
    },
}

const Utils = {
    formatAmount(value) {
    value = Number(value) *100

    return Math.round(value)
    },

    formatDate(date) {
        const splitteDate = date.split("-")
        return `${splitteDate[2]}/${splitteDate[1]}/${splitteDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"

        })

        return signal + value
    },

}

const form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: form.description.value,
            amount: form.amount.value,
            date: form.date.value
        }

    },

    formatData(){

    },

    validateField() {
        const { description, amount, date } = form.getValues()

        if(description.trim() == "" || 
           amount.trim() == "" || 
           date.trim() == "") {
                throw new Error("Por favor, preencha todos os campos")

        }
    },

    formatValues() {
        let { description, amount, date } = form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date 
        }
    },


    clearFields() {
        form.description.value = ""
        form.amount.value = ""
        form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

    try {
        form.validateField()

        const transactions = form.formatValues()

        transaction.add(transactions)

        form.clearFields()

        Modal.close()

        
    } catch (error) {
        alert(error.message)
    }

    },
}

const App = {
    init() {

        transaction.all.forEach(function(transactions, index){
            DOM.addtransactions(transactions, index)
        })
        
        DOM.updateBalance()

        Storage.set(transaction.all)

    },
    reload() {
        DOM.cleartransactions()
        App.init()

    },
}

App.init()


