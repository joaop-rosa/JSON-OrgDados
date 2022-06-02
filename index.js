import axios from "axios";
import mysql from "mysql";
import fs from "fs"

const conexaoBanco = mysql.createConnection({
    host: "joaorosa-orgdados.mysql.database.azure.com",
    user: "jpadmin",
    password: "Faccat14",
    database: "testeaula",
    port: 3306,
    ssl: { ca: fs.readFileSync("./ssl/DigiCertGlobalRootCA.crt.pem", "utf8") }
});
async function requestBlob() {
    const resposta = await axios.get("https://meteoritosjson.blob.core.windows.net/meteoritos/meteoritos.json?sp=r&st=2022-06-02T17:12:41Z&se=2022-06-03T01:12:41Z&spr=https&sv=2020-08-04&sr=b&sig=h46%2BbOadXE0JmThV1Uc0AYUeSk%2Fa6qy72q3SbFMgNVE%3D")
    return resposta.data
}

const meteoritos = await requestBlob()

conexaoBanco.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})

for (let index = 0; index < 10; index++) {
    delete meteoritos[index].geolocation
    conexaoBanco.query(
        'INSERT INTO meteoritos SET ?', meteoritos[index], (err, res) => {
            if (err) throw err
            console.log("Registro inserido")
        })
}

conexaoBanco.end((err) => {
    if(err) {
        console.log('Erro to finish connection...', err)
        return
    }
    console.log('The connection was finish...')
})



// conexaoBanco.query(
//     'INSERT INTO meteorito SET ?', newMeteorite, (err, res) => {
//     if (err) throw err

//     console.log(`New book added with ID: ${res.insertId}`)
// })