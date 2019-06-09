//const axios = require('axios');
const imgPreview = document.getElementById("img-priview"),
imgUploader = document.getElementById("img-uploader"),
imgbar = document.getElementById("img_bar")

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/galbeiroc/image/upload';
const CLOUDINARY_UPLOAD = 'kvxyrzfa';


imgUploader.addEventListener('change', async (e) => {
    //console.log(e);
    const xfile = e.target.files[0];

    //Petición Post fetch
    //En este caso se va a utilizar axios es una biblioteca los cuales permite realizar peticiones http
    //se encargar de metodos y todo de manera mas compatible con los navegadores y  servidor 
    
    const formData = new FormData();
    formData.append('file', xfile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD);

    const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: { //Cabeceras HTTP, permiten darle mas info al servidor
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress(ev) {
            console.log(Math.round((ev.loaded * 100) / ev.total));
            const progress = (ev.loaded * 100) / ev.total;

            imgbar.setAttribute('value', progress);
        }
    });
    console.log(res)
    imgPreview.src = res.data.secure_url;
    
})