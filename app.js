emailjs.init("rt1v_cA4avrTQRGue"); 

// Array de preguntas y respuestas
const questions = [
    {
        question: "¿Cuál es el lenguaje principal de la web?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: "HTML",
        type: "multiple" // Tipo de pregunta
    },
    {
        question: "¿Qué significa CSS?",
        options: ["Color Style Sheets", "Cascading Style Sheets", "Computing Style Sheets", "Creative Style Sheets"],
        answer: "Cascading Style Sheets",
        type: "multiple"
    },
    {
        question: "¿En qué año se lanzó JavaScript?",
        options: ["1995", "1996", "1997", "1998"],
        answer: "1995",
        type: "multiple"
    },
    {
        question: "¿Qué es un algoritmo?",
        options: ["Un tipo de dato", "Un conjunto de instrucciones", "Un lenguaje de programación", "Un error en el código"],
        answer: "Un conjunto de instrucciones",
        type: "multiple"
    },
    {
        question: "¿Cuál es el sistema operativo más utilizado en servidores web?",
        options: ["Linux", "Windows", "MacOS", "Unix"],
        answer: "Linux",
        type: "multiple"
    },
    {
        question: "Escribe el nombre del lenguaje utilizado para crear aplicaciones móviles nativas en Android:",
        answers: ["Kotlin", "kotlin", "Es Kotlin", "es kotlin"], // Varias respuestas válidas
        type: "text" // Tipo de pregunta
    },
    {
        question: "¿Qué significa HTTP?",
        options: ["HyperText Transfer Protocol", "HyperText Transfer Program", "High Transfer Text Protocol", "HyperText Technical Protocol"],
        answer: "HyperText Transfer Protocol",
        type: "multiple"
    },
    {
        question: "¿Qué es una API?",
        options: ["Advanced Protocol Interface", "Application Programming Interface", "Android Programming Interface", "Access Protocol Interface"],
        answer: "Application Programming Interface",
        type: "multiple"
    },
    {
        question: "¿Qué framework de JavaScript es mantenido por Facebook?",
        options: ["Angular", "Vue", "React", "Ember"],
        answer: "React",
        type: "multiple"
    },
    {
        question: "¿Qué lenguaje se utiliza para consultas en bases de datos relacionales?",
        options: ["NoSQL", "HTML", "CSS", "SQL"],
        answer: "SQL",
        type: "multiple"
    }
];

// Seleccionar 5 preguntas aleatorias
const selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

const quizContainer = document.getElementById('quizContainer');
const quizForm = document.getElementById('quizForm');
const scoreContainer = document.getElementById('scoreContainer');
const scoreSpan = document.getElementById('score');
const resultsContainer = document.getElementById('resultsContainer');
const mail = document.getElementById("mail");
const timerDisplay = document.getElementById('timer');

// Configura el temporizador (por ejemplo, 5 minutos = 300000 ms)
const TIME_LIMIT = 20 * 60 * 1000; // 5 minutos en milisegundos
const END_TIME_KEY = 'quiz_end_time';

// Verifica si el usuario ya ha respondido
function checkIfAlreadyAnswered() {
    const endTime = localStorage.getItem(END_TIME_KEY);
    if (endTime && Date.now() < parseInt(endTime)) {
        // El cuestionario ya ha sido respondido o el tiempo no ha expirado
        quizContainer.innerHTML = '<h2>Ya has respondido este cuestionario o el tiempo ha expirado. Porfavor, revisa tu casilla de E-Mail para visualizarla, o bien consulte a su profesor.</h2>';
        $("#btnEnviar").addClass("hidden")
        $("#timerContainer").addClass("hidden")
        return true;
    }
    startTimer();
    return false;
}

// Configura el temporizador
function startTimer() {
    const endTime = Date.now() + TIME_LIMIT;
    localStorage.setItem(END_TIME_KEY, endTime.toString());
    
    function updateTimer() {
        const remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = '00:00';
            quizForm.querySelectorAll('input').forEach(input => input.disabled = true); // Desactiva el formulario
            alert('El tiempo ha expirado.');
        } else {
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);
            timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }
    
    updateTimer(); // Actualiza inmediatamente
    const timerInterval = setInterval(updateTimer, 1000);
}


// Cargar preguntas en el DOM
selectedQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    
    const questionText = document.createElement('p');
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);
    
    if (q.type === "multiple") {
        q.options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        });
    } else if (q.type === "text") {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = `question${index}`;
        input.placeholder = "Escribe tu respuesta aquí";
        questionDiv.appendChild(input);
    }

    quizContainer.appendChild(questionDiv);
});

// Calcular la puntuación y validar que todas las preguntas estén respondidas
quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let score = 0;
    let allAnswered = true;
    resultsContainer.innerHTML = ''; // Limpiar los resultados previos

    // Verificar si todas las preguntas han sido respondidas
    selectedQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        const textAnswer = document.querySelector(`input[name="question${index}"]`)?.value.trim();
        if (!selectedAnswer && q.type === "multiple" || (q.type === "text" && !textAnswer)) {
            allAnswered = false;
        }
    });

    // Si no todas las preguntas están respondidas, mostrar una alerta
    if (!allAnswered) {
        alert("Por favor, responde todas las preguntas antes de enviar el cuestionario.");
        return;
    }

    // Calcular puntuación y mostrar respuestas correctas/incorrectas si todas están respondidas
    selectedQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        const textAnswer = document.querySelector(`input[name="question${index}"]`)?.value.trim().toLowerCase();
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        
        if (q.type === "multiple") {
            if (selectedAnswer && selectedAnswer.value === q.answer) {
                score++;
                resultDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong> - <span class="correct">Correcto</span> | <strong>${q.answer}</strong>`;
            } else {
                resultDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong> - <span class="incorrect">Incorrecto</span>. Respuesta correcta: <strong>${q.answer}</strong>`;
            }
        } else if (q.type === "text") {
            const correctAnswers = q.answers.map(a => a.toLowerCase());
            if (correctAnswers.includes(textAnswer)) {
                score++;
                resultDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong> - <span class="correct">Correcto</span>`;
            } else {
                resultDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong> - <span class="incorrect">Incorrecto</span>. Respuesta correcta: <strong>${q.answers.join(', ')}</strong>`;
            }
        }

        resultsContainer.appendChild(resultDiv);
    });

    // Mostrar puntuación
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreSpan.textContent = score;

    const emailContent = `
    <html>
    <head>
        <style>
            .result {
                margin-bottom: 10px;
            }
            .correct {
                color: green;
            }
            .incorrect {
                color: red;
            }
        </style>
    </head>
    <body>
        <h2>Resultado del Cuestionario</h2>
        <p>Puntuación: ${score}</p>
        <div>${resultsContainer.innerHTML}</div>
    </body>
    </html>
`;
console.log($(mail).val())

    const emailParams = {
        to_email: 'gianborlenghi@abc.gob.ar', // Cambia esto por tu dirección de correo
        subject: 'Resultado del cuestionario',
        nombre:$("#nyap").val(),
        message:emailContent,
        mail:$(mail).val()+';gianborlenghi@abc.gob.ar'
    };

    emailjs.send('service_gfwx6fe', 'template_sobke27', emailParams)
        .then((response) => {
            console.log('Correo enviado exitosamente:', response);
        }, (error) => {
            console.error('Error al enviar el correo:', error);
        });

    $("#timerContainer").addClass("hidden")

    $("#btnEnviar").addClass("hidden")



});

