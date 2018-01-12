const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

// list todo 
function listTodos(unaccomplishedOnly = 'false', searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-todos.json')) {
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);

           
            let todos = data ? JSON.parse(data) : [];
           
            if (unaccomplishedOnly === 'true') {
                todos = todos.filter(t => {
                    return !t.doneTs;
                });
            }
            if (searchText) {
                todos = todos.filter(t => {
                    return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
                });
            }
            resolve(todos);
        });
    });
};
// create todo 
function createTodo(mood, text) {
    return new Promise((resolve, reject) => {

        const newTodo = {
            id: uuid(),
            mood: mood,
            text: text,
            ts: moment().unix(),
            doneTs: null
         };
    
        listTodos().then((todos) => {
            todos = [
                newTodo,
                ...todos
            ];
           fs.writeFile('data-todos.json', JSON.stringify(todos), (err) => {
               if (err) reject(err);

               resolve(newTodo); 
           });
        });
    });
}
// accomplihs todo 
function accomplishTodo(id) {
    return new Promise ((resolve, reject) => {
        
        listTodos().then((todos) => {
            for(let t of todos) {
            if(t.id === id) {
                t.doneTs = moment().unix();
                break;
                }
            }

            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if(err) reject(err);

                resolve(todos);
            });
        });
    });
}

module.exports = {
    listTodos,
    createTodo,
    accomplishTodo
}