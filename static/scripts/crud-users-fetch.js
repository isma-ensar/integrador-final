const BASEURL = 'http://127.0.0.1:5000';


async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  }

  async function showUsers(){
    let usuarios =  await fetchData(BASEURL+'/api/usuarios/', 'GET');
    const tableUsuarios = document.querySelector('#list-table-usuarios tbody');
    tableUsuarios.innerHTML='';
    usuarios.forEach((usuario, index) => {
      let tr = `<tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.num_tel}</td>
                    <td>${usuario.gen}</td>
                    <td>${usuario.pref}</td>
                    <td>${usuario.comentario}</td>
                    <td>
                        <button onclick='updateUser(${usuario.id_usuario})'><i class="fa fa-pencil" ></button></i>
                        <button onclick='deleteUser(${usuario.id_usuario})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableUsuarios.insertAdjacentHTML("beforeend",tr);
    });
}

async function saveUser(){
    const idUser = document.querySelector('#id-user').value;
    const nombre = document.querySelector('#nombre').value;
    const apellido = document.querySelector('#apellido').value;
    const correo = document.querySelector('#correo').value;
    const num_tel = document.querySelector('#num_tel').value;
    const gen = document.querySelector('#gen').value;
    const pref = document.querySelector('#pref').value;
    const comentario = document.querySelector('#comentario').value;
    //VALIDACION DE FORMULARIO
    if (!nombre || !apellido || !correo || !num_tel || !gen || !pref || !comentario) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos del usuario
    const userData = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        num_tel: num_tel,
        gen: gen,
        pref: pref,
        comentario: comentario,
    };
  let result = null;

  if(idUser!==""){
    result = await fetchData(`${BASEURL}/api/usuarios/${idUser}`, 'PUT', userData);
  }else{
    result = await fetchData(`${BASEURL}/api/usuarios/`, 'POST', userData);
  }
  
  const formUser = document.querySelector('#form-user');
  formUser.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showUsers();
}

function deleteUser(id){
    Swal.fire({
        title: "Esta seguro de eliminar la entrada del usuario?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/usuarios/${id}`, 'DELETE');
          showUsers();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

async function updateUser(id){
    
    let response = await fetchData(`${BASEURL}/api/usuarios/${id}`, 'GET');
    const idUser = document.querySelector('#id-user');
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const correo = document.querySelector('#correo');
    const num_tel = document.querySelector('#num_tel');
    const gen = document.querySelector('#gen');
    const pref = document.querySelector('#pref');
    const comentario = document.querySelector('#comentario');
    
    idUser.value = response.id_usuario;
    nombre.value = response.nombre;
    apellido.value = response.apellido;
    correo.value = response.correo;
    num_tel.value = response.num_tel;
    gen.value = response.gen;
    pref.value = response.pref;
    comentario.value = response.comentario;
}

document.addEventListener('DOMContentLoaded',function(){
    const btnSaveUser = document.querySelector('#btn-save-user');
    // //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveUser.addEventListener('click',saveUser);
    showUsers();
});