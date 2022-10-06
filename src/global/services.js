export const URL = {
    server2: "http://3.224.170.223:3000",
    //server2: "http://imperacore.net:3013",

}



const HEADER_JSON =  { 'content-type': 'application/json',  "api": "Amma2022" } 

const HTTP_REQUEST_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
}

const fetchAsync = async (url, method, { body = {}, headers = {'content-type': 'application/json'}} = {}) => 
{
    const form = (method === HTTP_REQUEST_METHOD.GET || method === HTTP_REQUEST_METHOD.HEAD) ? { method, headers } : { method, headers, body };
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
    },

    POST: {

        async login (email, password) {
            return await fetchAsync(`${URL.server2}/api/usuarios/login`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify({username: email, password}), headers: HEADER_JSON});
        },
        
        async save_pregunta (data) {
            return await fetchAsync(`${URL.server2}/api/applicant_questions/create`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(data), headers: HEADER_JSON});
        },

        async UpdateProfile (data) {
            return await fetchAsync(`${URL.server2}/update`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(data), headers: HEADER_JSON});
        },
        
        async getServices (params = {}) {
            return await fetchAsync(`${URL.server2}/services`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async getServices (params = {}) {
            return await fetchAsync(`${URL.server2}/services`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async myServices (params = {}) {
            return await fetchAsync(`${URL.server2}/myservices`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async myServicesDomi (params = {}) {
            return await fetchAsync(`${URL.server2}/myservicesdomi`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setService (params = {}) {
            return await fetchAsync(`${URL.server2}/service`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setServiceData (params = {}) {
            return await fetchAsync(`${URL.server2}/servicedata`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async setFile (params = {}) {
            return await fetchAsync(`${URL.server2}/setfile`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async getUser (params = {}) {
            return await fetchAsync(`${URL.server2}/getuser`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },


        async setAlerta (params = {}) {
            return await fetchAsync(`${URL.server2}/setalerta`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
        },

        async Calificar (params = {}) {
            return await fetchAsync(`${URL.server2}/calificar`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(params), headers: HEADER_JSON});
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
            

            let response = await fetchAsync(`${URL.server2}/signup/`, HTTP_REQUEST_METHOD.POST, {body: JSON.stringify(_fields), headers: HEADER_JSON});
            
            if(!response.message.success)
            {
                response.error = true;
            }

            return response;
        },


    }
}


const FormUrlEncoded = (params) => 
{
    return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
}


const TwoLevelFormUrlEncoded = (params) => 
{
    let urlEncoded = '';

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            for (const childkey in params[key]) {
                if (params[key].hasOwnProperty(childkey)) {
                    urlEncoded += encodeURIComponent(key + '[' + childkey + ']') + '=' + encodeURIComponent(params[key][childkey]) + '&';
                }
            }            
        }
    }
    
    return urlEncoded;
}


const ArrayFormUrlEncoded = (params) => 
{
    let urlEncoded = '';

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            for (const childkey in params[key]) {
                if (params[key].hasOwnProperty(childkey)) {
                    for (const childOfChildKey in params[key][childkey]) {
                        if (params[key][childkey].hasOwnProperty(childOfChildKey)) {
                            urlEncoded += encodeURIComponent(key + '[' + childkey + ']' + '[' + childOfChildKey + ']' ) + '=' + encodeURIComponent(params[key][childkey][childOfChildKey]) + '&';
                        }
                    }
                }
            }
        }
    }
    
    return urlEncoded;
}

