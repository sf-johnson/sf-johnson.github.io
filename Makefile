IMAGE_DIR := assets/images
IMAGE_SIZE := 500
IMAGE_OPTS := -y -vf scale=$(IMAGE_SIZE):-1

VIDEO_DIR := assets/videos
VIDEO_SIZE := 700
VIDEO_OPTS := -y -s $(VIDEO_SIZE)x$(VIDEO_SIZE) -c:a copy
VIDEO_OPTS_H := $(VIDEO_OPTS) -filter:v crop=in_h:in_h:in_w/2-in_h/2:0
VIDEO_OPTS_V := $(VIDEO_OPTS) -filter:v crop=in_w:in_w:0:in_h/2-in_w/2

convert-images :
	ffmpeg \
		-i $(IMAGE_DIR)/artwork.original.jpg \
		$(IMAGE_OPTS) \
		$(IMAGE_DIR)/artwork.jpg

convert-videos :
	ffmpeg \
		-i $(VIDEO_DIR)/midnight.original.mp4 \
		$(VIDEO_OPTS) \
		$(VIDEO_DIR)/midnight.mp4
	ffmpeg \
		-i $(VIDEO_DIR)/baby.original.mp4 \
		$(VIDEO_OPTS_H) \
		$(VIDEO_DIR)/baby.mp4
	ffmpeg \
		-i $(VIDEO_DIR)/asphyxiation.original.mp4 \
		$(VIDEO_OPTS_V) \
		$(VIDEO_DIR)/asphyxiation.mp4
	ffmpeg \
		-i $(VIDEO_DIR)/woman.original.M4V \
		$(VIDEO_OPTS) \
		$(VIDEO_DIR)/woman.mp4
	ffmpeg \
		-i $(VIDEO_DIR)/future_blues.original.mp4 \
		$(VIDEO_OPTS_H) \
		$(VIDEO_DIR)/future_blues.mp4

run :
	live-server \
		--host=0.0.0.0 \
		--port=8080 \
		--no-browser \
		--ignore=Makefile,.gitignore,README.md

	