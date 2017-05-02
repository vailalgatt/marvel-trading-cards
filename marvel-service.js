function MarvelService() {
  var key = '?apikey=797a307637fe2fac8d3b9ec69d456f59';
  var baseUrl = 'http://gateway.marvel.com/v1/public/'

  var marvelCharacters = [];
  var myCharacters = [];

  function remove(a){
    marvelCharacters.splice(a, 1)
  }

  function removeMyTeam(b){
    myCharacters.splice(b, 1)
  }


  this.getMarvelCharacters = function () {
    //what should this function return
    return marvelCharacters
  }

  this.getMyCharacters = function () {
    //what should this function return
    return myCharacters
  }

  this.addToMyCharacters = function (id) {
    //in order to add a character to your list you will first need to find 
    //the character by its id in the marvelCharacters array
    //onAdd
    for (var i = 0; i < marvelCharacters.length; i++) {
      var character = marvelCharacters[i]
      if (character.id == id) {
        var a = i
        remove(a)
        if(myCharacters.length < 6){
        myCharacters.push(character)
        }
      }
    }
  }

  


  this.removeMyCharacter = function (id) {
    //you need to find the character that you want to remove by its id
    //and remove it.
    //onRemove
    for (var i = 0; i < myCharacters.length; i++) {
      var character = myCharacters[i]
      if (character.id == id) {
        var b = i
        removeMyTeam(b)
        marvelCharacters.push(character)
      }
    }
  }


  this.getCharacters = function (callWhenDone) {
    var data = localStorage.getItem('MarvelData')
    if (data) {
      marvelCharacters = JSON.parse(data);
      return callWhenDone(marvelCharacters)
    } //callback below
    $.get(baseUrl + 'characters' + key, function (response) {
      localStorage.setItem('MarvelData', JSON.stringify(response.data.results))
      marvelCharacters = response.data.results;
      callWhenDone(marvelCharacters)
    })
  }
}