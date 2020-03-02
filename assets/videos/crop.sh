# Scale video (1)
ffmpeg -i midnight.original.mp4 -s 500x500 -c:a copy midnight.mp4
# Crop & scale horizontal video (2)
ffmpeg -i baby.original.mp4 -filter:v crop=in_h:in_h:in_w/2-in_h/2:0 -s 500x500 -c:a copy baby.mp4
# Crop & scale vertical video (3)
ffmpeg -i asphyxiation.original.mp4 -filter:v crop=in_w:in_w:0:in_h/2-in_w/2 -s 500x500 -c:a copy asphyxiation.mp4
