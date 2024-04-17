const listbook = document.querySelector('#book-list');

/* LISTAGEM DE LIVROS E AUTORES */

function renderBook(doc){
    // Criação dos elementos HTML
    let li = document.createElement('li');
    let titulo = document.createElement('span');
    let autor = document.createElement('span');

    // Carrega os dados nos elementos HTML
    li.setAttribute('data-id', doc.id);
    titulo.textContent = doc.data().titulo;
    autor.textContent = doc.data().autor;

    // Adiciona os dados de autor e título na tag LI
    li.appendChild(titulo);
    li.appendChild(autor);

    // Adiciona o LI na tag UL
    listbook.appendChild(li);
}

db.collection('libri-firestore')
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
            renderBook(doc);
        });
    });

/* Inserção de livros e autores */

const form = document.querySelector('#add-book-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    db.collection('libri-firestore').add({
        autor: form.autor.value,
        titulo: form.livro.value
    }).then(() => {
        form.autor.value = '';
        form.livro.value = '';
        window.location.reload();
    });
});
