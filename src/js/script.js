async function getUser(user) {
    const response = await fetch(`https://api.github.com/users/${user}`)
    return await response.json()
}

async function getUserRepos(user) {
    const response = await fetch(`https://api.github.com/users/${user}/repos`)
    return await response.json()
}

function userProfile(user) {
    getUser(user).then(userData => {
        document.querySelector('.img-user').src = userData.avatar_url
        document.querySelector('.name').innerHTML = userData.name
        document.querySelector('.username').innerHTML = `@${userData.login}`
        document.querySelector('#location').innerHTML = userData.location ?? "Not available"

        document.querySelector('#company').innerHTML = userData.company ?? "Company not available"
        document.querySelector('#join').innerHTML = `Joined at ${userData.created_at}`
        document.querySelector('#github').innerHTML = `<a href="${userData.html_url}" target="_blank">github.com/${userData.login}</a>`
        document.querySelector('#update').innerHTML = `Last update: ${userData.updated_at}`

        document.querySelector('.description').innerHTML = userData.bio ?? "Bio not available."
        document.querySelector('#repository').innerHTML = userData.public_repos
        document.querySelector('#followers').innerHTML = userData.followers
        document.querySelector('#following').innerHTML = userData.following

        const userNotFound = userData.message === 'Not Found';

        resultBox.style.display = userNotFound ? 'none' : 'flex';
        notFound.style.display = userNotFound ? 'block' : 'none';

    })

}

function userRepos(user) {
    getUserRepos(user).then(reposData => {
        let reposItems = ''

        reposData.forEach(repo => {
            reposItems += `<li><a href="${repo.html_url}">${repo.name}</a></li>`
        })

        document.querySelector('.repos-ul').innerHTML = reposItems
    })
}

const resultBox = document.querySelector('.result')
const notFound = document.querySelector('.not-found')
const inputSearch = document.getElementById('search')

inputSearch.addEventListener('keyup', (e) => {
    e.preventDefault()
    const user = e.target.value
    const keyCap = e.which || e.keyCode

    if (keyCap === 13) {
        userProfile(user)
        userRepos(user)
    }
})

document.getElementById('btn-search').addEventListener('click', (e) => {
    e.preventDefault()
    const user = inputSearch.value
    userProfile(user)
    userRepos(user)
})