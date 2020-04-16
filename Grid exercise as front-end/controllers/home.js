import extend from '../scripts/loadPartials.js'
import Models from '../models/collectiveModel.js'
import * as rawData from '../public/js/MOCK_DATA.js'
let url = 'https://grid-data-deb8a.firebaseio.com/'

export default {
    getView: {
        home(context) {

            let data = JSON.parse(sessionStorage.getItem('allDocs'));

            context.allDocs = data;

            extend(context).then(function () {
                this.partial('../views/home/home.hbs')
            })

        },
        homeElse(context) {

            let allData = rawData.MOCKDATA;

            allData = allData.slice(0, 10);

            fetch(`${url}.json`)
                .then(x => x.json())
                .then(x => {

                    if (x !== null) {
                        context.redirect('#/home');
                        return;
                    }

                    for (let singleDataRecord of allData) {

                        fetch(`${url}.json`, {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            mode: 'cors', // no-cors, *cors, same-origin
                            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            credentials: 'same-origin', // include, *same-origin, omit
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            redirect: 'follow', // manual, *follow, error
                            referrerPolicy: 'no-referrer', // no-referrer, *client
                            body: JSON.stringify(singleDataRecord) // body data type must match "Content-Type" header
                        })
                            .then(response => response.json())
                            .then(response => {

                                let docId = response.name;
                                let singleDoc = { docId: docId, ...singleDataRecord };

                                return fetch(`${url}/${docId}.json`, {
                                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                    mode: 'cors', // no-cors, *cors, same-origin
                                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                    credentials: 'same-origin', // include, *same-origin, omit
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    redirect: 'follow', // manual, *follow, error
                                    referrerPolicy: 'no-referrer', // no-referrer, *client
                                    body: JSON.stringify(singleDoc) // body data type must match "Content-Type" header
                                })
                            })
                    }
                })
                .then(x => {

                    fetch(`${url}.json`)
                        .then(response => response.json())
                        .then(data => {

                            sessionStorage.setItem('allDocs', JSON.stringify(data));

                            context.redirect('#/home');
                        })
                })
        }
    }
}