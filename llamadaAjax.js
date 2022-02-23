window.onload = function() {
    abirirTrivial();
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
function abirirTrivial() {
    document.getElementById("resultado").style.display = 'none';
    numQuestion = 0;
    correctAnswers = 0;
    results = {}; 


    var ajax = objetoAjax();

    ajax.open("GET", "https://opentdb.com/api.php?amount=10&category=18", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            results = respuesta.results;
            console.log(results);
            question(results);
        }
    }
    ajax.send();
}

function question(preguntas) {
    let divPreguntas = document.getElementById('preguntas');
    document.getElementById("preguntas").style.display = 'block';
    for (let i = 0; i < preguntas.length; i++) {
        if (numQuestion == i) {
            if (preguntas[i].type == "boolean") {
                divPreguntas.innerHTML = `<b>` + preguntas[i].question + `</b>
                <button class="btn btn-primary btn-lg btn-block" id="true" onclick="vercorrecto(true); return false;" value="` + preguntas[i].correct_answer + `">` + preguntas[i].correct_answer + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="false" onclick="vercorrecto(false); return false;" value="` + preguntas[i].incorrect_answers[0] + `">` + preguntas[i].incorrect_answers[0] + `</button>
                <button class="btn btn-dark btn-lg btn-block" id='nextQuestion'>Next question</button>`
            } else {
                divPreguntas.innerHTML = `<b>` + preguntas[i].question + `</b>
                <button class="btn btn-primary btn-lg btn-block" id="true" onclick="vercorrecto(true)"; return false;value="` + preguntas[i].correct_answer + `">` + preguntas[i].correct_answer + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="false1" onclick="vercorrecto(false)"; return false;" value="` + preguntas[i].incorrect_answers[0] + `">` + preguntas[i].incorrect_answers[0] + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="false2" onclick="vercorrecto(false); return false;" value="` + preguntas[i].incorrect_answers[1] + `">` + preguntas[i].incorrect_answers[1] + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="false3" onclick="vercorrecto(false); return false;" value="` + preguntas[i].incorrect_answers[2] + `">` + preguntas[i].incorrect_answers[2] + `</button>
                <button class="btn btn-dark btn-lg btn-block" id='nextQuestion'>Next question</button>`
            }
        }
        let nextquestion = document.getElementById('nextQuestion');
        nextquestion.onclick = function() {
            if (numQuestion == 10) {
                document.getElementById("resultado").style.display = 'block';
                divPreguntas.style.display = 'none';
                document.getElementById('quantityCorrect').innerText = "Has acertado: " + correctAnswers+" preguntas! Enhorabuena!!!";
                document.getElementById('playAgain').onclick = function() {
                    abirirTrivial();
                }
            } else {
                question(preguntas);
            }
        }
    }

}

function vercorrecto(iscorrect) {
    if (iscorrect == true) {
        correctAnswers++
        document.getElementById("true").className = "btn btn-success btn-lg btn-block";
        document.getElementById("true").disabled = "disabled";
        if (document.getElementById("false") != null) {
            document.getElementById("false").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("false").disabled = "disabled";
        } else {
            document.getElementById("false1").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("false2").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("false3").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("false1").disabled = "disabled";
            document.getElementById("false2").disabled = "disabled";
            document.getElementById("false3").disabled = "disabled";
        }
    } else {
        if (document.getElementById("false") != null) {
            document.getElementById("false").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("true").className = "btn btn-success btn-lg btn-block disabled";
            document.getElementById("true").disabled = "disabled";
            document.getElementById("false").disabled = "disabled";
        } else {
            document.getElementById("false1").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("false2").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("false3").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("false1").disabled = "disabled";
            document.getElementById("false2").disabled = "disabled";
            document.getElementById("false3").disabled = "disabled";
            document.getElementById("true").className = "btn btn-success btn-lg btn-block disabled";
            document.getElementById("true").disabled = "disabled";
        }
    }
    numQuestion++;
}