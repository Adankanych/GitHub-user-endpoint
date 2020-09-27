'use strict';

function getHubRepos (username) {
    //generate the url
    const url = `https://api.github.com/users/${username}/repos`;
    const options = {
        headers: new Headers ({
            Accept: "application/vnd.github.v3+json"
        })
    };
    console.log(`Finding repos for ${username}`);

    fetch(url, options)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults (responseJson){

  console.log(responseJson);
  //remove previous results
  $('#results-list').empty();
  // add a link for each repo listed in DOM
  responseJson.forEach(obj =>
    $('#results-lists').append(
        `<li><a href='${obj.url}'>${obj.name}</a></h3>
        </li>`)
    
    );
    // set the username equal to the search
    $("#username").text(`${username}`);
    //display section with results
    $('#results').removeClass('hidden');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const username = $('#js-search-user').val();
        getHubRepos(username);
    });
}

$(watchForm);