const app = new Vue({

    el:"#ppal",

    data:{
        id_cliente:null,
        razon_social:'',
        nombre:'',
        apellido:'',
        telefono:'',
        correo_electronico:'',
        cliente_a_buscar:null,
        id_host:null,
        hostname:'',
        dir_ip:'',
        fecha_carga:null,
        cliente:null,
        lista_clientes:[],
        lista_equipos:[],
        clienteSeleccionado:[]
    },

    methods:{



        // FUNCION PARA LIMPIAR DATOS DE INPUTS CLIENTES
        limpiarDatosCliente()
        {
            this.razon_social = '';
            this.nombre = '';
            this.apellido = '';
            this.telefono = '';
            this.correo_electronico = '';
        },

        limpiarDatosEquipo()
        {
            this.hostname = '';
            this.dir_ip = null;
            this.fecha_carga = '';
            this.cliente = null;
            
        },

        listarClientes(){

            axios.get('http://localhost:3000/cliente').then(resultado => {
       
                this.lista_clientes = resultado.data;
       
            });

        },
        
        listarEquipos(){

            axios.get('http://localhost:3000/equipo').then(resultado => {
       
                this.lista_equipos = resultado.data;
       
            });

        },

        eliminarCliente(id_cliente){

            axios.delete('http://localhost:3000/cliente/'+id_cliente).then(resultado => {
       
                alert('SE HA ELIMINADO EL CLIENTE CON ID: '+id_cliente);
                this.listarClientes();
       
            });
        },

        eliminarEquipo(id_equipo){

            axios.delete('http://localhost:3000/equipo/'+id_equipo).then(resultado => {
       
                alert('SE HA ELIMINADO EL EQUIPO CON ID: '+id_equipo);
                this.listarEquipos();
       
            });
        },


        // FUNCION PARA GUARDAD UNA FACTURA NUEVA
        guardarCliente(){

            let unCliente = {
                razon_social: this.razon_social,
                nombre: this.nombre,
                apellido: this.apellido,
                telefono: this.telefono,
                correo_electronico: this.correo_electronico,
            }

            axios.post('http://localhost:3000/cliente/',unCliente).then( resultado => {
                //console.log(resultado);
                alert(resultado.data);
                
                //dDESPUES DE GUARDAR UNA NUEVA FACTURA, LISTO LA BBDD Y LIMPIO LOS INPUTS
                
                this.limpiarDatosCliente();
                this.listarClientes();

            });
    
        },

        guardarEquipo(){

            
            let unEquipo = {
                hostname: this.hostname,
                dir_ip: this.dir_ip,
                fecha_carga: this.fecha_carga,
                cliente: this.cliente,
            }

            axios.post('http://localhost:3000/equipo/',unEquipo).then( resultado => {
                //console.log(resultado);
                alert(resultado.data);
                //DESPUES DE GUARDAR UN EQUIPO, LISTO LA BBDD Y LIMPIO LOS INPUTS

                this.limpiarDatosEquipo();
                this.listarEquipos();

            });
            
        },

        editarCliente (id_cliente, razon_social,nombre,apellido,telefono,correo_electronico){

            this.id_cliente = id_cliente;
            this.razon_social = razon_social;
            this.nombre = nombre;
            this.apellido = apellido;
            this.telefono = telefono;
   	    this.correo_electronico = correo_electronico;
        },

        editarEquipo(id_host,hostname,dir_ip,fecha_carga,cliente){

            this.id_host = id_host;
            this.hostname = hostname;
            this.dir_ip = dir_ip;
            this.fecha_carga = fecha_carga;
            this.cliente = cliente;
        },

        // ACTUALIZO UN CLIENTE PREVIAMENTE SELECCIONADO
        actualizarCliente(){
            
            let unCliente = {
                razon_social: this.razon_social,
                nombre: this.nombre,
                apellido: this.apellido,
                telefono: this.telefono,
                correo_electronico: this.correo_electronico,
            }
            axios.put('http://localhost:3000/cliente/'+this.id_cliente, unCliente).then( resultado => {

                alert(resultado.data);
                //UNA VEZ ACTUALIZADO EL CLIENTE, LIMPIO LA TABLA EDITABLE Y VUELVO A LISTAR
                this.listarClientes();
                this.limpiarDatosCliente();

            });
        },

        // ACTUALIZO UN EQUIPO PREVIAMENTE SELECCIONADO
        actualizarEquipo(){
            
            let unEquipo = {
                hostname: this.hostname,
                dir_ip: this.dir_ip,
                fecha_carga: this.fecha_carga,
                cliente: this.cliente
            }
            axios.put('http://localhost:3000/equipo/'+this.id_host, unEquipo).then( resultado => {

                alert(resultado.data);
                //UNA VEZ ACTUALIZADO, LIMPIO LA TABLA EDITABLE Y VUELVO A LISTAR
                this.listarEquipos();
                this.limpiarDatosEquipo();
            });
        },
        
    },

    computed:{

    },

  /*  mounted() {
        M.AutoInit;
    
        $('.carousel.carousel-slider').carousel({
        $('select').formSelect();
        $('.tabs').tabs();

    }, */

    created:function()
    {
        this.listarClientes();
        this.listarEquipos();
    },

});