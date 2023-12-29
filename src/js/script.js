const resultBox = document.querySelector('.result')

document.getElementById('btn-search').addEventListener('click', () => {
    const username = document.getElementById('search').value
    console.log('Nome de usuário:', username);
    userProfile(username)
})

async function getUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`)
    return await response.json()
}

function userProfile(username) {
    getUser(username).then(userData => {
        document.querySelector('.img-user').src = userData.avatar_url
        document.querySelector('.name').innerHTML = userData.name
        document.querySelector('.username').innerHTML = `<a href="${userData.html_url}" target="_blank">@${userData.login}</a>`
        document.querySelector('#location').innerHTML = userData.location ?? "Not available"
        document.querySelector('.description').innerHTML = userData.bio ?? "Readme not available. Visit the user's profile to view more about them, just click on the username."
        document.querySelector('#repository').innerHTML = userData.public_repos
        document.querySelector('#followers').innerHTML = userData.followers
        document.querySelector('#following').innerHTML = userData.following
    })
}