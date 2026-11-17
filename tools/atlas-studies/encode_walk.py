"""Encode the Blender PNG sequence; run with uv --with imageio-ffmpeg."""
import pathlib, subprocess, sys, imageio_ffmpeg
out=pathlib.Path(__file__).resolve().parent
refined='--refined' in sys.argv
folder='refined-frames' if refined else 'walk-frames'
filename='refined-walk-preview.mp4' if refined else 'walk-plug-preview.mp4'
frames=list((out/folder).glob('frame-*.png'))
assert len(frames)==288, f'Expected 288 frames, found {len(frames)}'
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-framerate','24','-i',str(out/folder/'frame-%04d.png'),'-c:v','libx264','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(out/filename)],check=True)
