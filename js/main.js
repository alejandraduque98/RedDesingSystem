window.onload = function(){
    init();
}

var init = function(){
    // capturo storage
    miStorage = window.localStorage;

    // verificar si existe variable arrayQuestions
    var arrayQuestions = JSON.parse(miStorage.getItem("arrayQuestions"));

    if(arrayQuestions == null){
        // creacion de arreglo 
        arrayQuestions = [];

        // agregar preguntas
        arrayQuestions.push({
            QuestionTxt : "I have the customer information needed to proactively help customers achive their goals with Oracle",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "With Oracle i have a tool that makes my work with the client easier",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "Would you recommend Oracle to your clients or acquaintances?",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "the current tool for working with Oracle meets the expectations of performance and speed",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "It is easy to understand the tools used to provide information to Oracle customers.",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "How would you rate our products?",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "you would improve the storage capacity of our work tool",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "Each person has the necessary tools for the correct performance of their work",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "The opinions of your collaborators are taken into account",
            ScoreQuestion : 0
        });

        arrayQuestions.push({
            QuestionTxt : "the work tool It meets the functionalities and all the needs of my team and my clients",
            ScoreQuestion : 0
        });

        miStorage.setItem('arrayQuestions', JSON.stringify(arrayQuestions));
        arrayQuestions = JSON.parse(miStorage.getItem("arrayQuestions"));
    }

    // verificar si existe variable indexCurrentQ
    var indexCurrentQ = parseInt(miStorage.getItem("indexCurrentQ"));

    if(isNaN(indexCurrentQ)){
        miStorage.setItem("indexCurrentQ",0);
        indexCurrentQ = parseInt(miStorage.getItem("indexCurrentQ"));
    }

    if(indexCurrentQ > 9){
        // redireccion a Score.html
        window.location.assign("/Pages/Score.html");
    }

    // pintar pregunta actual
    drawData(arrayQuestions, indexCurrentQ);
}

var drawData = function(ArrayQ, index){

    // pintar pregunta
    var p_question = document.querySelector("#question_label");
    p_question.innerHTML = ArrayQ[index].QuestionTxt;

    // pintar current_question
    var h1_question = document.querySelector("#current_question");
    h1_question.innerHTML = "Question "+(index+1)+"/10";

    // pintar score
    var total_score = document.querySelector("#score_total");
    total_score.innerHTML = calculateScore(ArrayQ);

    // pintar percentage
    var percentage = document.querySelector("#percentage");
    percentage.style["width"] = calculatePercentage(ArrayQ)+"%";
}

var calculateScore = function(ArrayQ){
    var suma = 0;

    for(var i = 0; i < ArrayQ.length; i++){
        suma += ArrayQ[i].ScoreQuestion;
    }

    return suma;
}

var calculatePercentage = function(ArrayQ){
    var indexes = [];
    var i;
    for(i = 0; i < ArrayQ.length; i++)
        if (ArrayQ[i].ScoreQuestion !== 0)
            indexes.push(i);
    
    var question_success = indexes.length;

    return question_success * 10;
}

var clickAction =  function(puntaje){
    miStorage = window.localStorage;
    var indexCurrentQ = parseInt(miStorage.getItem("indexCurrentQ"));
    var arrayQuestions = JSON.parse(miStorage.getItem("arrayQuestions"));

    arrayQuestions[indexCurrentQ].ScoreQuestion = puntaje;

    miStorage.removeItem("indexCurrentQ");
    miStorage.removeItem("arrayQuestions");
    miStorage.setItem("indexCurrentQ",indexCurrentQ+1);
    miStorage.setItem("arrayQuestions",JSON.stringify(arrayQuestions));

    if(indexCurrentQ+1 > 9){
        // redireccion a Score.html
        window.location.assign("/Pages/Score.html");
    }
    else{
        var tempIndex = parseInt(miStorage.getItem("indexCurrentQ"));
        var tempArray = JSON.parse(miStorage.getItem("arrayQuestions"));
        drawData(tempArray, tempIndex);
    }

} 
var redirect = function(){
    window.location.assign("/Pages/Start-Survey.html");
}