import { AppAurora } from "./App-Aurora.js";
import { dataTableHead } from "./Table-create.js";
import { dataClientsDefault } from "./data-clients-default.js";
import { GetRandomId } from "../library/servise-function.js";
import { createData } from "./API-crm-server.js";


// async function createData() {
//   const response = await fetch('http://localhost:3000/api/clients', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       name: 'Василий',
//       surname: 'Теркин',
//       lastName: 'Терентьевич',
//       contacts: [
//         {
//           type: 'Телефон',
//           value: '+71234567890'
//         },
//         {
//           type: 'Email',
//           value: 'abc@xyz.com'
//         },
//         {
//           type: 'Facebook',
//           value: 'https://facebook.com/vasiliy-pupkin-the-best'
//         }
//       ],
//     }),
//   })

//   const data = await response.json()
//   console.log(data);
// };




(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const $container = document.getElementById('aurora-crm');
    $container.classList.add('aurora-crm');


    let listClients = dataClientsDefault
    let dataTable = {
      dataHead: dataTableHead,
      currentSort: 'id',
      dataBody: listClients,
    }

    let Aurora = new AppAurora($container, dataTable)

  })
})()

