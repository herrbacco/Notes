// Set up the page when it loads.
$(function() {
  // attach the form submission to the search function
  $('#search-form').submit(search);
  $('button').click(search);
});

function search(event) {
  // Stop the form from changing the page.
  event.preventDefault();
//console.log("searching...");
  clearSearchResults();

  // Get the users search input and save it in a variable.
  // Use the input placeholder value (like "kittens") as a default value.
  var searchTerm = $('#query').val();
  console.log(searchTerm);
  var resultsArr = [];

  if(!searchTerm){searchTerm = 'kittens';}

  $.get('https://www.reddit.com/search.json', {
    q:searchTerm
  }).done(function(data){ //data = {"kind": "Listing", "data": {"after": null, "dist": 0, "facets": {}, "modhash": "", "whitelist_status": "all_ads", "children": [], "before": null}}
    data.data.children.forEach(function(el){
      addSearchResult(el);
      console.log("searched w/" + el);
    });
  });
}

// Clear previous search results.
function clearSearchResults() {
  $('#results').html('');
}

// Adds a single result object to the page.
function addSearchResult(result) {

  var li = $("<li>");
  li.append('<a href="https://reddit.com'+result.data.permalink+'">'+result.data.title+'</a>');

  $('#results')
  .append(li);
}
