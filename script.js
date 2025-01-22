const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("username");
const profileContainer = document.getElementById("profile-container");
const errorMessage = document.getElementById("error-message");

//profile fields//
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const profileLink = document.getElementById("profile-link");

//fetch github user data//
async function fetchGitHubProfile(username){
    const url = `https://api.github.com/users/${username}`;
    try{
        const response = await fetch(url);

        if(! response.ok){
            throw new Error("User Not Found");
        }
        const data = await response.json();
        displayProfile(data);
    }
    catch(error){
        displayError(error.Message);
    }
}


//display profile data//
function displayProfile(data){
    //show the profile container and hide error messsage//
    profileContainer.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    //populate fields with data..
    avatar.src = data.avatar_url;
    name.innerText = data.name || "No name provided";
    bio.innerText = data.bio || "no bio provided";  
    followers.innerText = data.followers;
    following.innerText = data.following;
    repos.innerText = data.public_repos;
    profileLink.innerText = data.html_url;
}

//display error message//
function displayError(message){
    //show the error message and hide the profile container//
    errorMessage.innerText = message;
    errorMessage.classList.remove("hidden");
    profileContainer.classList.add("hidden");
}

//handle search button click//
searchButton.addEventListener("click", ()=>{
    const username = searchInput.value.trim();
    if(username){
        fetchGitHubProfile(username);
    }
})