var axios = require("axios").default;

const MailParser = async (data) => {
    const apiKey = process.env.REACT_APP_NEWSCATCHER_API_KEY;

    var options = {
        method: 'GET',
        url: '',
        headers: {
            'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    };

    const res = await axios.request(options)
        .then(function (response) {
                console.log(response.data)
                return (response.data);
            }).catch(function (error) { 
                console.error(error);
        });
    return res;
}

export default MailParser;