export const URL = {
    server2: "http://3.212.65.194:3000",
    //server2: "http://imperacore.net:3013",

}

const HEADER_JSON =  { 'content-type': 'application/json',  "api": "Amma2022" } 


const fetchAsync = async (url, method, { body = {}, headers = {'content-type': 'application/json'}} = {}) => 
{
    const form = (method === "GET" || method === "HEAD") ? { method, headers } : { method, headers, body };
    let response = {
        error: true, 
        message: '',
    }

    try {
        const fetchResponse = await fetch(url, form); 
        
        response.error = (fetchResponse.status !== 200);
        response.message = await fetchResponse.json();
        
    } catch (error) {
        response.message = error;
    }

    return response;
}



export const API = {

    GET: {

        async MisSolicitudes (id) {
            return await fetchAsync(`${URL.server2}/api/request/viewc/${id}`, "GET", {headers: HEADER_JSON});
        },

        async getPreguntas () {
            return await fetchAsync(`${URL.server2}/api/question_asnwer/viewg`, "GET", {headers: HEADER_JSON});
        },

        async getJornadas() {
            return await fetchAsync(`${URL.server2}/api/jornada/view`, "GET", {headers: HEADER_JSON});
        },

        async getTipoServicio () {
            return await fetchAsync(`${URL.server2}/api/services_type/view`, "GET", {headers: HEADER_JSON});
        },

        async getClaseServicio () {
            return await fetchAsync(`${URL.server2}/api/servclass/view`, "GET", {headers: HEADER_JSON});
        },

        async getAlcanceServicio () {
            return await fetchAsync(`${URL.server2}/api/alcance/view`, "GET", {headers: HEADER_JSON});
        },

        async getTamanoPropiedad () {
            return await fetchAsync(`${URL.server2}/api/size/view`, "GET", {headers: HEADER_JSON});
        },

        async getEspacios () {
            return await fetchAsync(`${URL.server2}/api/location/space/view`, "GET", {headers: HEADER_JSON});
        },

        async getTipos () {
            return await fetchAsync(`${URL.server2}/api/tipo/view`, "GET", {headers: HEADER_JSON});
        },

        async getSolicitudes (id) {
            return await fetchAsync(`${URL.server2}/api/request/viewh/${id}`, "GET", {headers: HEADER_JSON});
        },

        async getLabores (id) {
            return await fetchAsync(`${URL.server2}/api/check/view/${id}`, "GET", {headers: HEADER_JSON});
        },

        async getPreguntasHechas (id) {
            return await fetchAsync(`${URL.server2}/api/applicant_questions/${id}`, "GET", {headers: HEADER_JSON});
        },
        
        
       

    },

    POST: {

        async getEspaciosGuardados (id) {
            return await fetchAsync(`${URL.server2}/api/location/space/viewcli`, "POST", {body: JSON.stringify({id}), headers: HEADER_JSON});
        },
    
        async getUserData (id) {
            return await fetchAsync(`${URL.server2}/api/usuarios/data`, "POST", {body: JSON.stringify({id}), headers: HEADER_JSON});
        },

        async setUserData (data) {
            return await fetchAsync(`${URL.server2}/api/usuarios/update`, "POST", {body: JSON.stringify(data), headers: HEADER_JSON});
        },

        async setSolicitud (data) {
            return await fetchAsync(`${URL.server2}/api/request/create`, "POST", {body: JSON.stringify(data), headers: HEADER_JSON});
        },

        async getEspacios (id) {
            return await fetchAsync(`${URL.server2}/api/location/space/viewcli`, "POST", {body: JSON.stringify(id), headers: HEADER_JSON});
        },

        async setTarea(data) {
            return await fetchAsync(`${URL.server2}/api/check/create`, "POST", {body: JSON.stringify(data), headers: HEADER_JSON});
        },
        
        async login (email, password) {
            return await fetchAsync(`${URL.server2}/api/usuarios/login`, "POST", {body: JSON.stringify({username: email, password}), headers: HEADER_JSON});
        },

        async signup (data) {
            return await fetchAsync(`${URL.server2}/api/usuarios/create`, "POST", {body: JSON.stringify(data), headers: HEADER_JSON});
        },
        
        async save_pregunta (data) {
            return await fetchAsync(`${URL.server2}/api/applicant_questions/create`, "POST", {body: JSON.stringify(data), headers: HEADER_JSON});
        },

        async UpdateProfile (data) {
            return await fetchAsync(`${URL.server2}/update`, "POST", {body: JSON.stringify(data), headers: HEADER_JSON});
        },
        
        async getServices (params = {}) {
            return await fetchAsync(`${URL.server2}/services`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async getServices (params = {}) {
            return await fetchAsync(`${URL.server2}/services`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async myServices (params = {}) {
            return await fetchAsync(`${URL.server2}/myservices`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async myServicesDomi (params = {}) {
            return await fetchAsync(`${URL.server2}/myservicesdomi`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setService (params = {}) {
            return await fetchAsync(`${URL.server2}/service`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setServiceData (params = {}) {
            return await fetchAsync(`${URL.server2}/servicedata`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setFile (params = {}) {
            return await fetchAsync(`${URL.server2}/setfile`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async getUser (params = {}) {
            return await fetchAsync(`${URL.server2}/getuser`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setAlerta (params = {}) {
            return await fetchAsync(`${URL.server2}/setalerta`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async Calificar (params = {}) {
            return await fetchAsync(`${URL.server2}/calificar`, "POST", {body: JSON.stringify(params), headers: HEADER_JSON});
        },
        
        async setLabor (id, value) {
            return await fetchAsync(`${URL.server2}/api/check/update`, "POST", {body: JSON.stringify({id, value}), headers: HEADER_JSON});
        },

        async signUp (fields)
        {
            const _fields = {
                email: fields.email, 
                nombres: fields.nombres,
                apellidos: fields.apellidos, 
                direccion: fields.direccion, 
                nacimiento: fields.nacimiento, 
                celular: fields.celular, 
                password: fields.password,
                municipio: fields.municipios.value,
                tipo: fields.tipo
            }

            if(fields.documento) _fields.documento = fields.documento
            if(fields.tipoSangre) _fields.t_sangre = fields.tipoSangre.label
            

            let response = await fetchAsync(`${URL.server2}/signup/`, "POST", {body: JSON.stringify(_fields), headers: HEADER_JSON});
            
            if(!response.message.success)
            {
                response.error = true;
            }

            return response;
        },


    }
}


