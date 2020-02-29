window.onload = function() {
	var app = {
		videos : document.querySelectorAll( '.video' ),
		videoActiveIndex : null,
		audios : document.querySelectorAll( '.audio' ),
		audioActiveIndex : null,
		tracks : document.querySelectorAll( '.track' ),
		setActiveVideo : function( i ) {
			if ( this.videoActiveIndex === i ) return;

			this.videoActiveIndex = i;
			this.videos.forEach( function( video, j ) {
				if ( i === j ) {
					video.setAttribute( 'data-active', true );
				} else {
					video.removeAttribute( 'data-active' );
				}
			} );
		},
		setActiveAudio : function( i ) {
			if ( this.audioActiveIndex === i ) return;

			this.audioActiveIndex = i;
			this.audios.forEach( function( audio, j ) {
				if ( i === j ) {
					audio.play();
					anime( {
						targets : audio,
						volume : [0.0, 1.0],
						duration : 1000,
						easing: 'linear'
					} );
				} else {
					anime( {
						targets : audio,
						volume : 0.0,
						duration : 1000,
						easing : 'linear',
						complete : function() {
							audio.pause();
							audio.currentTime = 0.0;
						}
					} );
				}
			} );
		}
	};

	app.tracks.forEach( function( track, i ) {
		track.addEventListener( 'click', function() {
			app.setActiveAudio( i );
		} );
	} );

	( window.onscroll = function () {
		var minDist = Infinity;
		var minIndex = null;

		app.tracks.forEach( function( track, i ) {
			var scroll = window.pageYOffset + 0.5 * window.innerHeight;
			var dist = Math.abs( scroll - track.offsetTop );

			if ( dist < minDist ) {
				minIndex = i;
				minDist = dist;
			}
		} );

		app.setActiveVideo( minIndex );
	} )();
}