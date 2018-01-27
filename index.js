'use strict';

const QUIZ = resetQuiz();

function resetQuiz() {
  return {
    state: 0,
    questions: [
      {
        question: 'Who holds the record for the most title defenses in the Heavyweight division of the UFC?',
        options: [ // first option is always the correct one
          'Stipe Miocic',
          'Randy Couture',
          'Cain Velasquez',
          'Conor McGregor'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'How many times has Conor McGregor defended the UFC Lightweight title since becoming champion at UFC 205 on November 12, 2016?',
        options: [ // first option is always the correct one
          '0, and should be stripped of the title at this point',
          '1',
          '2',
          '3'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'Who holds the record for the most title defenses in any division of the UFC?',
        options: [ // first option is always the correct one
          'Demetrious Johnson',
          'Anderson Silva',
          'Conor McGregor',
          'Georges St-Pierre'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'What is the correct ascending order of the following weight classes, Welterweight, Lightweight, Middleweight, Bantamweight, Featherweight?',
        options: [ // first option is always the correct one
          'Bantamweight, Featherweight, Lightweight, Welterweight, Middleweight',
          'Bantamweight, Featherweight, Welterweight, Lightweight, Middleweight',
          'Featherweight, Welterweight, Lightweight, Middleweight, Bantamweight',
          'Featherweight, Lightweight, Middleweight, Bantamweight, Welterweight'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'Who holds the current record for the most wins by knockout in the UFC?',
        options: [ // first option is always the correct one
          'Vitor Belfort',
          'Anderson Silva',
          'Frank Mir',
          'Conor McGregor'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'Who holds the current record for the most wins by submission in the UFC?',
        options: [ // first option is always the correct one
          'Royce Gracie',
          'Fabricio Werdum',
          'Georges St-Pierre',
          'Conor McGregor'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'Who holds the current record for the most wins by decision in the UFC?',
        options: [ // first option is always the correct one
          'Diego Sanchez',
          'Dan Henderson',
          'Georges St-Pierre',
          'Conor McGregor'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'One of the very first Mixed Martial Arts bouts took place on June 26, 1976 between Antonio Inoki and _____?',
        options: [ // first option is always the correct one
          'Muhammad Ali',
          'George Foreman',
          'Andre the Giant',
          'Conor McGregor'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'What is the most commonly used glove sized used in professional MMA?',
        options: [ // first option is always the correct one
          '4 oz',
          '8 oz',
          '10 oz',
          'Conor McGregor'
        ],
        correct: false,
        attempted: false,
        answer: null
      },
      {
        question: 'Which of these moves is considered illegal in most sanctioned MMA bouts?',
        options: [ // first option is always the correct one
          'Punches to the back of the head',
          'Conor McGregor',
          'Punches to the face',
          'Punches to the mid-section'
        ],
        correct: false,
        attempted: false,
        answer: null
      }
    ]
  };
}

function getCurrentQuestion(quiz) {
  return quiz.questions[quiz.state];
}

function getCurrentScore(quiz) {
  let score = 0;
  for(let i = 0; i < quiz.questions.length; i++) {
    let question = quiz.questions[i];
    if(question.correct) {
      score += 1;
    }
  }
  return score;
}

function startQuiz() {
  $('main').on('click', '#start-quiz', renderQuiz);
}

function updateQuiz() {

  $('main').on('click', '#answers', function(e) {

    let isButton = $(e.target).is('button');
    let answer = $(this).find('input:checked').val();

    if(isButton) {
      e.preventDefault();
    }

    // if the clicked form element is not a button or an answer input has not been checked, exit out of the function
    if(!isButton || !answer) {
      return;
    }

    let currentQuestion = getCurrentQuestion(QUIZ);
    let a = Number(answer);

    // if the question has already been attempted, do not allow the answer to be changed
    if(currentQuestion.attempted) {
      return;
    }

    if(currentQuestion.options[a] === currentQuestion.answer) {
      currentQuestion.correct = true;
    } else {
      currentQuestion.correct = false;
    }

    currentQuestion.attempted = currentQuestion.options[a];

    renderQuiz.call(this);

    // allow user to continue after submitting their answer
    $('.next').removeClass('disabled');
  });
}

function finishQuiz() {

  let container = $(this).closest('main');
  let score = getCurrentScore(QUIZ);

  let html = `
  <section class="text-center">
    <div>
      <span class="result">You got <strong>${score}</strong> out of <strong>${QUIZ.questions.length}</strong>!</span>
    </div>
    <a href="index.html">
      <button id="start-quiz" class="end">
        <span >Try Again</span>
        <svg viewBox="0 0 75 75" width="200px">
          <path d="m5,22 18,-18 28,0 18,18 0,28 -18,18, -28,0 -18,-18z" stroke="red" stroke-width="2" fill="black" />
        </svg>
      </button>
    </a>
  </section>
  `;

  container.html(html);
}

function nextQuestion() {

  $('main').on('click', '.next, .prev', function(e) {

    // prevent user from going back on the first question or going to the next question if they haven't selected their answer
    if(($(this).hasClass('prev') && QUIZ.state === 0) || ($(this).hasClass('next') && $(this).hasClass('disabled'))) {
      return;
    }

    // if the last question, go to the finish quiz page
    if(QUIZ.state === QUIZ.questions.length - 1 && $(this).hasClass('next')) {
      finishQuiz.call(this);
      return;
    }

    if($(this).hasClass('next')) {
      QUIZ.state++;
    } else {
      QUIZ.state--;
    }

    renderQuiz.call(this);

    // console.log(getCurrentQuestion(QUIZ));
  });
}

function renderQuiz(e) {

  let container = $(this).closest('main');
  let currentQuestion = getCurrentQuestion(QUIZ);
  let score = getCurrentScore(QUIZ);
  let options = [];
  let nextButtonState = '';
  let prevButtonState = '';
  let answerBoxTitle = 'Choose an answer';

  // randomize answers and set the correct answer if the question has not been attempted and the correct answer has not yet been set
  if(!currentQuestion.attempted && !currentQuestion.answer) {
    currentQuestion.answer = currentQuestion.options[0];
    currentQuestion.options = shuffle(currentQuestion.options);
  }

  // generate answer elements
  currentQuestion.options.forEach(function(option, i) {

    let atts = '';
    let parentAtts = '';

    atts += currentQuestion.attempted ? ' disabled' : '';

    if(currentQuestion.attempted && currentQuestion.answer === option) {
      atts += ' checked';
      parentAtts += ' class="correct"';
    }

    if(currentQuestion.attempted === option) {
      parentAtts += ' class="incorrect"';
    }

    let html = `
    <div${parentAtts}>
      <label>
        <input type="radio" name="answer" value="${i}"${atts}>${option}
      </label>
    </div>`;

    options.push(html);
  });

  // text for heading at the top of the title box
  if(currentQuestion.attempted && currentQuestion.correct) {
    answerBoxTitle = 'You were right!';
  } else if(currentQuestion.attempted && !currentQuestion.correct) {
    answerBoxTitle = 'You were wrong! The correct answer was ' + currentQuestion.answer + '.';
  }

  // disable or enable prev and next buttons accordingly
  if(QUIZ.state === 0) {
    prevButtonState = ' disabled';
  }

  if(!currentQuestion.attempted) {
    nextButtonState = ' disabled';
  }

  // assemble the template and insert it into the document
  let html = `
  <section id="question-box">

    <div id="question">
      <p><strong>Question #${QUIZ.state + 1}:</strong> ${currentQuestion.question}</p>
    </div>

    <form id="answers" action="">

      <fieldset>
        <legend>${answerBoxTitle}</legend>
        ${options.join('')}
      </fieldset>

      <button type="submit">Submit Answer</button>
    </form>
  </section>

  <section id="interface" class="text-center">
    <ul class="interface-heading">
      <li>Question</li>
      <li>Score</li>
      <li>Back</li>
      <li>Next</li>
    </ul>
    <ul class="interface-value">
      <li>${QUIZ.state + 1}/10</li>
      <li>${score}/10</li>
      <li class="prev${prevButtonState}" role="button"><</li>
      <li class="next${nextButtonState}" role="button">></li>
    </ul>
  </section>
  `;

  container.html(html);
  // console.log(QUIZ);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initQuiz() {
  startQuiz();
  updateQuiz();
  nextQuestion();
}

$(initQuiz);
