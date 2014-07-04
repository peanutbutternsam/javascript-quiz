$(newGame);

function newGame() {

    var $movies = $('.movies'),

        // could be it's own class Quiz = new Quiz('#quiz');
        $quiz = $('.movie-desc'),
        movieQuestion = {},
        
        // the movie data or "schema" for the quiz 
        movieData = {
            id: '',
            title: ''
        },
        movies = [];

    // make each element with class .movies draggable and available in the schema
    $movies.each(function () {
        
        var $this = $(this),
            id = $this.attr('id'),
            title = $this.find('img').attr('alt');

        $(this).draggable({
            containment: 'document',
            revert: true,
            zIndex: 100
        });

        movies.push({id: id, title: title});

    });

    $('.new-quiz').click(function (e) {
        $movies.each(function () {
            $(this).css({
                'top': '',
                'left': ''
            }).draggable('enable');
        });

        movieQuestion = randomQuiz(movies, $quiz);
    });

    // set a random movie quiz
    movieQuestion = randomQuiz(movies, $quiz);
    
    $('.image-drop').droppable({
        accept: '.movies'
    });

    // set up event bindings
    $('.image-drop').on('drop', function (e, ui) {

        // using .call to pass the context of the $('.image-drop') selector
        dropEvent.call(this, e, ui, movieQuestion);

    });

}

function randomQuiz(movies, $quiz) {

    var $movieName = $quiz.find('#movie-name'),
        // get a random movie
        randMovie = movies[Math.floor(Math.random() * movies.length - 1)];

    if (randMovie && randMovie.title) {
        $movieName.stop().text(randMovie.title)
            .css('opacity', 0)
            .delay(500)
            .animate({
                opacity: 1
            }, 1000);

        return randMovie;
    }
}

function isCorrectMovie(el, movie) {

    if (el.attr('id') !== undefined && movie) {
            return true;
		} else {
			return false;
			}
}

function showMessage(obj) {
    if (obj.success) {
            // animate an error
        $('body').append('<div class="success"></div>')
            .find('.success')
            .css('top', '500px')
            .animate({
                top: '200px'
            }, 500);
        // get rid of the oops error
        setTimeout(function () {
            $('.success').fadeOut({
                complete: function () {
                    $(this).remove();
                }
            });
        }, 2000);
    } else {
        // animate an error
        $('body').append('<div class="oops"></div>')
            .find('.oops')
            .css('top', '500px')
            .animate({
                top: '200px'
            }, 500);
        // get rid of the oops error
        setTimeout(function () {
            $('.oops').fadeOut({
                complete: function () {
                    $(this).remove();
                }
            });
        }, 2000);
    }
}
function dropEvent(event, ui, movie) {
    // the jQuery element
    var draggable = ui.draggable;

    if (isCorrectMovie(draggable, movie)) {
        // position the element based off "of" the $(this) selector which is the context of $('.item-drop');
        ui.draggable.position({
            of: $(this),
            my: 'center center',
            at: 'center center'
        })

        ui.draggable.draggable({
            revert: false // set our revert to false so the position stays
        });
        //ui.draggable.draggable('disable');
        showMessage({
            success: true
        });
    } else {
        showMessage({
            success: false
        });
    }
}






