    const API_KEY= '41ec2fb9-3bf9-48ba-88de-03e157ec92fa';
    const BASE_URL = `https://api.harvardartmuseums.org/object?apikey=${ API_KEY}&hasimage=1&period=Modern&sort=id&size=50`;

    function buildPages({info : { totalrecords } }) {
        const pages = Math.ceil(totalrecords / 50)
        const page = window.location.hash.slice(1) || 1
        const pagerDiv = $('#pager')
        console.log(pages)
        for(let x = 1; x < pages; x++) {
            const anchor = $(`<a href="#${x}">`).text(x).addClass(`${page*1 === x ? 'selected' : ""}`)
            pagerDiv.append(anchor)
        }
    }

    function rendorRecord({title, description, primaryimageurl}) {
        const div = $("<div>").html(`
            <h3>${title}</h3>
            ${description ? `<p>${description}</p>` : "" }
            ${primaryimageurl ? `<img src="${primaryimageurl}" /> `: "" }
            <hr />
            `)
        return div
    }

    function renderToResults({records}) {
        const resultsDiv = $('#results')
        records.forEach(record => resultsDiv.append(rendorRecord(record)))
    }

    function emptyPageAndResults() {
        $('#pager').empty()
        $('#results').empty()
    }

    async function fetchData() {

        const page = window.location.hash.slice(1) || 1
        console.log(page)

        const response = await fetch(BASE_URL+"&page=" + page)
        const data = await response.json()
        console.log(data)

        
        emptyPageAndResults()
        buildPages(data)
        renderToResults(data)
        return data
    }

    fetchData()

    window.addEventListener('hashchange', fetchData)