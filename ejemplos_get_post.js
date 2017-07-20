function hacerGetDePersonajes() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ironhack-characters.herokuapp.com/characters");
    xhr.onreadystatechange = function(response) {
        if(xhr.readyState === 4){
        	console.log(xhr.responseText);
        }
    }
    xhr.send();
    return true;
}

function hacerPostDePersonajes(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://ironhack-characters.herokuapp.com/characters");
    xhr.onreadystatechange = function(response) {
        if(xhr.readyState === 4){
        	console.log(xhr.responseText);
        }
    }

    var data = new FormData();
    	data.append("name", "karen");
    	data.append("occupation", "living la vida loca xD");
    	data.append("debt", true);
    	data.append("weapon", "granadas");
    xhr.send(data);
    return true;

}