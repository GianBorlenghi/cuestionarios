
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"; // Si necesitas autenticación


const questions = [
    {
        question: "¿Qué es una computadora?",
        options: ["Un buscador de información", "Un dispositivo electronico capaz de procesar y almacenar información", "Un dispositivo con circuitos integrados"],
        answer: "Un dispositivo electronico capaz de procesar y almacenar información",
        type: "multiple" // Tipo de pregunta
    },
    {
        question: "¿Que simbolo se utiliza en EXCEL para realizar una formula o una operación?",
        options: ["=", "/", "*", "+"],
        answer: "=",
        type: "multiple"
    },
    {
        question: "¿Que empresa creó Excel?",
        options: ["Microsoft", "Apple", "HP"],
        answer: "Microsoft",
        type: "multiple"
    },
    {
        question: "¿Qué es el hardware de una computadora?",
        options: ["Un tipo de dato", "Toda la parte fisica de la computadora", "La parte lógica", "Un error"],
        answer: "Toda la parte fisica de la computadora",
        type: "multiple"
    },
    {
        question: "¿Cuál de los siguientes pertenece al hardware de la computadora?",
        options: ["Google Chrome", "Windows", "Memoria RAM", "iOS"],
        answer: "Memoria RAM",
        type: "multiple"
    },
    {
        question: "¿Que tipo de software es Windows?",
        options: ["Aplicación", "Sistema", "Programación", "Gestión"], // Varias respuestas válidas
        answer:"Sistema",
        type: "multiple" // Tipo de pregunta
    },
    {
        question: "¿Que es un periferico?",
        options: ["Es un dispositivo auxiliar e independiente de la computadora que se conecta a la placa base.", "Es un sistema operativo"],
        answer: "Es un dispositivo auxiliar e independiente de la computadora que se conecta a la placa base.",
        type: "multiple"
    },
    {
        question: "¿Qué función cumplen los periféricos de entrada?",
        options: ["Muestran o proyectan información hacia el exterior del ordenador.", "Permiten introducir datos o información en una computadora para que los procese."],
        answer: "Permiten introducir datos o información en una computadora para que los procese.",
        type: "multiple"
    },
    {
        question: "¿Qué función cumplen los periféricos de salida?",
        options: ["Permiten introducir datos o información en una computadora para que los procese.", "Muestran o proyectan información hacia el exterior del ordenador."],
        answer: "Muestran o proyectan información hacia el exterior del ordenador.",
        type: "multiple"
    },
    {
        question: "El sistema binario utiliza:",
        options: ["Un número", "Dos números", "Diez números"],
        answer: "Dos números",
        type: "multiple"
    },
    {
        question: "El sistema binario es utilizado por la computadora y todos los dispositivos electrónicos",
        options: ["Verdadero","Falso"],
        answer: "Verdadero",
        type: "multiple"
    },
    {
        question: "La unidad mas básica de información es",
        options: ["El bit","El byte"],
        answer: "El bit",
        type: "multiple"
    },
    {
        question: "1 byte equivale a ",
        options: ["2 bits","6 bits","8 bits"],
        answer: "8 bits",
        type: "multiple"
    },
    {
        question: "El sistema binario es un sistema en base dos.",
        options: ["Verdadero","Falso"],
        answer: "Verdadero",
        type: "multiple"
    },
    {
        question: "El atajo de teclado CTRL + C sirve para:",
        options: ["Copiar","Pegar","Cortar","Borrar"],
        answer: "Copiar",
        type: "multiple"
    },
    {
        question: "El atajo de teclado CTRL + X sirve para:",
        options: ["Copiar","Pegar","Cortar","Borrar"],
        answer: "Cortar",
        type: "multiple"
    },
    {
        question: "El atajo de teclado CTRL + V sirve para:",
        options: ["Copiar","Pegar","Cortar","Borrar"],
        answer: "Pegar",
        type: "multiple"
    },
    {
        question: "El atajo de teclado CTRL + Z sirve para:",
        options: ["Copiar","Pegar","Cortar","Borrar","Deshacer"],
        answer: "Deshacer",
        type: "multiple"
    },
    {
        question: "¿Qué extensión tienen los libros de Excel?",
        options: [".DOC",".XLS",".JPEG",".TXT"],
        answer: ".XLS",
        type: "multiple"
    },
    {
        question: "La hoja de cálculo de Excel, esta definida por:",
        options: ["Filas","Columnas","Celdas","Columnas y filas","Filas, columnas y celdas"],
        answer: "Filas, columnas y celdas",
        type: "multiple"
    },
    {
        question: "Supongamos que quiero sumar la celda A5 y la celda D2 en la celda E1, ¿Que debo escribir?",
        answers: ["=A5+D2","=a5+d2","=d2+a5","=D2+A5"],
        type: "text"
    },
    {
        question: "El rango en Excel es:",
        options: ["Una celda","La selección de celdas contiguas"],
        answer: "La selección de celdas contiguas",
        type: "multiple"
    },
    {
        question: "B2:C9 es un ejemplo de rango en Excel",
        options: ["Verdadero","Falso"],
        answer: "Verdadero",
        type: "multiple"
    },
    {
        question: "¿Cual de los siguientes símbolos, es un operador aritmético?",
        options: ["$","&","¬","*"],
        answer: "*",
        type: "multiple"
    },
    {
        question: "La placa base, ¿forma parte del software o del hardware?",
        options: ["Software","Hardware"],
        answer: "Hardware",
        type: "multiple"
    },
    {
        question: "Microsoft Excel, ¿es un software?",
        options: ["Verdadero","Falso"],
        answer: "Verdadero",
        type: "multiple"
    },
    {
        question: "¿Microsoft PowerPoint, Microsoft Word son parte del paquete office?",
        options: ["Verdadero","Falso"],
        answer: "Verdadero",
        type: "multiple"
    }
];

