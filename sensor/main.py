import RPi.GPIO as GPIO
import requests
import time

backend_url = "https://be14f066.ngrok.io"
ir_pin = 18

GPIO.setmode(GPIO.BCM)
GPIO.setup(ir_pin, GPIO.IN)
GPIO.setwarnings(False)

def bin_filled():
    requests.post(backend_url+"/bin")

while(True):
    ir_in = GPIO.input(ir_pin)

    if ir_in:
        print("true")
        bin_filled()
    else:
        print("false")
    time.sleep(0.5)
