

import os
import sys
import whisper

sys.stdout.reconfigure(encoding="utf-8")

os.environ["PATH"] += os.pathsep + r"C:/Users/nikhi/Downloads/ffmpeg-8.1.1-essentials_build/ffmpeg-8.1.1-essentials_build/bin"

# Node.js se aaya hua path
audio_path = sys.argv[1]

print("Audio Path:", audio_path)

model = whisper.load_model("base")

result = model.transcribe(audio_path, fp16=False)

print(result["text"])




# import os
# import sys
# import whisper

# sys.stdout.reconfigure(encoding="utf-8")

# os.environ["PATH"] += os.pathsep + r"C:/Users/nikhi/Downloads/ffmpeg-8.1.1-essentials_build/ffmpeg-8.1.1-essentials_build/bin"

# audio_path = sys.argv[1]

# model = whisper.load_model("medium")

# result = model.transcribe(
#     audio_path,
#     task="translate",
#     fp16=False
# )

# print(result["text"].strip())