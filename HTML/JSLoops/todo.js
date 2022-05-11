let todoList = ['make bed', 'arrange clothes']
let choiceStr = prompt('new/list/delete/quit. Enter your choice?');
while (choiceStr != 'quit') {
    if (choiceStr == 'list') {
        for (let index = 0; index < todoList.length; index++) {
            console.log(`${index}: ${todoList[index]}`);
        }
    } else if (choiceStr == 'new') {
        todoStr = prompt('Enter your todo task?');
        todoList.push(todoStr)
        for (let index = 0; index < todoList.length; index++) {
            console.log(`${index}: ${todoList[index]}`);
        }
    } else if (choiceStr == 'delete') {
        index = parseInt(prompt('Enter the element index to delete?'));
        itemStr = todoList.splice(index, 1);
        console.log(`Element \"${itemStr}\" deleted!`)
        for (let index = 0; index < todoList.length; index++) {
            console.log(`${index}: ${todoList[index]}`);
        }
    }
    choiceStr = prompt('new/list/delete/quit. Enter your choice?');
}