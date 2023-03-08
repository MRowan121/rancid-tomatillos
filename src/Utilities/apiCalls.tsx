const url = 'https://rancid-tomatillos.herokuapp.com/api/v2'

const getAllData = (urlParams: string) => {
    return fetch(`${url}${urlParams}`)
        .then(res => {
            if(!res.ok) {
                throw new Error('Something went wrong')
            }
            return res.json()
        })
}

export { getAllData }