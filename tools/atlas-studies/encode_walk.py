"""Encode the Blender PNG sequence; run with uv --with imageio-ffmpeg."""
import pathlib, subprocess, imageio_ffmpeg
out=pathlib.Path(__file__).resolve().parent
frames=list((out/'walk-frames').glob('frame-*.png'))
assert len(frames)==288, f'Expected 288 frames, found {len(frames)}'
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-framerate','24','-i',str(out/'walk-frames/frame-%04d.png'),'-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'walk-plug-preview.mp4')],check=True)
