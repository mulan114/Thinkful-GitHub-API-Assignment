'use strict';


function displayRespositories(repos) {
	console.log('displaying repositories in DOM');
	$('#results-list').empty(); //empty the screen of old results
	for (let i=0; i<repos.length; i++) {
		$('#results-list').append(
			`<li> <h3>${repos[i].name}</h3> 
			 <p><a href="${repos[i].url}">${repos[i].url}</p>
			 </li>`)
	}
	$('#results').removeClass('hidden');
}

function getRepositories(user) {
	console.log('getting respositories');
	fetch(`https://api.github.com/users/${user}/repos`)
		.then(response => {
			if (response.ok) {
				return response.json()
			}
			throw new Error(response.statusText);
		})
		.then(responseJson => displayRespositories(responseJson))
		.catch(error => alert('This user handle is not in our database. Please try again.'))
}

function watchForm() {
  $('button').click(event => {
    console.log('clicking button');
    event.preventDefault();
    let userhandle = $('input').val();
    console.log(userhandle);
    getRepositories(userhandle);
  });
}

$(function() {
  console.log('Mulan GitHub Repositories App loaded! Waiting for submit!');
  watchForm();
});
