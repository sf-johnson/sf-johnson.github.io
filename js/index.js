window.onload = function() {
	var app = {
		fades : document.querySelectorAll( '.fade' ),
		videos : document.querySelectorAll( '.video' ),
		videoActiveIndex : null,
		audios : document.querySelectorAll( '.audio' ),
		audioActiveIndex : null,
		tracks : document.querySelectorAll( '.track' ),
		initEmail : function() {},
		initTracks : function() {
			this.tracks.forEach( ( function( track, i ) {
				if ( track.getAttribute( 'data-preview' ) === 'true' ) {
					track.onclick = ( function() {
						this.setActiveAudio( i );
					} ).bind( this );
				}
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
			if ( this.audioActiveIndex === i ) return;
			if ( this.audios.length <= i ) return;

			this.audioActiveIndex = i;
			this.audios.forEach( ( function( audio, j ) {
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
			} ).bind( this ) );
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

				fade.setAttribute( 'data-show', ( scroll > scrollRef ) );
			} );
		}
	};

	app.initEmail();
	app.initTracks();

	( window.onscroll = function () {
		app.checkScrollVideos();
		app.checkScrollFades();
	} )();
}