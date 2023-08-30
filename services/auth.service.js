import axios from "../utils/Axios"

const signIn = ({ email, password, device_name }) => {
    return new Promise((resolve, reject) => {
        axios.post('/login', { email, password, device_name })
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

const signUp = ({
    nama,
    email,
    password,
    nik,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
    no_telpon,
    pekerjaan,
    alamat,
    device_name
}) => {
    return new Promise((resolve, reject) => {
        axios.post('/register', {
            nama,
            email,
            password,
            nik,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin: jenis_kelamin === 'Laki-laki' ? 'L' : 'P',
            no_telpon,
            pekerjaan,
            alamat,
            device_name
        })
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

const signOut = () => {
    return new Promise((resolve, reject) => {
        axios.post('/logout')
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export { signUp, signIn, signOut }