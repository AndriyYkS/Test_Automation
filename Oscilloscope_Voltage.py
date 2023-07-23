import socket
import time

IP_ADDRESS = '10.70.150.137'
PORT = 5025

CHANNEL = 1

start_time = time.time()

while time.time() - start_time < 60:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((IP_ADDRESS, PORT))

    # ":CHANnel<n>:SCALe?" command to retrieve the channel scale (volts/div)
    sock.send(f':CHANnel{CHANNEL}:SCALe?\n'.encode())

    response = sock.recv(1024)
    channel_scale = float(response.decode().strip())

    # ":CHANnel<n>:OFFSet?" command to retrieve the channel offset (volts)
    sock.send(f':CHANnel{CHANNEL}:OFFSet?\n'.encode())

    response = sock.recv(1024)
    channel_offset = float(response.decode().strip())

    # Send the ":MEASure:PWIDth?" command to retrieve the PWM data
    sock.send(':MEASure:PWIDth?\n'.encode())

    # Receive and parse the PWM data
    response = sock.recv(1024)
    pwm_data = float(response.decode().strip())

    print(f'Channel {CHANNEL} Scale: {channel_scale} V/div')
    print(f'Channel {CHANNEL} Offset: {channel_offset} V')
    # Print the PWM data
    print(f'Pulse Width Modulation: {pwm_data}')
    print('-----------------------')

    sock.close()

    time.sleep(1)
