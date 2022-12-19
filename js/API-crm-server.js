export  class ApiCrmServer {

  constructor(params) {




  }

};



export async function createData() {

  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: 'Василий',
      surname: 'Теркин',
      lastName: 'Терентьевич',
      contacts: [
        {
          type: 'Телефон',
          value: '+71234567890'
        },
        {
          type: 'Email',
          value: 'abc@xyz.com'
        },
        {
          type: 'Facebook',
          value: 'https://facebook.com/vasiliy-pupkin-the-best'
        }
      ],
    }),
  })

  const data = await response.json()
  console.log(data);

};


// async function loadTodoItems() {
//   const response = await fetch('http://localhost:3000/api/todos');
//   const data = await response.json();
//   console.log('data', data);
// }
// loadTodoItems();
// async function createTodoItem() {
//   const response = await fetch('http://localhost:3000/api/todos', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       name: 'Привет, мир!',
//       owner: 'Serge',
//     })
//   });
//   const data = await response.json();
//   console.log('data', data);
// }
// createTodoItem();
// async function getTodoItem() {
//   const response = await fetch('http://localhost:3000/api/todos/1660701782379')
//     const data = await response.json();
//     console.log('data', data);
//   }
//   // getTodoItem()
//   async function markTodoAsDone() {
//     const response = await fetch('http://localhost:3000/api/todos/1660701782379', {
//       method: 'PATCH',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         // name: 'Здрасьте!',
//       // owner: 'Serge999',
//       done: true,
//     })
//   });
//   const data = await response.json();
//   console.log('data', data);
// }
// markTodoAsDone()
// async function markTodoAsDone() {
//   const response = await fetch('http://localhost:3000/api/todos/1660701782379', {
//     method: 'DELETE',
// });
// if (response.status === 404) {
//   console.log('нет дела!!!',);
// }
// const data = await response.json();
// console.log('data', data);
// }
// markTodoAsDone()

