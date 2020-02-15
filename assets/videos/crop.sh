# Scale video (1)
ffmpeg -i 1.original.mp4 -s 500x500 -c:a copy 1.mp4
# Crop & scale horizontal video (2)
ffmpeg -i 2.original.mp4 -filter:v crop=in_h:in_h:in_w/2-in_h/2:0 -s 500x500 -c:a copy 2.mp4
# Crop & scale vertical video (3)
ffmpeg -i 3.original.mp4 -filter:v crop=in_w:in_w:0:in_h/2-in_w/2 -s 500x500 -c:a copy 3.mp4
