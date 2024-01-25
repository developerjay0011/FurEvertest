const Tokenheader = () => {
    return ({
        login: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
        Auth: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
            "Authorization": 'Bearer ' + global.token,
        },
        multipart: {
            "Content-Type": "multipart/form-data",
            "Authorization": 'Bearer ' + global.token
        },
        Paymentheaders: {
            'Content-Type': 'application/json',
            'x-client-id': '326506c738133dcf41909b4cf5605623',
            'x-client-secret': '2099c556eccfadc880330d71478f1afeef4cf86f',
            'x-api-version': '2022-09-01'
        },
    })
}
export default Tokenheader
