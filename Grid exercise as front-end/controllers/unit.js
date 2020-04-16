import extend from '../scripts/loadPartials.js'
import Models from '../Models/collectiveModel.js'
let url = 'https://grid-data-deb8a.firebaseio.com/';
let isFiltered = false;

export default {
    getView: {
        sort(context) {

            let { criteria } = context.params;

            const sortOptions = {
                identification: (data) => data.sort((a, b) => Number(a['id']) - (Number(b['id']))),
                firstName: (data) => data.sort((a, b) => a['first_name'].localeCompare(b['first_name'])),
                lastName: (data) => data.sort((a, b) => a['last_name'].localeCompare(b['last_name'])),
                email: (data) => data.sort((a, b) => a['email'].localeCompare(b['email'])),
                position: (data) => data.sort((a, b) => a['job_title'].localeCompare(b['job_title'])),
                department: (data) => data.sort((a, b) => a['department'].localeCompare(b['department'])),
            }

            fetch(`${url}.json`)
                .then(response => response.json())
                .then(data => {

                    let allDocs = Object.entries(data).map(([docId, value]) => ({ docId, ...value }));

                    let sortedData = sortOptions[criteria](allDocs);
                    sessionStorage.setItem('allDocs', JSON.stringify(sortedData));

                    context.redirect('#/home');
                })
        },
        filter(context) {

            let { criteria } = context.params;

            fetch(`${url}.json`)
                .then(response => response.json())
                .then(data => {

                    let allDocs = Object.entries(data).map(([docId, value]) => ({ docId, ...value }));

                    if (isFiltered) {
                        isFiltered = false;
                        console.log('false');
                        sessionStorage.setItem('allDocs', JSON.stringify(allDocs));
                    }else {
                        let filteredData = allDocs.filter(x => x.department === criteria);
                        sessionStorage.setItem('allDocs', JSON.stringify(filteredData));
                        isFiltered = true;
                        console.log('true');
                    }

                    context.redirect('#/home');
                })
        }
    },
    postRequest: {
    },
    deleteRequest: {
        deleteDoc(context) {

            let { docId } = context.params;

            fetch(`${url}${docId}.json`, {
                method: 'DELETE'
            })
                .then(response => {
                    context.redirect('#/home')
                })
        }
    },
    putRequest: {
    }
}