const firebaseConfig = {
    apiKey: "AIzaSyDGIWfXGuqUmTFblk78s-zogcE9FMtKia8",
    authDomain: "qrcode-ead83.firebaseapp.com",
    projectId: "qrcode-ead83",
    storageBucket: "qrcode-ead83.appspot.com",
    messagingSenderId: "802090216167",
    appId: "1:802090216167:web:d28899dc1b35730c8e5042",
    measurementId: "G-YHTKZQ73M1"       
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

emailjs.init("rt1v_cA4avrTQRGue");  

const params = new URLSearchParams(window.location.search);
const categoria = params.get('t');

const quizContainer = document.getElementById('quizContainer');
const timerDisplay = document.getElementById('timer');
const resultsContainer = document.getElementById('resultsContainer');
const scoreContainer = document.getElementById('scoreContainer');
const scoreSpan = document.getElementById('scoreSpan');
const quizForm = document.getElementById('quizForm'); // Asegúrate de que este elemento exista
const TIME_LIMIT = 20 * 60 * 1000; // 20 minutos
const END_TIME_KEY = `quiz_end_time_${categoria}`; // Temporizador por categoría

// Variable para almacenar preguntas seleccionadas
let selectedQuestions = [];

// Función para traer las preguntas desde Firestore según la categoría
async function fetchQuestions() {
    const questionsRef = collection(db, 'questions'); // Asegúrate de que 'questions' es el nombre correcto de tu colección
    const q = query(questionsRef, where('cat', '==', categoria));
    const querySnapshot = await getDocs(q);
    
    const questions = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        questions.push({
            question: data.question,
            options: data.options,
            answer: data.answer,
            type: data.type
        });
    });
    
    return questions;
} 

// Configuración del temporizador
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

// Verificar si el cuestionario ya fue respondido
function checkIfAlreadyAnswered() {
    const endTime = localStorage.getItem(END_TIME_KEY);
    if (endTime && Date.now() < parseInt(endTime)) {
        quizContainer.innerHTML = '<h2>Ya has respondido este cuestionario o el tiempo ha expirado. Por favor, revisa tu casilla de E-Mail para visualizarla, o bien consulte a su profesor.</h2>';
        $("#btnEnviar").addClass("hidden");
        $("#timerContainer").addClass("hidden");
        return true;
    }
    startTimer();
    return false;
}

// Cargar preguntas en el DOM
function loadQuestions(questions) {
    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10); // Selecciona 10 preguntas aleatorias

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
                input.name = `question${index}`; // Nombre único por pregunta
                input.value = option; // Valor del radio
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });
        } else if (q.type === "text") {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `question${index}`; // Nombre único por pregunta
            input.placeholder = "Escribe tu respuesta aquí";
            questionDiv.appendChild(input);
        }

        quizContainer.appendChild(questionDiv);
    });
}

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

    if (!allAnswered) {
        alert("Por favor, responde todas las preguntas antes de enviar el cuestionario.");
        return;
    }
    $("#btnEnviar").addClass('hidden')
    // Calcular puntuación
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
                resultDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong> - <span class="correct">Correcto</span> | <strong>${textAnswer}</strong>`;
            } else {
                resultDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong> - <span class="incorrect">Incorrecto</span>. Respuesta correcta: <strong>${q.answers.join(', ')}</strong>`;
            }
        }

        resultsContainer.appendChild(resultDiv);
    });

    // Mostrar puntuación y enviar por correo
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

    const emailParams = {
        to_email: 'gianborlenghi@abc.gob.ar', // Cambia esto por tu dirección de correo
        subject: 'Resultado del cuestionario',
        nombre: localStorage.getItem("nyap"),
        message: emailContent,
        mail: localStorage.getItem("mail") + ';gianborlenghi@abc.gob.ar'
    };

    emailjs.send('service_gfwx6fe', 'template_sobke27', emailParams)
        .then((response) => {
            alert('Resultado enviado correctamente');
            console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
            alert('Error al enviar el resultado. Intenta nuevamente.');
            console.log('FAILED...', err);
        });

        
});



// Iniciar el cuestionario
async function startQuiz() {
    const questions = await fetchQuestions();
    if (!checkIfAlreadyAnswered()) {
        loadQuestions(questions);
    }
}

startQuiz();