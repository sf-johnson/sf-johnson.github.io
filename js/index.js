window.onload = function() {
	var app = {
		fades : document.querySelectorAll( '.fade' ),
		videos : document.querySelectorAll( '.video' ),
		videoActiveIndex : null,
		audios : document.querySelectorAll( '.audio' ),
		audioActiveIndex : null,
		tracks : document.querySelectorAll( '.track' ),
		setActiveVideo : function( i ) {
			if ( this.videoActiveIndex === i ) return;
			if ( this.videos.length <= i ) return;

			this.videoActiveIndex = i;
			this.videos.forEach( function( video, j ) {
				if ( i === j ) {
					video.setAttribute( 'data-active', true );
				} else {
					video.removeAttribute( 'data-active' );
				}
			}, this );
		},
		setActiveAudio : function( i ) {
			if ( this.audioActiveIndex === i ) return;
			if ( this.audios.length <= i ) return;

			this.audioActiveIndex = i;
			this.audios.forEach( function( audio, j ) {
				if ( i === j ) {
					audio.play();
					audio.onended = ( function() {
						this.audioActiveIndex = null;
						audio.pause();
						audio.currentTime = 0.0;
					} ).bind( this );
				} else {
					audio.pause();
					audio.currentTime = 0.0;
				}
			}, this );
		},
		checkScrollVideos : function() {
			var minDist = Infinity;
			var minIndex = null;

			this.tracks.forEach( function( track, i ) {
				var scroll = window.pageYOffset + 0.5 * window.innerHeight;
				var dist = Math.abs( scroll - track.offsetTop );

				if ( dist < minDist ) {
					minIndex = i;
					minDist = dist;
				}
			} );

			this.setActiveVideo( minIndex );
		},
		checkScrollFades : function() {
			this.fades.forEach( function( fade ) {
				var scroll = window.pageYOffset + window.innerHeight;
				var scrollRef = fade.offsetTop;

				if ( scroll > scrollRef ) {
					fade.setAttribute( 'data-show', true );
				} else {
					fade.removeAttribute( 'data-show' );
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
		app.checkScrollVideos();
		app.checkScrollFades();
	} )();
}