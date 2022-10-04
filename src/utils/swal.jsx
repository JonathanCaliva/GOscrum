import Swal from 'sweetalert2'

export default function swal(){
    Swal.fire({
        title:"Usuario o contraseña incorrecta",
        text:'Por favor introduzca nuevamente su usuario y contraseña',
        confirmButtonText:'Aceptar',
        width:'400px',
        timer:10000,
        timerProgressBar:true
    })
}