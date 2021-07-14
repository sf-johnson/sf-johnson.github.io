function fadeVolumeIn( audio, complete ) {
	anime( {
		targets : audio,
		volume : [0.0, 1.0],
		duration : 1000,
		easing: 'linear',
		complete : complete
	} );
}

function fadeVolumeOut( audio, complete ) {
	anime( {
		targets : audio,
		volume : 0.0,
		duration : 1000,
		easing : 'linear',
		complete : complete
	} );
}

window.addEventListener( 'DOMContentLoaded', function() {
	var app = {
		fades : document.querySelectorAll( '.fade' ),
		videos : document.querySelectorAll( '.video' ),
		videoActiveIndex : null,
		audios : document.querySelectorAll( '.audio' ),
		audioActiveIndex : null,
		tracks : document.querySelectorAll( '.track' ),
		initEmail : function() {
			var email = document.querySelector( '#email' );
			var href = email.getAttribute( 'href' );

			email.setAttribute( 'href', href.replace( '.at.', '@' ) );
		},
		initTracks : function() {
			this.tracks.forEach( ( function( track, i ) {
				track.onclick = ( function() {
					this.setActiveAudio( i );
				} ).bind( this );
			} ).bind( this ) );
		},
		setActiveVideo : function( i ) {
			if ( this.videoActiveIndex === i ) return;
			if ( this.videos.length <= i ) return;

			this.videoActiveIndex = i;
			this.videos.forEach( function( video, j ) {
				video.setAttribute( 'data-active', ( i === j ) );
			} );
		},
		setActiveAudio : function( i ) {
			if ( this.audios.length <= i ) return;

			this.audioActiveIndex = i;
			this.audios.forEach( ( function( audio, j ) {
				if ( i === j && audio.paused ) {
					audio.play();
					audio.onended = ( function() {
						this.audioActiveIndex = null;
						audio.pause();
						audio.currentTime = 0.0;
					} ).bind( this );

					fadeVolumeIn( audio );
				} else {
					fadeVolumeOut( audio, function() {
						audio.pause();
						audio.currentTime = 0.0;
					} );
				}
			} ).bind( this ) );
		},
		checkScrollVideos : function() {
			var closestDist = Infinity;
			var closestIndex = null;

			this.tracks.forEach( function( track, i ) {
				var scroll = window.pageYOffset + 0.5 * window.innerHeight;
				var dist = Math.abs( scroll - track.offsetTop );

				if ( dist < closestDist ) {
					closestDist = dist;
					closestIndex = i;
				}
			} );

			this.setActiveVideo( closestIndex );
		},
		checkScrollFades : function() {
			this.fades.forEach( function( fade ) {
				var scroll = window.pageYOffset + window.innerHeight;
				var scrollRef = fade.offsetTop;

				fade.setAttribute( 'data-show', ( scroll > scrollRef ) );
			} );
		}
	};

	console.assert(
		( app.tracks.length === app.videos.length ) &&
		( app.tracks.length === app.audios.length )
	);

	app.initEmail();
	app.initTracks();

	( window.onscroll = function () {
		app.checkScrollVideos();
		app.checkScrollFades();
	} )();
} );